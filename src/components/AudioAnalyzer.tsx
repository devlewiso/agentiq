'use client';

import { useState, useRef, ReactElement, useEffect } from 'react';
import { GoogleGenAI, createUserContent, createPartFromUri } from '@google/genai';
import { 
  AUDIO_ANALYSIS_PROMPT,
  TRANSCRIPTION_PROMPT 
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
    if (!file || !file.type) {
      setError('Please select a valid audio file.');
      return;
    }
    
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
    
    // Verificar la duración del audio (máximo 5 minutos)
    const isValidDuration = await checkAudioDuration(file);
    if (!isValidDuration) {
      setError(`Audio file exceeds the maximum duration of ${MAX_AUDIO_DURATION / 60} minutes for the free plan.`);
      return;
    }
    
    // Usar el prompt principal para el análisis
    const analysisPrompt = AUDIO_ANALYSIS_PROMPT;

    try {
      setIsUploading(true);
      setError(null);
      
      // Crear una instancia de la API de Gemini
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found. Please set NEXT_PUBLIC_GOOGLE_API_KEY in your .env file');
      }
      const ai = new GoogleGenAI({ apiKey });
      
      // Verificar que el archivo tenga un tipo válido
      if (!file.type) {
        throw new Error('The file does not have a valid MIME type');
      }
      
      // Subir el archivo de audio a Gemini
      const fileBlob = new Blob([await file.arrayBuffer()], { type: file.type });
      const fileObj = new File([fileBlob], file.name || 'audio_file', { type: file.type });
      
      setIsUploading(false);
      setIsAnalyzing(true);
      
      // Subir el archivo a Gemini
      const myfileResponse = await ai.files.upload({
        file: fileObj,
        config: { mimeType: file.type },
      });
      
      // Verificar que el archivo se haya subido correctamente
      if (!myfileResponse || !myfileResponse.uri) {
        throw new Error('Failed to upload audio file to Gemini');
      }
      
      const myfile = {
        uri: myfileResponse.uri,
        mimeType: file.type
      };
      
      try {
        console.log('Starting audio analysis with Gemini...');
        
        // Paso 1: Obtener la transcripción del audio
        console.log('Step 1: Getting transcription...');
        const transcriptResponse = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: createUserContent([
            createPartFromUri(myfile.uri, myfile.mimeType),
            TRANSCRIPTION_PROMPT
          ]),
        });
        
        let transcript = 'Could not obtain audio transcription.';
        if (transcriptResponse && transcriptResponse.text) {
          transcript = transcriptResponse.text;
        } else if (transcriptResponse && transcriptResponse.candidates && transcriptResponse.candidates.length > 0) {
          const candidate = transcriptResponse.candidates[0];
          if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
            const part = candidate.content.parts[0];
            if (part.text) {
              transcript = part.text;
            }
          }
        }
        console.log('Transcription completed');
        
        // Paso 2: Analizar la llamada
        console.log('Step 2: Analyzing the call...');
        const analysisResponse = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: createUserContent([
            createPartFromUri(myfile.uri, myfile.mimeType),
            analysisPrompt
          ]),
        });
        
        let analysis = 'Could not obtain audio analysis.';
        if (analysisResponse && analysisResponse.text) {
          analysis = analysisResponse.text;
        } else if (analysisResponse && analysisResponse.candidates && analysisResponse.candidates.length > 0) {
          const candidate = analysisResponse.candidates[0];
          if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
            const part = candidate.content.parts[0];
            if (part.text) {
              analysis = part.text;
            }
          }
        }
        console.log('Analysis completed');
        
        // Extraer recomendaciones
        console.log('Step 3: Extracting recommendations...');
        const recommendationsSection = analysis.match(/recommendations:(\s*[\s\S]*)/i);
        let recommendations = '';
        
        if (recommendationsSection && recommendationsSection[1]) {
          recommendations = recommendationsSection[1].trim();
        } else {
          recommendations = 'No specific recommendations provided.';
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
        const sentimentMatch = analysis.match(/sentiment:?\s*(positive|negative|neutral)/i);
        const sentiment = sentimentMatch ? sentimentMatch[1].charAt(0).toUpperCase() + sentimentMatch[1].slice(1) : 'Neutral';
        
        // Extraer puntuación de calidad del análisis
        const scoreMatch = analysis.match(/quality score:?\s*(\d+(\.\d+)?)/i) || 
                          analysis.match(/quality:?\s*(\d+(\.\d+)?)/i) ||
                          analysis.match(/overall score:?\s*(\d+(\.\d+)?)/i);
        const score = scoreMatch ? scoreMatch[1] : '85';
        
        // Extraer temas del análisis
        const topicsSection = analysis.match(/key topics:?([\s\S]*?)(?=\n\n|$)/i) ||
                           analysis.match(/main topics:?([\s\S]*?)(?=\n\n|$)/i);
        let topics: string[] = [];
        
        if (topicsSection) {
          const topicsText = topicsSection[1];
          topics = topicsText.split(/\n-|\n•|\n\*/)
            .map(topic => topic.trim())
            .filter(topic => topic.length > 0);
        } else {
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
        console.error('Error processing audio with Gemini:', error);
        setError(`Error analyzing audio: ${error.message || 'An unknown error occurred'}`);
      } finally {
        setIsAnalyzing(false);
      }
    } catch (err: any) {
      console.error('Error in audio analysis:', err);
      setError(`Error analyzing audio: ${err.message || 'An unknown error occurred'}`);
    } finally {
      setIsAnalyzing(false);
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
              <p className="text-sm text-blue-600 dark:text-blue-400">5 analyses/day, 15 analyses/month, max 5 min per call</p>
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
            className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
              dragActive 
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
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-gray-600 dark:text-gray-300">{recommendation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Export options for authenticated users */}
          {user && (
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Export Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-2">
                    <div className="flex-shrink-0 h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mr-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">Certification</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Professional certification of analysis results</p>
                    </div>
                  </div>
                  <button
                    onClick={exportToPDF}
                    disabled={isExporting}
                    className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
                      <>Generate Certification</>
                    )}
                  </button>
                </div>
                

              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            <button
              onClick={resetForm}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full sm:w-auto"
            >
              Analyze Another Audio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
