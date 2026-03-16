
-- 1. Agregar la columna updated_at a la tabla admin_access
ALTER TABLE public.admin_access
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 2. Convertir la contraseña actual en texto plano a su equivalente en Hash SHA-256
-- NOTA: Si tú cambiaste la contraseña 'admin123' a otra cosa, necesitas generar el
-- hash de esa nueva contraseña. Este query asume que aún dice 'admin123'. 
-- Hash para 'admin123' -> '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
UPDATE public.admin_access 
SET password = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9' 
WHERE username = 'admin' AND password = 'admin123';
