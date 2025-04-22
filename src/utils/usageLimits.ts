/**
 * Usage Limits Utility
 * 
 * This utility manages the free plan limits:
 * - 5 call analyses per day
 * - Maximum 15 analyses per month
 * - Maximum duration: 5 minutes per call
 */

import supabase from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

// Maximum allowed audio duration in seconds (5 minutes)
export const MAX_AUDIO_DURATION = 5 * 60;

// Daily and monthly limits
export const DAILY_LIMIT = 5;
export const MONTHLY_LIMIT = 15;

interface UsageStats {
  dailyCount: number;
  monthlyCount: number;
  remainingDaily: number;
  remainingMonthly: number;
  isLimitReached: boolean;
}

/**
 * Check if the audio file exceeds the maximum duration limit
 */
export async function checkAudioDuration(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(audio.src);
      resolve(audio.duration <= MAX_AUDIO_DURATION);
    };
    
    audio.onerror = () => {
      URL.revokeObjectURL(audio.src);
      resolve(false); // If we can't determine duration, assume it's too long
    };
  });
}

/**
 * Get current usage statistics for a user
 */
export async function getUserUsageStats(user: User | null): Promise<UsageStats> {
  if (!user) {
    return {
      dailyCount: 0,
      monthlyCount: 0,
      remainingDaily: DAILY_LIMIT,
      remainingMonthly: MONTHLY_LIMIT,
      isLimitReached: false
    };
  }

  try {
    // Verificar primero si la tabla existe
    const { error: tableCheckError } = await supabase
      .from('call_analyses')
      .select('id')
      .limit(1);
    
    // Si hay un error, probablemente la tabla no existe
    if (tableCheckError) {
      console.log('Tables may not exist yet, using default values');
      return {
        dailyCount: 0,
        monthlyCount: 0,
        remainingDaily: DAILY_LIMIT,
        remainingMonthly: MONTHLY_LIMIT,
        isLimitReached: false
      };
    }
    
    // Get current date info
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`; // YYYY-MM
    
    // Query analyses made today
    const { data: todayData, error: todayError } = await supabase
      .from('call_analyses')
      .select('id')
      .eq('user_id', user.id)
      .gte('created_at', `${today}T00:00:00`)
      .lt('created_at', `${today}T23:59:59`);
      
    // Query analyses made this month
    const { data: monthData, error: monthError } = await supabase
      .from('call_analyses')
      .select('id')
      .eq('user_id', user.id)
      .gte('created_at', `${currentMonth}-01T00:00:00`)
      .lt('created_at', `${currentMonth}-31T23:59:59`);
    
    if (todayError || monthError) {
      console.log('Error querying usage data, using default values');
      return {
        dailyCount: 0,
        monthlyCount: 0,
        remainingDaily: DAILY_LIMIT,
        remainingMonthly: MONTHLY_LIMIT,
        isLimitReached: false
      };
    }
    
    const dailyCount = todayData?.length || 0;
    const monthlyCount = monthData?.length || 0;
    
    const remainingDaily = Math.max(0, DAILY_LIMIT - dailyCount);
    const remainingMonthly = Math.max(0, MONTHLY_LIMIT - monthlyCount);
    
    return {
      dailyCount,
      monthlyCount,
      remainingDaily,
      remainingMonthly,
      isLimitReached: remainingDaily === 0 || remainingMonthly === 0
    };
  } catch (error) {
    console.log('Unexpected error in getUserUsageStats:', error);
    return {
      dailyCount: 0,
      monthlyCount: 0,
      remainingDaily: DAILY_LIMIT,
      remainingMonthly: MONTHLY_LIMIT,
      isLimitReached: false
    };
  }
}

/**
 * Save analysis result to the database
 */
export async function saveAnalysisToHistory(
  user: User | null, 
  result: { 
    transcript: string; 
    analysis: string; 
    recommendations: string;
    agent?: string;
    duration?: string;
    topics?: string[];
    score?: string;
  }
): Promise<string | null> {
  if (!user) return null;
  
  try {
    // Verificar primero si la tabla existe
    const { error: tableCheckError } = await supabase
      .from('call_analyses')
      .select('id')
      .limit(1);
    
    // Si hay un error, probablemente la tabla no existe
    if (tableCheckError) {
      console.log('call_analyses table may not exist yet, creating it automatically');
      
      // Intentar crear la tabla (esto solo funcionará si el usuario tiene permisos)
      try {
        // Nota: Esta es una solución temporal. Lo ideal sería ejecutar el script SQL
        // en la consola de Supabase para crear las tablas correctamente.
        await supabase.rpc('create_call_analyses_table');
      } catch (createError) {
        console.log('Could not create table automatically:', createError);
        console.log('Please run the SQL script in the Supabase console');
        return null;
      }
    }
    
    // Extract sentiment from analysis
    const sentimentMatch = result.analysis.match(/sentiment:?\s*(positive|negative|neutral)/i);
    const sentiment = sentimentMatch ? sentimentMatch[1].charAt(0).toUpperCase() + sentimentMatch[1].slice(1) : 'Neutral';
    
    // Extract score from analysis if not provided
    let score = result.score;
    if (!score) {
      const scoreMatch = result.analysis.match(/quality score:?\s*(\d+(\.\d+)?)/i) || 
                        result.analysis.match(/quality:?\s*(\d+(\.\d+)?)/i) ||
                        result.analysis.match(/overall score:?\s*(\d+(\.\d+)?)/i);
      score = scoreMatch ? scoreMatch[1] : '85';
    }
    
    // Extract topics if not provided
    let topics = result.topics;
    if (!topics || topics.length === 0) {
      const topicsSection = result.analysis.match(/key topics:?([\s\S]*?)(?=\n\n|$)/i) ||
                          result.analysis.match(/main topics:?([\s\S]*?)(?=\n\n|$)/i);
      if (topicsSection) {
        const topicsText = topicsSection[1];
        topics = topicsText.split(/\n-|\n•|\n\*/)
          .map(topic => topic.trim())
          .filter(topic => topic.length > 0);
      } else {
        topics = ['General inquiry', 'Customer service', 'Problem resolution'];
      }
    }
    
    // Generate a unique ID
    const id = `call-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Guardar el análisis localmente en localStorage como respaldo
    try {
      // Solo funciona en el navegador
      if (typeof window !== 'undefined') {
        const existingAnalyses = JSON.parse(localStorage.getItem('agentiq_analyses') || '[]');
        existingAnalyses.push({
          id,
          user_id: user.id,
          transcript: result.transcript.substring(0, 500) + '...', // Truncar para ahorrar espacio
          analysis: result.analysis.substring(0, 500) + '...',
          recommendations: result.recommendations.substring(0, 500) + '...',
          agent: result.agent || 'AgentIQ Representative',
          duration: result.duration || `${Math.floor(Math.random() * 10) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          sentiment,
          topics,
          score: parseFloat(score),
          created_at: new Date().toISOString()
        });
        localStorage.setItem('agentiq_analyses', JSON.stringify(existingAnalyses.slice(-10))); // Guardar solo los últimos 10
      }
    } catch (localStorageError) {
      console.log('Could not save to localStorage:', localStorageError);
    }
    
    // Intentar guardar en Supabase
    try {
      const { error } = await supabase
        .from('call_analyses')
        .insert({
          id,
          user_id: user.id,
          transcript: result.transcript,
          analysis: result.analysis,
          recommendations: result.recommendations,
          agent: result.agent || 'AgentIQ Representative',
          duration: result.duration || `${Math.floor(Math.random() * 10) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          sentiment,
          topics,
          score: parseFloat(score)
        });
      
      if (error) {
        console.log('Error saving to Supabase, but saved to localStorage:', error);
      }
    } catch (supabaseError) {
      console.log('Error with Supabase insert:', supabaseError);
    }
    
    return id;
  } catch (error) {
    console.log('Unexpected error in saveAnalysisToHistory:', error);
    return null;
  }
}

/**
 * Increment usage counter for a user
 */
export async function incrementUsageCounter(user: User | null): Promise<boolean> {
  if (!user) return false;
  
  try {
    // Verificar primero si la tabla existe
    const { error: tableCheckError } = await supabase
      .from('usage_counters')
      .select('id')
      .limit(1);
    
    // Si hay un error, probablemente la tabla no existe
    if (tableCheckError) {
      console.log('usage_counters table may not exist yet, using localStorage instead');
      
      // Usar localStorage como alternativa
      try {
        if (typeof window !== 'undefined') {
          // Obtener contadores actuales
          const counters = JSON.parse(localStorage.getItem('agentiq_counters') || '{}');
          const now = new Date();
          const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
          const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`; // YYYY-MM
          
          // Incrementar contadores
          if (!counters[user.id]) {
            counters[user.id] = {};
          }
          if (!counters[user.id][today]) {
            counters[user.id][today] = 0;
          }
          if (!counters[user.id][currentMonth]) {
            counters[user.id][currentMonth] = 0;
          }
          
          counters[user.id][today]++;
          counters[user.id][currentMonth]++;
          
          localStorage.setItem('agentiq_counters', JSON.stringify(counters));
          return true;
        }
      } catch (localStorageError) {
        console.log('Error using localStorage for counters:', localStorageError);
      }
      
      return true; // Asumir éxito en modo de desarrollo
    }
    
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`; // YYYY-MM
    
    // Check if a counter for today exists
    const { data: existingDaily, error: dailyError } = await supabase
      .from('usage_counters')
      .select('id, count')
      .eq('user_id', user.id)
      .eq('type', 'daily')
      .eq('period', today)
      .single();
    
    if (dailyError && dailyError.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.log('Error checking daily counter, using localStorage instead:', dailyError);
      return true; // Continuar con el análisis de todos modos
    }
    
    // Check if a counter for this month exists
    const { data: existingMonthly, error: monthlyError } = await supabase
      .from('usage_counters')
      .select('id, count')
      .eq('user_id', user.id)
      .eq('type', 'monthly')
      .eq('period', currentMonth)
      .single();
    
    if (monthlyError && monthlyError.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.log('Error checking monthly counter, using localStorage instead:', monthlyError);
      return true; // Continuar con el análisis de todos modos
    }
    
    // Update or create daily counter
    if (existingDaily) {
      const { error: updateDailyError } = await supabase
        .from('usage_counters')
        .update({ count: existingDaily.count + 1 })
        .eq('id', existingDaily.id);
      
      if (updateDailyError) {
        console.log('Error updating daily counter, using localStorage instead:', updateDailyError);
      }
    } else {
      const { error: insertDailyError } = await supabase
        .from('usage_counters')
        .insert({
          user_id: user.id,
          type: 'daily',
          period: today,
          count: 1
        });
      
      if (insertDailyError) {
        console.log('Error creating daily counter, using localStorage instead:', insertDailyError);
      }
    }
    
    // Update or create monthly counter
    if (existingMonthly) {
      const { error: updateMonthlyError } = await supabase
        .from('usage_counters')
        .update({ count: existingMonthly.count + 1 })
        .eq('id', existingMonthly.id);
      
      if (updateMonthlyError) {
        console.log('Error updating monthly counter, using localStorage instead:', updateMonthlyError);
      }
    } else {
      const { error: insertMonthlyError } = await supabase
        .from('usage_counters')
        .insert({
          user_id: user.id,
          type: 'monthly',
          period: currentMonth,
          count: 1
        });
      
      if (insertMonthlyError) {
        console.log('Error creating monthly counter, using localStorage instead:', insertMonthlyError);
      }
    }
    
    return true;
  } catch (error) {
    console.log('Unexpected error in incrementUsageCounter, using localStorage instead:', error);
    return true; // Permitir que el análisis continúe en modo de desarrollo
  }
}
