'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Process authentication redirect
    const handleAuthCallback = async () => {
      try {
        // First check if the user is already authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // User is already authenticated, redirect to dashboard
          console.log('User already authenticated, redirecting to dashboard...');
          router.push('/dashboard');
          return;
        }
        
        // Get the code from URL
        const { searchParams } = new URL(window.location.href);
        const code = searchParams.get('code');
        
        if (code) {
          // Exchange the code for a session
          const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (sessionError) {
            throw sessionError;
          }
          
          // Check if the user is now authenticated
          const { data: { session: newSession } } = await supabase.auth.getSession();
          
          if (newSession) {
            // Redirect to dashboard after successful authentication
            console.log('Authentication successful, redirecting to dashboard...');
            router.push('/dashboard');
          } else {
            setError('Authentication failed. Please try again.');
          }
        } else {
          // No code in URL but we're on the callback page
          // This could be a direct navigation to the callback page
          setError('Authentication process incomplete. Please try signing in again.');
        }
      } catch (err: Error | unknown) {
        console.error('Authentication error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred during authentication');
      }
    };

    // Small delay to ensure the code is processed
    const timer = setTimeout(() => {
      handleAuthCallback();
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
        {error ? (
          <div>
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">!</span>
              </div>
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-gray-900 dark:text-white">
              Authentication Error
            </h2>
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <div className="animate-pulse">
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">IQ</span>
              </div>
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-gray-900 dark:text-white">
              Processing your sign in...
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              You will be redirected automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
