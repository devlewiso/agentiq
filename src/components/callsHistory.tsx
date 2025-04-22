'use client';

import { useState, useEffect } from 'react';

interface Call {
  id: string;
  date: string;
  agent: string;
  duration: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  topics: string[];
  score: number;
}

interface CallsHistoryProps {
  calls?: Call[];
}

export default function CallsHistory({ calls = [] }: CallsHistoryProps) {
  const [displayedCalls, setDisplayedCalls] = useState<Call[]>(calls);
  
  // Update displayed calls when props change
  useEffect(() => {
    if (calls.length > 0) {
      setDisplayedCalls(calls);
    }
  }, [calls]);

  // Función para obtener el color de fondo según el sentimiento
  const getSentimentColor = (sentiment: string) => {
    switch(sentiment) {
      case 'Positive':
        return 'bg-green-100 text-green-800';
      case 'Negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Función para obtener el color de la barra de puntuación
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Recent Calls</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">DATE</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">AGENT</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">DURATION</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">SENTIMENT</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">TOPICS</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">SCORE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {displayedCalls.map((call) => (
              <tr key={call.id} className="hover:bg-gray-800 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{call.date}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{call.agent}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{call.duration}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(call.sentiment)}`}>
                    {call.sentiment}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">
                  <div className="flex flex-wrap gap-1">
                    {call.topics.map((topic, index) => (
                      <span key={index} className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  <div className="flex items-center">
                    <span className="mr-2">{call.score}%</span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getScoreColor(call.score)}`} 
                        style={{ width: `${call.score}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
