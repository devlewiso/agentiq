"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there is an authenticated user
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);

      // Subscribe to authentication changes
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user || null);
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    checkUser();
  }, []);
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">IQ</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">AgentIQ</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-blue-600 dark:text-blue-400 font-medium">Home</Link>
          <Link href="/features" className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Features</Link>
          <Link href="/pricing" className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Pricing</Link>
          <Link href="/contact" className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Contact</Link>
        </nav>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-300 text-sm hidden sm:inline">
                {user.email}
              </span>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/');
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                Sign Out
              </button>
              <Link 
                href="/dashboard" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <button 
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}