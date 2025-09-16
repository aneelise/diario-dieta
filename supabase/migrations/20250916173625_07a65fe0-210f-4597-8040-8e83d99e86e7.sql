-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (id, nome)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'nome', new.email));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert current authenticated users that might not exist in usuarios table
INSERT INTO public.usuarios (id, nome)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'nome', email) as nome
FROM auth.users 
WHERE id NOT IN (SELECT id FROM public.usuarios);