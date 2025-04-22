import { createClient } from '@supabase/supabase-js'

// Access the environment variables with process.env and provide fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qvusegnytuxzzfetoixj.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2dXNlZ255dHV4enpmZXRvaXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwMDcxODgsImV4cCI6MjA1NzU4MzE4OH0.X3Yn8r3KagXBjinHZYBVXzu76zAbYNwr4QOjggL_Zl4'

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
