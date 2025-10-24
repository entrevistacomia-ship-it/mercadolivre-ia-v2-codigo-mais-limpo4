# 🤖 GUIA COMPLETO - Google AI Studio (Gemini)

## 📋 INSTRUÇÕES PARA O GEMINI

### Como Rodar Este Projeto no Google AI Studio

Este é um projeto **React + TypeScript + Vite** com estrutura completa de marketplace.

---

## 🚀 COMANDOS ESSENCIAIS

### 1. Instalar Dependências
```bash
npm install
```

### 2. Rodar em Modo Desenvolvimento
```bash
npm run dev
```
- O servidor será iniciado em `http://localhost:5173/`
- Hot reload ativado (atualizações automáticas)

### 3. Build para Produção
```bash
npm run build
```

### 4. Preview do Build
```bash
npm run preview
```

---

## 📁 ESTRUTURA DO PROJETO

### Arquivos Principais
```
project/
├── src/
│   ├── App.tsx                    # Roteamento principal (React Router)
│   ├── main.tsx                   # Entry point
│   ├── pages/                     # Todas as páginas
│   │   ├── Index.tsx              # 🏠 PÁGINA PRINCIPAL (rota "/")
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── ProductPage.tsx
│   │   └── ...
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Cabeçalho global
│   │   │   └── Footer.tsx         # Rodapé global
│   │   ├── home/                  # Componentes da página inicial
│   │   │   ├── HeroSection.tsx
│   │   │   ├── CategoriesSection.tsx
│   │   │   ├── FreeAgentsSection.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   └── TestimonialsSection.tsx
│   │   └── ui/                    # Componentes UI (shadcn)
│   ├── contexts/                  # Context API
│   │   ├── AuthContext.tsx        # Autenticação
│   │   └── CartContext.tsx        # Carrinho
│   ├── lib/
│   │   └── supabase.ts            # Cliente Supabase
│   └── hooks/                     # Custom hooks
├── supabase/
│   ├── migrations/                # Migrações do banco
│   └── functions/                 # Edge Functions
├── android/                       # Projeto Android (Capacitor)
└── public/                        # Assets estáticos
```

---

## 🎯 PÁGINA PRINCIPAL (Index.tsx)

A rota raiz "/" renderiza:
1. **Header** - Navegação completa
2. **HeroSection** - Banner principal
3. **CategoriesSection** - Categorias de produtos
4. **FreeAgentsSection** - Agentes gratuitos
5. **FeaturedProducts** - Produtos em destaque
6. **TestimonialsSection** - Depoimentos
7. **Footer** - Rodapé

**IMPORTANTE**: Se você está vendo apenas uma página de busca simples, você NÃO está na rota correta. Acesse a rota "/" ou "/home".

---

## 🔀 ROTAS DISPONÍVEIS

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | Index.tsx | Página principal completa |
| `/home` | Index.tsx | Mesma página principal |
| `/login` | LoginPage | Login de usuários |
| `/register` | RegisterPage | Escolha tipo de registro |
| `/register/buyer` | RegisterBuyerPage | Registro comprador |
| `/register/seller` | RegisterSellerPage | Registro vendedor |
| `/product/:id` | ProductPage | Detalhes do produto |
| `/cart` | CartPage | Carrinho de compras |
| `/checkout` | CheckoutPage | Finalizar compra |
| `/profile` | ProfilePage | Perfil do usuário |
| `/seller/dashboard` | SellerDashboard | Dashboard vendedor |
| `/agents` | AllAgentsPage | Todos os agentes |
| `/agentes-gratuitos` | FreeAgentsPage | Agentes gratuitos |
| `/add-product` | AddProductPage | Adicionar produto |
| `/about` | AboutPage | Sobre nós |
| `/help` | HelpCenterPage | Central de ajuda |
| `/privacy` | PrivacyPolicyPage | Política de privacidade |

---

## 🗄️ BANCO DE DADOS (Supabase)

### Variáveis de Ambiente (.env)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Tabelas Principais
- `profiles` - Perfis de usuários
- `products` - Produtos/agentes
- `categories` - Categorias
- `orders` - Pedidos
- `order_items` - Itens dos pedidos
- `reviews` - Avaliações

### Aplicar Migrações
```bash
# As migrações estão em supabase/migrations/
# Use o Supabase CLI ou execute via SQL Editor
```

---

## 🛠️ TECNOLOGIAS UTILIZADAS

- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **React Router** - Roteamento
- **Supabase** - Backend (Auth + Database)
- **shadcn/ui** - Componentes UI
- **Tailwind CSS** - Estilização
- **Capacitor** - Wrapper mobile (Android/iOS)

---

## 🔧 EDIÇÃO E DESENVOLVIMENTO

### Para Fazer Alterações:

1. **Modificar Componentes**
   - Navegue até o arquivo desejado em `src/`
   - Faça as alterações
   - O hot reload mostrará as mudanças automaticamente

2. **Adicionar Nova Rota**
   - Crie o componente em `src/pages/`
   - Adicione a rota em `src/App.tsx`

3. **Adicionar Novo Componente**
   - Crie em `src/components/`
   - Importe onde necessário

4. **Modificar Estilos**
   - Use classes Tailwind CSS
   - Estilos globais em `src/index.css`

### Comandos Úteis

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar erros de lint
npm run lint

# Build de desenvolvimento (mais rápido)
npm run build:dev
```

---

## ⚠️ PROBLEMAS COMUNS

### 1. "Só vejo uma página de busca simples"
**Solução**: Você não está na rota correta. Acesse `/` ou `/home`

### 2. "Erro ao importar módulo"
**Solução**: Execute `npm install` novamente

### 3. "Variáveis de ambiente não encontradas"
**Solução**: Verifique se o arquivo `.env` existe na raiz

### 4. "Erro de conexão Supabase"
**Solução**: Verifique as credenciais em `.env`

---

## 📝 NOTAS PARA AGENTES IA

### Como Analisar Este Projeto:

1. **Sempre começar** lendo `src/App.tsx` para entender as rotas
2. **Página principal** está em `src/pages/Index.tsx`
3. **Componentes reutilizáveis** estão organizados em pastas por funcionalidade
4. **Contextos** (Auth, Cart) estão em `src/contexts/`
5. **Todas as requisições ao backend** passam por Supabase

### Ao Fazer Modificações:

- Manter consistência com os padrões existentes
- Usar TypeScript (nunca `any` sem necessidade)
- Seguir estrutura de componentes do shadcn/ui
- Testar todas as rotas após alterações
- Verificar se o build funciona: `npm run build`

---

## ✅ CHECKLIST PRÉ-COMPILAÇÃO

Antes de enviar para Android Studio:
- [ ] `npm install` executado sem erros
- [ ] `npm run build` executado com sucesso
- [ ] Todas as rotas testadas
- [ ] Variáveis de ambiente configuradas
- [ ] Migrações do banco aplicadas
- [ ] Edge Functions deployadas (se necessário)

---

## 🆘 SUPORTE

Se algo não funcionar:
1. Verifique o console do navegador (F12)
2. Verifique o terminal onde o servidor está rodando
3. Confirme que está na rota correta
4. Execute `npm run build` para verificar erros de compilação

---

**Última Atualização**: 2025-10-24
**Versão do Node Recomendada**: 18.x ou superior
**Gerenciador de Pacotes**: npm
