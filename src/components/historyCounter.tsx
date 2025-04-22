'use client';

import { useState, useEffect } from 'react';

interface CounterData {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
}

interface HistoryCounterProps {
  data?: CounterData;
}

export default function HistoryCounter({ data }: HistoryCounterProps) {
  const [counters, setCounters] = useState<CounterData>(data || {
    total: 0,
    positive: 0,
    neutral: 0,
    negative: 0
  });
  
  // Update counters when props change
  useEffect(() => {
    if (data) {
      setCounters(data);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total calls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
        <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Total calls</p>
          <p className="text-white text-2xl font-bold">{counters.total}</p>
        </div>
      </div>

      {/* Positive calls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
        <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Positive calls</p>
          <p className="text-white text-2xl font-bold">{counters.positive}</p>
        </div>
      </div>

      {/* Neutral calls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
        <div className="w-12 h-12 rounded-full bg-yellow-900/30 flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Neutral calls</p>
          <p className="text-white text-2xl font-bold">{counters.neutral}</p>
        </div>
      </div>

      {/* Negative calls */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
        <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Negative calls</p>
          <p className="text-white text-2xl font-bold">{counters.negative}</p>
        </div>
      </div>
    </div>
  );
}
