-- ========================================
-- MERCADO LIVRE-IA - DATABASE SETUP
-- Execute este SQL no Supabase SQL Editor
-- ========================================

-- 1. Create profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  user_type text check (user_type in ('buyer', 'seller')) not null default 'buyer',
  user_level text default 'basic',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create categories table
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create agents table
create table if not exists public.agents (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references public.profiles(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  description text not null,
  price decimal(10,2) not null,
  is_featured boolean default false,
  is_free boolean default false,
  n8n_url text,
  images text[] default '{}',
  videos text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create purchases table
create table if not exists public.purchases (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  agent_id uuid references public.agents(id) on delete cascade not null,
  price_paid decimal(10,2) not null,
  purchased_at timestamp with time zone default timezone('utc'::text, now()) not null,
  license_type text check (license_type in ('lifetime', 'temporary')) not null default 'lifetime',
  license_expires_at timestamp with time zone
);

-- 5. Create reviews table
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  agent_id uuid references public.agents(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(agent_id, user_id)
);

-- 6. Create favorites table
create table if not exists public.favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  agent_id uuid references public.agents(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, agent_id)
);

-- 7. Create cart_items table
create table if not exists public.cart_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  agent_id uuid references public.agents(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, agent_id)
);

-- ========================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.agents enable row level security;
alter table public.purchases enable row level security;
alter table public.reviews enable row level security;
alter table public.favorites enable row level security;
alter table public.cart_items enable row level security;

-- ========================================
-- RLS POLICIES - PROFILES
-- ========================================

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ========================================
-- RLS POLICIES - CATEGORIES
-- ========================================

create policy "Categories are viewable by everyone"
  on public.categories for select
  using (true);

-- ========================================
-- RLS POLICIES - AGENTS
-- ========================================

create policy "Agents are viewable by everyone"
  on public.agents for select
  using (true);

create policy "Sellers can insert their own agents"
  on public.agents for insert
  with check (auth.uid() = seller_id);

create policy "Sellers can update their own agents"
  on public.agents for update
  using (auth.uid() = seller_id);

create policy "Sellers can delete their own agents"
  on public.agents for delete
  using (auth.uid() = seller_id);

-- ========================================
-- RLS POLICIES - PURCHASES
-- ========================================

create policy "Users can view their own purchases"
  on public.purchases for select
  using (auth.uid() = buyer_id);

create policy "Users can insert their own purchases"
  on public.purchases for insert
  with check (auth.uid() = buyer_id);

-- ========================================
-- RLS POLICIES - REVIEWS
-- ========================================

create policy "Reviews are viewable by everyone"
  on public.reviews for select
  using (true);

create policy "Authenticated users can insert reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reviews"
  on public.reviews for update
  using (auth.uid() = user_id);

create policy "Users can delete their own reviews"
  on public.reviews for delete
  using (auth.uid() = user_id);

-- ========================================
-- RLS POLICIES - FAVORITES
-- ========================================

create policy "Users can view their own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert their own favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- ========================================
-- RLS POLICIES - CART ITEMS
-- ========================================

create policy "Users can view their own cart"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "Users can insert into their own cart"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can delete from their own cart"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- ========================================
-- FUNCTIONS & TRIGGERS
-- ========================================

-- Function to handle new user registration
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, user_type)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'user_type', 'buyer')
  );
  return new;
end;
$$;

-- Drop trigger if exists and recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers for updated_at
drop trigger if exists handle_profiles_updated_at on public.profiles;
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

drop trigger if exists handle_agents_updated_at on public.agents;
create trigger handle_agents_updated_at
  before update on public.agents
  for each row execute procedure public.handle_updated_at();

drop trigger if exists handle_reviews_updated_at on public.reviews;
create trigger handle_reviews_updated_at
  before update on public.reviews
  for each row execute procedure public.handle_updated_at();

-- ========================================
-- INSERT SAMPLE DATA
-- ========================================

-- Insert sample categories
insert into public.categories (name, slug, description, icon) values
  ('Automação de Marketing', 'marketing', 'Email marketing, leads, campanhas', 'Mail'),
  ('Integração de E-commerce', 'vendas', 'Lojas online, inventário, pedidos', 'ShoppingBag'),
  ('Análise de Dados', 'analise-dados', 'Relatórios, dashboards, métricas', 'BarChart3'),
  ('Integração de Dados', 'desenvolvimento', 'APIs, bancos de dados, sync', 'Database'),
  ('Comunicação', 'assistentes-virtuais', 'WhatsApp, Slack, notificações', 'MessageSquare'),
  ('Documentação', 'design', 'PDFs, contratos, formulários', 'FileText'),
  ('Produtividade', 'produtividade', 'Tarefas, calendário, lembretes', 'Settings'),
  ('Automação Geral', 'automacao-geral', 'Workflows customizados', 'Zap')
on conflict (slug) do nothing;

-- Insert sample free agent for testing
-- Note: This will only work after at least one user has registered
-- The agent will be assigned to the first user in the system
insert into public.agents (
  seller_id,
  category_id,
  name,
  description,
  price,
  is_featured,
  is_free,
  n8n_url,
  images
)
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'produtividade' limit 1),
  'Agente de Teste Gratuito - Organizador de Tarefas',
  'Este é um agente de automação gratuito para demonstração. Ele automatiza a organização de tarefas diárias, sincronizando diferentes plataformas e enviando lembretes personalizados. Perfeito para aumentar sua produtividade sem custo!',
  0,
  false,
  true,
  'https://n8n.io/workflows/1234',
  array['https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80']
where exists (select 1 from auth.users limit 1)
on conflict do nothing;

-- Insert additional free test agents
insert into public.agents (seller_id, category_id, name, description, price, is_featured, is_free, n8n_url, images)
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Clínica Estética',
  'Automatize o atendimento e qualificação de leads para sua clínica estética. Envia mensagens personalizadas, agenda consultas e acompanha o funil de vendas.',
  0, false, true, 'https://n8n.io/workflows/clinica-estetica',
  array['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Dentista',
  'Agente especializado em captar e nutrir pacientes para clínicas odontológicas. Automatiza lembretes de consulta, follow-ups e campanhas de reativação.',
  0, false, true, 'https://n8n.io/workflows/dentista',
  array['https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'vendas' limit 1),
  'SDR para Imobiliária',
  'Automatize o atendimento de leads imobiliários. Qualifica interessados, agenda visitas e mantém o relacionamento com clientes potenciais.',
  0, false, true, 'https://n8n.io/workflows/imobiliaria',
  array['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Capsulado',
  'Automatize vendas de produtos capsulados e suplementos. Qualifica leads, envia informações sobre produtos e gerencia pedidos.',
  0, false, true, 'https://n8n.io/workflows/capsulado',
  array['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'vendas' limit 1),
  'SDR para Supermercado',
  'Automatize promoções, programas de fidelidade e atendimento ao cliente para supermercados. Integra com sistemas de pedido online.',
  0, false, true, 'https://n8n.io/workflows/supermercado',
  array['https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Clínica de Reabilitação',
  'Atendimento humanizado e automatizado para clínicas de reabilitação. Qualifica pacientes, agenda avaliações e mantém contato com familiares.',
  0, false, true, 'https://n8n.io/workflows/reabilitacao',
  array['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'IA que Vende IA',
  'Meta-agente especializado em vender soluções de inteligência artificial. Demonstra valor, qualifica leads técnicos e agenda reuniões.',
  0, false, true, 'https://n8n.io/workflows/ia-vende-ia',
  array['https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Advogado',
  'Automatize a captação de clientes para escritórios de advocacia. Qualifica casos, agenda consultas iniciais e gerencia relacionamento.',
  0, false, true, 'https://n8n.io/workflows/advogado',
  array['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Energia Solar',
  'Agente especializado em prospecção para energia solar. Calcula economia, qualifica leads e agenda visitas técnicas.',
  0, false, true, 'https://n8n.io/workflows/energia-solar',
  array['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Barbearia',
  'Automatize agendamentos e fidelização de clientes para barbearias. Envia lembretes, promoções e gerencia horários.',
  0, false, true, 'https://n8n.io/workflows/barbearia',
  array['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Serviços Elétricos',
  'Automatize orçamentos e agendamentos para serviços elétricos. Qualifica emergências, agenda visitas e gerencia equipes.',
  0, false, true, 'https://n8n.io/workflows/eletricos',
  array['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'vendas' limit 1),
  'SDR para Provedor de Internet',
  'Automatize vendas de planos de internet. Verifica disponibilidade, compara planos e agenda instalações.',
  0, false, true, 'https://n8n.io/workflows/internet',
  array['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Programas de Afiliados',
  'Automatize a prospecção e gestão de afiliados. Qualifica parceiros, envia materiais promocionais e acompanha conversões.',
  0, false, true, 'https://n8n.io/workflows/afiliados',
  array['https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'vendas' limit 1),
  'SDR para Delivery',
  'Automatize pedidos e promoções para restaurantes e delivery. Integra cardápios, processa pedidos e envia atualizações.',
  0, false, true, 'https://n8n.io/workflows/delivery',
  array['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Hotel e Pousadas',
  'Automatize reservas e atendimento para hotéis. Consulta disponibilidade, envia cotações e gerencia check-in/out.',
  0, false, true, 'https://n8n.io/workflows/hotel',
  array['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Salão de Beleza',
  'Automatize agendamentos e promoções para salões de beleza. Gerencia horários, envia lembretes e campanhas de fidelização.',
  0, false, true, 'https://n8n.io/workflows/salao-beleza',
  array['https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Energia Solar por Assinatura',
  'Agente especializado em modelo de assinatura para energia solar. Calcula planos mensais e gerencia contratos recorrentes.',
  0, false, true, 'https://n8n.io/workflows/solar-assinatura',
  array['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'produtividade' limit 1),
  'Revisor de IA',
  'Agente que revisa e melhora textos automaticamente. Verifica gramática, coerência e otimiza conteúdo com inteligência artificial.',
  0, false, true, 'https://n8n.io/workflows/revisor-ia',
  array['https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'vendas' limit 1),
  'SDR para Móveis e Eletrodomésticos',
  'Automatize vendas de móveis e eletrodomésticos. Envia catálogos, calcula fretes e processa orçamentos.',
  0, false, true, 'https://n8n.io/workflows/moveis',
  array['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'vendas' limit 1),
  'SDR para Imóveis',
  'Agente completo para vendas e locação de imóveis. Qualifica interessados, agenda visitas e envia documentação.',
  0, false, true, 'https://n8n.io/workflows/imoveis',
  array['https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Academia',
  'Automatize matrículas e retenção de alunos para academias. Envia treinos, dicas e campanhas de reativação.',
  0, false, true, 'https://n8n.io/workflows/academia',
  array['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Petshop',
  'Automatize vendas e agendamentos para petshops. Gerencia banho e tosa, consultas veterinárias e vendas de produtos.',
  0, false, true, 'https://n8n.io/workflows/petshop',
  array['https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'vendas' limit 1),
  'SDR para Materiais de Construção',
  'Automatize orçamentos e vendas de materiais de construção. Calcula quantidades, envia listas e processa pedidos.',
  0, false, true, 'https://n8n.io/workflows/construcao',
  array['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'vendas' limit 1),
  'SDR para Loja de Celulares e Manutenção',
  'Automatize vendas de celulares e agendamento de reparos. Consulta estoque, orça consertos e gerencia garantias.',
  0, false, true, 'https://n8n.io/workflows/celulares',
  array['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Suplementos de Academia',
  'Automatize vendas de suplementos alimentares. Recomenda produtos, processa pedidos e gerencia programas de fidelidade.',
  0, false, true, 'https://n8n.io/workflows/suplementos',
  array['https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'vendas' limit 1),
  'SDR para Capsulado',
  'Automatize vendas de produtos capsulados e suplementos personalizados. Qualifica necessidades, recomenda fórmulas e gerencia pedidos.',
  0, false, true, 'https://n8n.io/workflows/capsulado',
  array['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'IA que Vende IA',
  'Agente especializado em vender soluções de inteligência artificial. Qualifica prospects, demonstra casos de uso e fecha vendas de IA.',
  0, false, true, 'https://n8n.io/workflows/vende-ia',
  array['https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80']
where exists (select 1 from auth.users limit 1)
union all
select 
  (select id from auth.users limit 1),
  (select id from public.categories where slug = 'marketing' limit 1),
  'SDR para Advogado',
  'Automatize captação de clientes para escritórios de advocacia. Qualifica casos, agenda consultas e gerencia prazos processuais.',
  0, false, true, 'https://n8n.io/workflows/advogado',
  array['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80']
where exists (select 1 from auth.users limit 1)
on conflict do nothing;

-- ========================================
-- STORAGE BUCKETS
-- ========================================

-- Create storage buckets for agent files and images
insert into storage.buckets (id, name, public)
values 
  ('agent-images', 'agent-images', true),
  ('agent-files', 'agent-files', false)
on conflict (id) do nothing;

-- Storage policies for agent-images bucket (public read, authenticated write)
create policy "Public can view agent images"
on storage.objects for select
using (bucket_id = 'agent-images');

create policy "Authenticated users can upload agent images"
on storage.objects for insert
with check (
  bucket_id = 'agent-images' 
  and auth.role() = 'authenticated'
);

create policy "Users can update their own agent images"
on storage.objects for update
using (
  bucket_id = 'agent-images' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete their own agent images"
on storage.objects for delete
using (
  bucket_id = 'agent-images' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for agent-files bucket (private, only owner can access)
create policy "Users can view their own agent files"
on storage.objects for select
using (
  bucket_id = 'agent-files' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Authenticated users can upload agent files"
on storage.objects for insert
with check (
  bucket_id = 'agent-files' 
  and auth.role() = 'authenticated'
);

create policy "Users can update their own agent files"
on storage.objects for update
using (
  bucket_id = 'agent-files' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete their own agent files"
on storage.objects for delete
using (
  bucket_id = 'agent-files' 
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- ========================================
-- DONE! 🎉
-- ========================================
