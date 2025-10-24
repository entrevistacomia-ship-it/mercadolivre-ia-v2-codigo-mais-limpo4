# MercadoIA Flex - Marketplace de Agentes de IA

Plataforma de marketplace para compra e venda de agentes de IA, com integração Supabase e sistema de autenticação completo.

## Requisitos

- Node.js 18+ (recomendado: instalar com [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm ou yarn
- Conta no Supabase (para configuração do banco de dados)

## Configuração Inicial

### 1. Clone o Repositório

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

O arquivo `.env` já existe no projeto, mas você precisa verificar se as credenciais do Supabase estão corretas.

**IMPORTANTE**: O projeto usa configuração em dois lugares diferentes:

#### a) Arquivo `.env` (raiz do projeto)

```env
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### b) Arquivo `src/lib/supabase.ts`

Este arquivo contém credenciais hardcoded que podem estar diferentes do `.env`:

```typescript
const supabaseUrl = 'https://zdjjnzawwotojarmnepr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

**SOLUÇÃO PARA PREVIEW**: Para garantir que o projeto funcione corretamente, você DEVE usar as mesmas credenciais em ambos os lugares. Recomenda-se atualizar o `src/lib/supabase.ts` para usar as variáveis de ambiente:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 4. Configure o Banco de Dados Supabase

#### a) Acesse seu projeto no Supabase

1. Vá para [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione ou crie um projeto
3. Copie a URL e a Anon Key do projeto (Settings > API)

#### b) Execute as Migrações

O projeto possui migrações SQL em `supabase/migrations/`. Execute-as no SQL Editor do Supabase na seguinte ordem:

1. Abra o SQL Editor no painel do Supabase
2. Execute o conteúdo de `supabase/migrations/20251007195806_create_marketplace_schema.sql`

Este script cria todas as tabelas necessárias:
- `profiles` - Perfis de usuários
- `categories` - Categorias de agentes
- `agents` - Agentes de IA à venda
- `purchases` - Histórico de compras
- `reviews` - Avaliações
- `favorites` - Favoritos
- `cart_items` - Itens no carrinho

#### c) Verifique o Auth

No painel do Supabase, vá para Authentication > Settings e verifique:
- Email confirmations: **desabilitado** (para testes)
- Site URL: Configure para o endereço do seu preview (ex: `http://localhost:8080`)

### 5. Execute o Projeto em Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:8080`

### 6. Build do Projeto

Para criar a versão de produção:

```bash
npm run build
```

Para preview da versão de produção:

```bash
npm run preview
```

## Estrutura do Projeto

```
/
├── src/
│   ├── components/      # Componentes React reutilizáveis
│   │   ├── auth/        # Componentes de autenticação
│   │   ├── home/        # Componentes da página inicial
│   │   ├── layout/      # Header, Footer
│   │   └── ui/          # Componentes UI do shadcn
│   ├── contexts/        # Contextos React (Auth, Cart)
│   ├── hooks/           # Hooks customizados
│   ├── lib/             # Utilitários e configurações
│   │   └── supabase.ts  # Cliente Supabase
│   ├── pages/           # Páginas da aplicação
│   └── integrations/    # Integrações externas
├── supabase/
│   ├── migrations/      # Scripts SQL de migração
│   └── functions/       # Edge Functions
└── public/              # Arquivos estáticos
```

## Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Roteamento**: React Router v6
- **Estado**: React Context API + React Query
- **Backend**: Supabase (Auth, Database, Storage)
- **Mobile**: Capacitor (Android/iOS)

## Funcionalidades

### Para Compradores
- Navegação por categorias de agentes
- Busca e filtros avançados
- Sistema de carrinho de compras
- Checkout com PIX (via Supabase Edge Functions)
- Histórico de compras
- Sistema de favoritos
- Avaliações e comentários

### Para Vendedores
- Dashboard de vendedor
- Cadastro de novos agentes
- Gestão de produtos
- Integração com n8n (webhooks)
- Análise de vendas

### Sistema de Autenticação
- Registro como comprador ou vendedor
- Login com email/senha
- Gestão de perfil
- Proteção de rotas

## Troubleshooting

### Problema: "Invalid API key"

**Causa**: Credenciais do Supabase não configuradas corretamente ou divergentes entre `.env` e `src/lib/supabase.ts`

**Solução**:
1. Verifique se as credenciais no `.env` estão corretas
2. Certifique-se de que `src/lib/supabase.ts` usa as mesmas credenciais
3. Reinicie o servidor de desenvolvimento após alterar o `.env`

### Problema: "Table does not exist"

**Causa**: Migrações não foram executadas no banco de dados

**Solução**:
1. Acesse o SQL Editor no Supabase
2. Execute os scripts em `supabase/migrations/`
3. Verifique se todas as tabelas foram criadas em Database > Tables

### Problema: "Auth session missing"

**Causa**: Configuração de autenticação incorreta

**Solução**:
1. Verifique a Site URL em Authentication > Settings
2. Adicione redirect URLs apropriadas
3. Limpe o cache do navegador e localStorage

### Problema: Preview não carrega ou fica em branco

**Causa**: Divergência entre as configurações do Supabase ou problemas com variáveis de ambiente

**Solução**:
1. Verifique o console do navegador para erros
2. Confirme que as variáveis de ambiente estão carregadas (console.log)
3. Certifique-se de que o build foi feito após alterar o `.env`
4. Verifique se há erros de CORS no Supabase (Project Settings > API)

## Deploy

### Lovable

Simplesmente acesse [Lovable](https://lovable.dev/projects/a69962a1-5aec-4bc6-821b-ef8ee57ceac7) e clique em Share → Publish.

### Vercel/Netlify

1. Faça o build do projeto: `npm run build`
2. Configure as variáveis de ambiente no painel
3. Faça deploy da pasta `dist/`

### Capacitor (Android/iOS)

```bash
# Build web
npm run build

# Sincronizar com Capacitor
npx cap sync

# Abrir no Android Studio
npx cap open android

# Abrir no Xcode
npx cap open ios
```

## Suporte

Para problemas com o projeto Lovable, visite: [Documentação Lovable](https://docs.lovable.dev)

Para problemas com Supabase, visite: [Documentação Supabase](https://supabase.com/docs)

## Licença

Este projeto é privado e de uso restrito.
