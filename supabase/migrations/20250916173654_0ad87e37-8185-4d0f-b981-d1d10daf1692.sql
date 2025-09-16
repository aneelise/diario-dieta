-- Fix security warning by setting search_path for function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (id, nome)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'nome', new.email));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;