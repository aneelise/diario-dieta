-- Enable RLS on all tables
ALTER TABLE public.diario ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dieta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for diario table
CREATE POLICY "Users can view their own diary entries" 
ON public.diario 
FOR SELECT 
USING (usuario_id = auth.uid());

CREATE POLICY "Users can create their own diary entries" 
ON public.diario 
FOR INSERT 
WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Users can update their own diary entries" 
ON public.diario 
FOR UPDATE 
USING (usuario_id = auth.uid());

CREATE POLICY "Users can delete their own diary entries" 
ON public.diario 
FOR DELETE 
USING (usuario_id = auth.uid());

-- Create RLS policies for dieta table
CREATE POLICY "Users can view their own diet entries" 
ON public.dieta 
FOR SELECT 
USING (usuario_id = auth.uid());

CREATE POLICY "Users can create their own diet entries" 
ON public.dieta 
FOR INSERT 
WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Users can update their own diet entries" 
ON public.dieta 
FOR UPDATE 
USING (usuario_id = auth.uid());

CREATE POLICY "Users can delete their own diet entries" 
ON public.dieta 
FOR DELETE 
USING (usuario_id = auth.uid());

-- Create RLS policies for usuarios table
CREATE POLICY "Users can view their own profile" 
ON public.usuarios 
FOR SELECT 
USING (id = auth.uid());

CREATE POLICY "Users can create their own profile" 
ON public.usuarios 
FOR INSERT 
WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update their own profile" 
ON public.usuarios 
FOR UPDATE 
USING (id = auth.uid());

-- Add missing columns to diario table if needed
ALTER TABLE public.diario 
ADD COLUMN IF NOT EXISTS hora TIME,
ADD COLUMN IF NOT EXISTS refeicao_livre_ativa BOOLEAN DEFAULT FALSE;