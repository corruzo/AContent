ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS youtube_url TEXT;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Categories son publicas" ON categories;
DROP POLICY IF EXISTS "Permitir insert a todos (temporal)" ON categories;
DROP POLICY IF EXISTS "Permitir update a todos (temporal)" ON categories;
DROP POLICY IF EXISTS "Permitir delete a todos (temporal)" ON categories;

CREATE POLICY "Categories son publicas" ON categories FOR SELECT USING (true);
CREATE POLICY "Permitir insert a todos (temporal)" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update a todos (temporal)" ON categories FOR UPDATE USING (true);
CREATE POLICY "Permitir delete a todos (temporal)" ON categories FOR DELETE USING (true);

INSERT INTO categories (name) VALUES 
('Residencial'), 
('Comercial'), 
('Luxury'), 
('Airbnb') 
ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION increment_views(project_id BIGINT)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE portfolio SET views = views + 1 WHERE id = project_id;
$$;
