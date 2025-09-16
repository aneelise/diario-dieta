-- Add missing hora column to dieta table
ALTER TABLE public.dieta 
ADD COLUMN IF NOT EXISTS hora TIME DEFAULT '08:00';