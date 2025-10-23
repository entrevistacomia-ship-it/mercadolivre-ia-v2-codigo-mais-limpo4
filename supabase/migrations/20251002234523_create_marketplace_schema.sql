/*
  # Schema do Mercado-Livre-IA

  ## Novas Tabelas
  
  1. **profiles** - Perfis de usuários
     - `id` (uuid, PK, referência para auth.users)
     - `email` (text)
     - `full_name` (text)
     - `avatar_url` (text, nullable)
     - `user_type` (text) - 'buyer' ou 'seller'
     - `user_level` (text) - Nível de fidelidade (ex: "Membro Prata")
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)
  
  2. **categories** - Categorias de produtos/agentes
     - `id` (uuid, PK)
     - `name` (text)
     - `slug` (text, unique)
     - `description` (text, nullable)
     - `icon` (text, nullable)
     - `created_at` (timestamptz)
  
  3. **agents** - Agentes de IA
     - `id` (uuid, PK)
     - `seller_id` (uuid, FK para profiles)
     - `category_id` (uuid, FK para categories)
     - `name` (text)
     - `description` (text)
     - `price` (decimal) - 0 para agentes gratuitos
     - `is_free` (boolean) - Indica se é gratuito
     - `is_featured` (boolean)
     - `images` (jsonb) - Array de URLs de imagens
     - `videos` (jsonb) - Array de URLs de vídeos
     - `n8n_url` (text) - URL do arquivo JSON do agente
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)
  
  4. **purchases** - Histórico de compras
     - `id` (uuid, PK)
     - `buyer_id` (uuid, FK para profiles)
     - `agent_id` (uuid, FK para agents)
     - `price_paid` (decimal)
     - `purchased_at` (timestamptz)
     - `license_type` (text) - 'lifetime' ou 'temporary'
     - `license_expires_at` (timestamptz, nullable)
  
  5. **reviews** - Avaliações de agentes
     - `id` (uuid, PK)
     - `agent_id` (uuid, FK para agents)
     - `user_id` (uuid, FK para profiles)
     - `rating` (int) - 1 a 5
     - `comment` (text)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)
  
  6. **favorites** - Lista de desejos
     - `id` (uuid, PK)
     - `user_id` (uuid, FK para profiles)
     - `agent_id` (uuid, FK para agents)
     - `created_at` (timestamptz)
  
  7. **cart_items** - Itens no carrinho
     - `id` (uuid, PK)
     - `user_id` (uuid, FK para profiles)
     - `agent_id` (uuid, FK para agents)
     - `created_at` (timestamptz)

  ## Segurança
  
  - RLS habilitado em todas as tabelas
  - Políticas específicas para cada tipo de operação
  - Vendedores podem gerenciar apenas seus próprios agentes
  - Compradores podem ver apenas suas próprias compras e favoritos
*/

-- Criar tabela de perfis
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  user_type text NOT NULL DEFAULT 'buyer' CHECK (user_type IN ('buyer', 'seller')),
  user_level text DEFAULT 'Membro Bronze',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver próprio perfil"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Qualquer um pode criar perfil"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Criar tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categorias são públicas"
  ON categories FOR SELECT
  TO authenticated, anon
  USING (true);

-- Criar tabela de agentes
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) DEFAULT 0 CHECK (price >= 0),
  is_free boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  images jsonb DEFAULT '[]'::jsonb,
  videos jsonb DEFAULT '[]'::jsonb,
  n8n_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agentes são visíveis para todos"
  ON agents FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Vendedores podem criar agentes"
  ON agents FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = seller_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND user_type = 'seller')
  );

CREATE POLICY "Vendedores podem atualizar próprios agentes"
  ON agents FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Vendedores podem deletar próprios agentes"
  ON agents FOR DELETE
  TO authenticated
  USING (auth.uid() = seller_id);

-- Criar tabela de compras
CREATE TABLE IF NOT EXISTS purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  price_paid decimal(10,2) NOT NULL DEFAULT 0,
  purchased_at timestamptz DEFAULT now(),
  license_type text DEFAULT 'lifetime' CHECK (license_type IN ('lifetime', 'temporary')),
  license_expires_at timestamptz
);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprias compras"
  ON purchases FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id);

CREATE POLICY "Usuários podem criar compras"
  ON purchases FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

-- Criar tabela de avaliações
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(agent_id, user_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Avaliações são públicas"
  ON reviews FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Usuários podem criar avaliações"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar próprias avaliações"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar próprias avaliações"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Criar tabela de favoritos
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, agent_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprios favoritos"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem adicionar favoritos"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem remover favoritos"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Criar tabela de carrinho
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  agent_id uuid REFERENCES agents(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, agent_id)
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprio carrinho"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem adicionar ao carrinho"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem remover do carrinho"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Inserir categorias padrão
INSERT INTO categories (name, slug, description, icon) VALUES
  ('Assistentes Virtuais', 'assistentes-virtuais', 'Agentes para atendimento e suporte', 'MessageSquare'),
  ('Análise de Dados', 'analise-dados', 'Agentes especializados em análise e insights', 'BarChart3'),
  ('Marketing', 'marketing', 'Agentes para automação de marketing', 'Megaphone'),
  ('Vendas', 'vendas', 'Agentes para otimização de vendas', 'TrendingUp'),
  ('Desenvolvimento', 'desenvolvimento', 'Agentes para programação e código', 'Code'),
  ('Design', 'design', 'Agentes para criação e design', 'Palette')
ON CONFLICT (slug) DO NOTHING;