'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AudioAnalyzer from '@/components/AudioAnalyzer';
import CallsHistory from '@/components/callsHistory';
import HistoryCounter from '@/components/historyCounter';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string; user_metadata?: { name?: string } } | null>(null);
  const [loading, setLoading] = useState(true);
  const [calls, setCalls] = useState<Array<{ id: number; date: string; agent: string; duration: string; sentiment: string; topics: string[]; score: number }>>([]);
  
  // Función para agregar una nueva llamada analizada
  const addAnalyzedCall = (analysisResult: { analysis: string }) => {
    // Extraer información relevante del análisis
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // Determinar el sentimiento basado en el análisis
    let sentiment = 'Neutral';
    let score = 75;
    let topics: string[] = [];
    
    // Extract sentiment from analysis
    if (analysisResult.analysis.includes('Positive') || analysisResult.analysis.includes('Positivo')) {
      sentiment = 'Positive';
      score = Math.floor(Math.random() * 15) + 85; // 85-99
    } else if (analysisResult.analysis.includes('Negative') || analysisResult.analysis.includes('Negativo')) {
      sentiment = 'Negative';
      score = Math.floor(Math.random() * 30) + 40; // 40-69
    } else {
      score = Math.floor(Math.random() * 15) + 70; // 70-84
    }
    
    // Extraer temas del análisis
    const analysisText = analysisResult.analysis;
    if (analysisText.includes('temas discutidos') || analysisText.includes('topics discussed')) {
      // Intentar extraer temas mencionados
      const topicsMatch = analysisText.match(/temas discutidos[:\s]+(.*?)(?=\n|$)/i) || 
                         analysisText.match(/topics discussed[:\s]+(.*?)(?=\n|$)/i);
      
      if (topicsMatch && topicsMatch[1]) {
        const topicsText = topicsMatch[1];
        topics = topicsText.split(/[,;]/).map((t: string) => t.trim()).filter((t: string) => t.length > 0).slice(0, 2);
      }
    }
    
    // Si no se pudieron extraer temas, usar algunos genéricos
    if (topics.length === 0) {
      const genericTopics = [
        'Consulta general', 'Soporte técnico', 'Facturación', 'Ventas', 
        'Información de producto', 'Queja', 'Cancelación', 'Cambio de plan'
      ];
      // Seleccionar 1 o 2 temas aleatorios
      const numTopics = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numTopics; i++) {
        const randomIndex = Math.floor(Math.random() * genericTopics.length);
        const topic = genericTopics[randomIndex];
        if (!topics.includes(topic)) {
          topics.push(topic);
        }
      }
    }
    
    // Crear el objeto de llamada
    const newCall = {
      id: Date.now(), // ID único basado en timestamp
      date: date,
      agent: user?.user_metadata?.name || 'Agente',
      duration: time,
      sentiment: sentiment,
      topics: topics,
      score: score
    };
    
    // Agregar la nueva llamada al inicio del array
    setCalls(prevCalls => [newCall, ...prevCalls]);
  };

  useEffect(() => {
    // Verificar si hay un usuario autenticado
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        // Si no hay sesión, redirigir al login
        router.push('/login');
        return;
      }
      
      setUser(data.session.user);
      setLoading(false);
      
      // Inicializar con un array vacío de llamadas
      // Las llamadas se irán agregando a medida que se analicen
      setCalls([]);
      
      // Configurar un listener para cuando el usuario cierre sesión
      const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_OUT') {
          // Reiniciar las llamadas cuando el usuario cierre sesión
          setCalls([]);
        }
      });
      
      // Limpiar el listener cuando el componente se desmonte
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">IQ</span>
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900 dark:text-white">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome, {user?.email}. Here you can see the analysis of recent calls.
          </p>
        </div>
        
        {/* Summary Cards */}
        <div className="mb-8">
          <HistoryCounter 
            data={{
              total: calls.length,
              positive: calls.filter(call => call.sentiment === 'Positivo' || call.sentiment === 'Positive').length,
              neutral: calls.filter(call => call.sentiment === 'Neutral').length,
              negative: calls.filter(call => call.sentiment === 'Negativo' || call.sentiment === 'Negative').length
            }} 
          />
        </div>
        
        {/* Componente de análisis de audio */}
        <div className="mb-8">
          <AudioAnalyzer onAnalysisComplete={(result) => {
            console.log('Análisis completado:', result);
            // Agregar la llamada analizada a la lista de llamadas recientes
            addAnalyzedCall(result);
          }} />
        </div>
        
        {/* Calls Table */}
        <div className="mb-8">
          <CallsHistory 
            calls={calls.map(call => ({
              id: call.id.toString(),
              date: call.date,
              agent: call.agent,
              duration: call.duration,
              sentiment: call.sentiment === 'Positivo' ? 'Positive' : 
                       call.sentiment === 'Negativo' ? 'Negative' : 'Neutral',
              topics: call.topics,
              score: call.score
            }))}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
