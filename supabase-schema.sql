-- Esquema de base de datos para AgentIQ
-- Ejecutar este script en la consola SQL de Supabase

-- Tabla para almacenar los análisis de llamadas
CREATE TABLE IF NOT EXISTS call_analyses (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  transcript TEXT NOT NULL,
  analysis TEXT NOT NULL,
  recommendations TEXT NOT NULL,
  agent TEXT DEFAULT 'AgentIQ Representative',
  duration TEXT DEFAULT '5:00',
  sentiment TEXT DEFAULT 'Neutral',
  topics TEXT[] DEFAULT ARRAY['General inquiry', 'Customer service']::TEXT[],
  score FLOAT DEFAULT 85.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Habilitar RLS (Row Level Security)
  CONSTRAINT user_owns_analysis CHECK (auth.uid() = user_id)
);

-- Tabla para almacenar los contadores de uso
CREATE TABLE IF NOT EXISTS usage_counters (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'daily' o 'monthly'
  period TEXT NOT NULL, -- YYYY-MM-DD para daily, YYYY-MM para monthly
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Habilitar RLS (Row Level Security)
  CONSTRAINT user_owns_counter CHECK (auth.uid() = user_id)
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS call_analyses_user_id_idx ON call_analyses(user_id);
CREATE INDEX IF NOT EXISTS call_analyses_created_at_idx ON call_analyses(created_at);
CREATE INDEX IF NOT EXISTS usage_counters_user_id_idx ON usage_counters(user_id);
CREATE INDEX IF NOT EXISTS usage_counters_type_period_idx ON usage_counters(type, period);

-- Políticas de seguridad RLS
ALTER TABLE call_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_counters ENABLE ROW LEVEL SECURITY;

-- Políticas para call_analyses
CREATE POLICY "Users can view their own analyses" 
  ON call_analyses FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analyses" 
  ON call_analyses FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Políticas para usage_counters
CREATE POLICY "Users can view their own counters" 
  ON usage_counters FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own counters" 
  ON usage_counters FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own counters" 
  ON usage_counters FOR UPDATE 
  USING (auth.uid() = user_id);

-- Función para crear la tabla call_analyses (usada por el código)
CREATE OR REPLACE FUNCTION create_call_analyses_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS call_analyses (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    transcript TEXT NOT NULL,
    analysis TEXT NOT NULL,
    recommendations TEXT NOT NULL,
    agent TEXT DEFAULT 'AgentIQ Representative',
    duration TEXT DEFAULT '5:00',
    sentiment TEXT DEFAULT 'Neutral',
    topics TEXT[] DEFAULT ARRAY['General inquiry', 'Customer service']::TEXT[],
    score FLOAT DEFAULT 85.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  
  ALTER TABLE call_analyses ENABLE ROW LEVEL SECURITY;
  
  CREATE POLICY "Users can view their own analyses" 
    ON call_analyses FOR SELECT 
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can insert their own analyses" 
    ON call_analyses FOR INSERT 
    WITH CHECK (auth.uid() = user_id);
END;
$$;
