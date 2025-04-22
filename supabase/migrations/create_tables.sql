-- Create call_analyses table to store analysis results
CREATE TABLE IF NOT EXISTS call_analyses (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  transcript TEXT NOT NULL,
  analysis TEXT NOT NULL,
  recommendations TEXT NOT NULL,
  agent TEXT NOT NULL DEFAULT 'AgentIQ Representative',
  duration TEXT NOT NULL,
  sentiment TEXT NOT NULL CHECK (sentiment IN ('Positive', 'Neutral', 'Negative')),
  topics TEXT[] NOT NULL,
  score NUMERIC NOT NULL CHECK (score >= 0 AND score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Enable RLS (Row Level Security)
  CONSTRAINT user_owns_analysis CHECK (auth.uid() = user_id)
);

-- Create usage_counters table to track daily usage
CREATE TABLE IF NOT EXISTS usage_counters (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint to ensure one counter per user per day
  UNIQUE(user_id, date),
  
  -- Enable RLS (Row Level Security)
  CONSTRAINT user_owns_counter CHECK (auth.uid() = user_id)
);

-- Enable Row Level Security
ALTER TABLE call_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_counters ENABLE ROW LEVEL SECURITY;

-- Create policies for call_analyses
CREATE POLICY "Users can view their own analyses" 
  ON call_analyses FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analyses" 
  ON call_analyses FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policies for usage_counters
CREATE POLICY "Users can view their own counters" 
  ON usage_counters FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own counters" 
  ON usage_counters FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own counters" 
  ON usage_counters FOR UPDATE 
  USING (auth.uid() = user_id);
