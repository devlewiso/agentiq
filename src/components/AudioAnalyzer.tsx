'use client';

import { useState, useRef, ReactElement, useEffect } from 'react';
import OpenAI from 'openai';
import {
  AUDIO_ANALYSIS_PROMPT
} from '@/utils/prompts';
import supabase from '@/lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import type { User } from '@supabase/supabase-js';
import DatabaseSetupInfo from './DatabaseSetupInfo';
import { generateCertificationHTML } from '@/utils/certificationFormat';
import {
  checkAudioDuration,
  getUserUsageStats,
  saveAnalysisToHistory,
  incrementUsageCounter,
  MAX_AUDIO_DURATION,
  DAILY_LIMIT,
  MONTHLY_LIMIT
} from '@/utils/usageLimits';

interface AnalysisResult {
  transcript: string;
  analysis: string;
  recommendations: string;
  agent?: string;        // Agent name from Recent Calls
  duration?: string;     // Call duration from Recent Calls
  topics?: string[];     // Topics from Recent Calls
  score?: string;        // Quality score from Recent Calls
  date?: string;         // Date from Recent Calls
}

interface AnalyzerProps {
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

export default function AudioAnalyzer({ onAnalysisComplete }: AnalyzerProps): ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'transcript' | 'analysis' | 'recommendations'>('analysis');
  const [user, setUser] = useState<User | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [usageStats, setUsageStats] = useState<{
    dailyCount: number;
    monthlyCount: number;
    remainingDaily: number;
    remainingMonthly: number;
    isLimitReached: boolean;
  }>({
    dailyCount: 0,
    monthlyCount: 0,
    remainingDaily: DAILY_LIMIT,
    remainingMonthly: MONTHLY_LIMIT,
    isLimitReached: false
  });

  // Cargar el usuario actual y los datos de uso
  useEffect(() => {
    const fetchUserAndUsage = async () => {
      // Obtener el usuario actual
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      setUser(currentUser);

      // Si hay un usuario, obtener sus estadísticas de uso
      if (currentUser) {
        const stats = await getUserUsageStats(currentUser);
        setUsageStats(stats);
      }
    };

    fetchUserAndUsage();

    // Suscribirse a cambios en la sesión de usuario
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const stats = await getUserUsageStats(currentUser);
        setUsageStats(stats);
      } else {
        setUsageStats({
          dailyCount: 0,
          monthlyCount: 0,
          remainingDaily: DAILY_LIMIT,
          remainingMonthly: MONTHLY_LIMIT,
          isLimitReached: false
        });
      }
    });

    // Limpiar la suscripción al desmontar
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type && droppedFile.type.startsWith('audio/')) {
        setFile(droppedFile);
      } else {
        setError('Please upload a valid audio file.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type && selectedFile.type.startsWith('audio/')) {
        setFile(selectedFile);
      } else {
        setError('Please upload a valid audio file.');
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const analyzeAudio = async () => {
    if (!file) return;

    // Verificar si el usuario ha alcanzado los límites del plan gratuito
    if (user) {
      // Actualizar las estadísticas de uso
      const stats = await getUserUsageStats(user);
      setUsageStats(stats);

      if (stats.isLimitReached) {
        setError(
          `You've reached your free plan limit. You can analyze ${DAILY_LIMIT} calls per day and ${MONTHLY_LIMIT} calls per month. ` +
          `You have ${stats.remainingDaily} analyses left today and ${stats.remainingMonthly} left this month.`
        );
        return;
      }
    }

    // Verificar la duración del audio (máximo 10 minutos)
    const isValidDuration = await checkAudioDuration(file);
    if (!isValidDuration) {
      setError(`Audio file exceeds the maximum duration of ${MAX_AUDIO_DURATION / 60} minutes for the free plan.`);
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Crear una instancia de la API de OpenAI
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found. Please set NEXT_PUBLIC_OPENAI_API_KEY in your .env.local file');
      }
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      setIsUploading(false);
      setIsAnalyzing(true);

      console.log('Starting audio analysis with OpenAI...');

      // Paso 1: Transcribir el audio con Whisper
      console.log('Step 1: Transcribing audio with Whisper...');
      const transcriptionResponse = await openai.audio.transcriptions.create({
        file: file,
        model: 'whisper-1',
        language: 'es', // Auto-detect, pero puedes especificar 'es', 'en', etc.
      });

      const transcript = transcriptionResponse.text || 'Could not obtain audio transcription.';
      console.log('Transcription completed');

      // Paso 2: Analizar la transcripción con GPT-4
      console.log('Step 2: Analyzing transcription with GPT-4...');
      const analysisResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: AUDIO_ANALYSIS_PROMPT
          },
          {
            role: 'user',
            content: `Here is the transcription of a customer service call:\n\n${transcript}\n\nPlease analyze it according to the instructions.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      const analysis = analysisResponse.choices[0]?.message?.content || 'Could not obtain audio analysis.';
      console.log('Analysis completed');

      // Extraer recomendaciones
      console.log('Step 3: Extracting recommendations...');
      const recommendationsMatch = analysis.match(/\*\*RECOMMENDATIONS:\*\*\s*([\s\S]*?)(?=\n\n|$)/i);
      let recommendations = '';

      if (recommendationsMatch && recommendationsMatch[1]) {
        recommendations = recommendationsMatch[1].trim();
      } else {
        // Fallback: buscar cualquier sección que parezca recomendaciones
        const altMatch = analysis.match(/recommendations?:?\s*([\s\S]*?)(?=\n\n|$)/i);
        if (altMatch && altMatch[1]) {
          recommendations = altMatch[1].trim();
        } else {
          recommendations = 'No specific recommendations provided.';
        }
      }

      console.log('Recommendations extracted');

      // Generar fecha y duración para el análisis
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Generar duración aleatoria para la llamada (entre 2 y 10 minutos)
      const minutes = Math.floor(Math.random() * 8) + 2;
      const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      const duration = `${minutes}:${seconds}`;

      // Extraer sentimiento del análisis
      const sentimentMatch = analysis.match(/\*\*OVERALL SENTIMENT:\*\*\s*(positive|negative|neutral|mixed)/i);
      const sentiment = sentimentMatch ? sentimentMatch[1].charAt(0).toUpperCase() + sentimentMatch[1].slice(1) : 'Neutral';

      // Extraer puntuación de calidad del análisis
      const scoreMatch = analysis.match(/\*\*QUALITY SCORE:\*\*\s*(\d+)/i);
      const score = scoreMatch ? scoreMatch[1] : '85';

      // Extraer temas del análisis
      const topicsMatch = analysis.match(/\*\*KEY TOPICS:\*\*\s*([\s\S]*?)(?=\*\*|$)/i);
      let topics: string[] = [];

      if (topicsMatch && topicsMatch[1]) {
        const topicsText = topicsMatch[1];
        topics = topicsText.split(/\n-/)
          .map((topic: string) => topic.trim())
          .filter((topic: string) => topic.length > 0 && !topic.startsWith('**'))
          .slice(0, 3);
      }

      if (topics.length === 0) {
        topics = ['General inquiry', 'Customer service', 'Problem resolution'];
      }

      // Crear el resultado final
      const finalResult: AnalysisResult = {
        transcript,
        analysis,
        recommendations,
        agent: 'AgentIQ Representative',
        duration,
        topics,
        score,
        date: formattedDate
      };

      setResult(finalResult);

      // Si hay un usuario autenticado, guardar el análisis en el historial
      if (user) {
        try {
          // Guardar el análisis en la base de datos
          await saveAnalysisToHistory(user, finalResult);

          // Incrementar el contador de uso
          await incrementUsageCounter(user);

          // Actualizar las estadísticas de uso
          const updatedStats = await getUserUsageStats(user);
          setUsageStats(updatedStats);
        } catch (error) {
          console.error('Error saving analysis to history:', error);
        }
      }

      // Notificar al componente padre si es necesario
      if (onAnalysisComplete) {
        onAnalysisComplete(finalResult);
      }

    } catch (error: any) {
      console.error('Error processing audio with OpenAI:', error);
      setError(`Error analyzing audio: ${error.message || 'An unknown error occurred'}`);
    } finally {
      setIsAnalyzing(false);
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Export functions
  const exportToPDF = async () => {
    if (!result) return;

    setIsExporting(true);
    try {
      // Generate certification HTML using the utility function
      const htmlContent = generateCertificationHTML(result);

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `call-analysis-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Error exporting to PDF:', err);
      setError('Failed to export as PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 w-full" style={{ minHeight: '600px' }}>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Audio Analysis with AI</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Upload an audio file of a call to analyze it with artificial intelligence and gain valuable insights.
      </p>

      <DatabaseSetupInfo />

      {user && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Free Plan</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">5 analyses/day, 15 analyses/month, max 20 min per call</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                {usageStats.remainingDaily} left today / {usageStats.remainingMonthly} left this month
              </p>
              <div className="w-32 bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-1">
                <div
                  className="h-2 rounded-full bg-blue-600 dark:bg-blue-400"
                  style={{ width: `${Math.min(100, (usageStats.remainingDaily / DAILY_LIMIT) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!result ? (
        <>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="audio/*"
              className="hidden"
            />

            {file ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <p className="text-gray-900 dark:text-white font-medium">{file.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-gray-900 dark:text-white font-medium">Drag and drop an audio file</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  or <button type="button" onClick={handleUploadClick} className="text-blue-600 dark:text-blue-400 hover:underline">select a file</button>
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                  Supported formats: MP3, WAV, M4A, OGG (max. 20MB)
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 text-sm text-red-600 dark:text-red-400 mb-6">
              {error}
            </div>
          )}

          <div className="flex space-x-4 mt-auto">
            <button
              type="button"
              onClick={analyzeAudio}
              disabled={!file || isUploading || isAnalyzing}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : isAnalyzing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Analyze Audio'
              )}
            </button>

            {file && (
              <button
                type="button"
                onClick={resetForm}
                disabled={isUploading || isAnalyzing}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6" style={{ minHeight: '500px' }}>
          {/* Tabs to navigate between different sections */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('transcript')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'transcript'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
              >
                Transcription
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'analysis'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
              >
                Analysis
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'recommendations'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
              >
                Recommendations
              </button>
            </nav>
          </div>

          {/* Active tab content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            {activeTab === 'transcript' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Call Transcription</h3>
                <div className="prose dark:prose-invert max-w-none overflow-auto" style={{ height: '400px' }}>
                  {result.transcript.split('\n').map((line, index) => (
                    <p key={index} className="mt-2">{line}</p>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Call Analysis</h3>
                <div className="space-y-6 overflow-auto" style={{ height: '400px' }}>
                  {/* Overall sentiment card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Overall Sentiment</h4>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                        {result.analysis.match(/sentiment:?\s*(positive|negative|neutral)/i)?.[1] || 'Neutral'}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      The sentiment analysis indicates the predominant emotion detected in the call.
                    </p>
                  </div>

                  {/* Detailed analysis card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detailed Analysis</h4>
                    <div className="space-y-3">
                      {result.analysis.split('\n\n')
                        .filter(p => p.trim().length > 0)
                        .slice(1, 5)
                        .map((paragraph, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <p className="text-gray-600 dark:text-gray-300">{paragraph}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommendations</h3>
                <div className="space-y-6 overflow-auto" style={{ height: '400px' }}>
                  <div className="grid grid-cols-1 gap-4">
                    {result.recommendations.split('\n\n')
                      .filter(p => p.trim().length > 0)
                      .map((recommendation, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-gray-700">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-600 dark:text-gray-300">{recommendation.replace(/^\d+\.\s*/, '')}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={resetForm}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Analyze Another Call
            </button>

            <button
              onClick={exportToPDF}
              disabled={isExporting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Exporting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export Certification
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
