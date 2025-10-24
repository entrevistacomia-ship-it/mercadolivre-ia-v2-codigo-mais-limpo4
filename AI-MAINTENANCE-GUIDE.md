# 🤖 GUIA DE MANUTENÇÃO PARA AGENTES IA

## 🎯 OBJETIVO DESTE DOCUMENTO

Este guia foi criado especificamente para agentes de IA (como Gemini, GPT, Claude, etc.)
que precisam realizar manutenção, edição, análise ou debugging deste projeto.

---

## 📁 ESTRUTURA COMPLETA DO PROJETO

### Visão Geral da Arquitetura
```
mercadoia-flex/
│
├── 📄 DOCUMENTAÇÃO (LEIA PRIMEIRO!)
│   ├── README.md                      # Visão geral do projeto
│   ├── GOOGLE-AI-STUDIO-SETUP.md      # Como rodar no Google AI Studio
│   ├── ANDROID-STUDIO-GUIDE.md        # Como compilar para Android
│   ├── PRE-BUILD-CHECKLIST.md         # Checklist pré-compilação
│   └── AI-MAINTENANCE-GUIDE.md        # Este arquivo
│
├── 📱 FONTE DO PROJETO (REACT/TYPESCRIPT)
│   ├── src/
│   │   ├── App.tsx                    # ⭐ ROTEAMENTO PRINCIPAL
│   │   ├── main.tsx                   # Entry point
│   │   ├── pages/                     # ⭐ TODAS AS PÁGINAS
│   │   │   ├── Index.tsx              # 🏠 PÁGINA PRINCIPAL (rota "/")
│   │   │   ├── LoginPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── layout/                # Header, Footer
│   │   │   ├── home/                  # Componentes da página inicial
│   │   │   └── ui/                    # Componentes reutilizáveis (shadcn)
│   │   ├── contexts/                  # Context API (Auth, Cart)
│   │   ├── hooks/                     # Custom hooks
│   │   └── lib/                       # Utilitários e configurações
│
├── 🗄️ BANCO DE DADOS (SUPABASE)
│   └── supabase/
│       ├── migrations/                # Migrações SQL
│       └── functions/                 # Edge Functions
│
├── 📱 ANDROID (CAPACITOR)
│   └── android/                       # Projeto Android nativo
│
└── ⚙️ CONFIGURAÇÃO
    ├── .env                           # Variáveis de ambiente
    ├── capacitor.config.ts            # Config Capacitor
    ├── vite.config.ts                 # Config Vite
    ├── tailwind.config.ts             # Config Tailwind
    └── package.json                   # Dependências
```

---

## 🗺️ MAPA DE NAVEGAÇÃO RÁPIDA

### Arquivos Mais Importantes (em ordem de prioridade)

#### 1. ROTEAMENTO E ESTRUTURA
- `src/App.tsx` - Define todas as rotas da aplicação
- `src/pages/Index.tsx` - Página principal (rota "/")
- `src/main.tsx` - Entry point, configura React e provedores

#### 2. LAYOUT GLOBAL
- `src/components/layout/Header.tsx` - Cabeçalho (logo, navegação, login, cart)
- `src/components/layout/Footer.tsx` - Rodapé (links, informações)

#### 3. PÁGINA INICIAL (Index.tsx renderiza)
- `src/components/home/HeroSection.tsx` - Banner principal
- `src/components/home/CategoriesSection.tsx` - Categorias
- `src/components/home/FreeAgentsSection.tsx` - Agentes gratuitos
- `src/components/home/FeaturedProducts.tsx` - Produtos destaque
- `src/components/home/TestimonialsSection.tsx` - Depoimentos

#### 4. PÁGINAS DE FUNCIONALIDADES
- `src/pages/ProductPage.tsx` - Detalhes do produto
- `src/pages/CartPage.tsx` - Carrinho de compras
- `src/pages/CheckoutPage.tsx` - Finalizar compra
- `src/pages/LoginPage.tsx` - Login
- `src/pages/RegisterPage.tsx` - Registro

#### 5. CONTEXTOS (ESTADO GLOBAL)
- `src/contexts/AuthContext.tsx` - Autenticação (login, logout, user)
- `src/contexts/CartContext.tsx` - Carrinho (adicionar, remover, calcular)

#### 6. CONFIGURAÇÕES
- `.env` - Credenciais Supabase
- `capacitor.config.ts` - Config do Capacitor
- `package.json` - Dependências e scripts

---

## 🔍 COMO ANALISAR ESTE PROJETO

### Passo 1: Entender o Roteamento
```typescript
// Sempre comece lendo src/App.tsx
// Ele mostra todas as rotas disponíveis:
<Route path="/" element={<Index />} />           // Página principal
<Route path="/login" element={<LoginPage />} />  // Login
<Route path="/cart" element={<CartPage />} />    // Carrinho
// ... e todas as outras rotas
```

### Passo 2: Identificar a Página Atual
```
Se a rota é "/" ou "/home":
  → Renderiza: src/pages/Index.tsx
  → Que inclui: Header, HeroSection, CategoriesSection, FreeAgentsSection,
                FeaturedProducts, TestimonialsSection, Footer

Se a rota é "/product/:id":
  → Renderiza: src/pages/ProductPage.tsx
  → Usa parâmetro :id para buscar produto específico

Se a rota é "/cart":
  → Renderiza: src/pages/CartPage.tsx
  → Usa CartContext para gerenciar itens
```

### Passo 3: Seguir o Fluxo de Dados
```
Usuário → Página → Componente → Context/Hook → Supabase → Banco de Dados

Exemplo de fluxo de login:
1. Usuário acessa /login
2. Renderiza LoginPage.tsx
3. Usuário preenche formulário
4. LoginPage chama AuthContext.signIn()
5. AuthContext usa Supabase Auth
6. Supabase valida credenciais
7. Se válido, usuário é autenticado
8. Redirecionamento para página inicial
```

---

## 🛠️ TAREFAS COMUNS E COMO EXECUTÁ-LAS

### 1. ADICIONAR NOVA PÁGINA

```typescript
// 1. Criar arquivo em src/pages/MinhaNovaPage.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const MinhaNovaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8">
        <h1>Minha Nova Página</h1>
      </main>
      <Footer />
    </div>
  );
};

export default MinhaNovaPage;

// 2. Adicionar rota em src/App.tsx
import MinhaNovaPage from "./pages/MinhaNovaPage";

// Dentro de <Routes>, ANTES do path="*":
<Route path="/minha-rota" element={<MinhaNovaPage />} />
```

### 2. MODIFICAR COMPONENTE EXISTENTE

```typescript
// 1. Localizar o componente
//    Ex: src/components/home/HeroSection.tsx

// 2. Ler o arquivo completamente

// 3. Entender a estrutura:
//    - Props que recebe
//    - Estado que gerencia
//    - Contextos que usa
//    - Componentes que renderiza

// 4. Fazer alteração mantendo padrões existentes

// 5. Testar com npm run dev
```

### 3. ADICIONAR NOVO COMPONENTE

```typescript
// 1. Decidir localização:
//    - Layout global? → src/components/layout/
//    - Específico de uma página? → src/components/[nome-da-pagina]/
//    - Reutilizável geral? → src/components/ui/

// 2. Criar arquivo com nome descritivo
//    Ex: src/components/ui/MyComponent.tsx

// 3. Seguir padrões existentes:
//    - Use TypeScript (tipos explícitos)
//    - Use Tailwind para estilos
//    - Documente com comentários
//    - Export default no final

// 4. Importar onde necessário
```

### 4. CORRIGIR BUGS

```typescript
// 1. Identificar o erro:
//    - Console do navegador (F12)
//    - Terminal onde npm run dev está rodando
//    - Mensagens de build

// 2. Localizar arquivo responsável:
//    - Use stack trace
//    - Verifique imports
//    - Procure por nome de função/componente

// 3. Corrigir mantendo consistência

// 4. Testar:
npm run build  // Verifica se compila
npm run preview  // Testa build localmente
```

### 5. ATUALIZAR ESTILOS

```typescript
// Este projeto usa Tailwind CSS
// Estilos são classes inline

// Exemplo:
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Conteúdo
</div>

// Classes comuns:
// - Layout: flex, grid, container
// - Espaçamento: p-4, m-2, gap-4
// - Cores: bg-blue-500, text-white
// - Responsivo: md:flex, lg:grid-cols-3
// - Efeitos: hover:bg-blue-600, transition

// Estilos globais em: src/index.css
```

### 6. TRABALHAR COM BANCO DE DADOS

```typescript
// 1. Ver tabelas em: supabase/migrations/

// 2. Cliente Supabase: src/lib/supabase.ts

// 3. Exemplo de consulta:
import { supabase } from "@/lib/supabase";

const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('status', 'active');

// 4. Sempre tratar erros:
if (error) {
  console.error('Erro:', error);
  return;
}

// 5. Usar React Query para cache:
import { useQuery } from '@tanstack/react-query';
```

---

## ⚠️ REGRAS IMPORTANTES

### DO ✅

1. **SEMPRE ler arquivos antes de editar**
   - Entenda o contexto completo
   - Veja padrões existentes
   - Identifique dependências

2. **MANTER consistência**
   - Use mesmo estilo de código
   - Siga convenções de nomenclatura
   - Use mesmas bibliotecas

3. **COMENTAR alterações complexas**
   - Explique o "porquê", não só o "o quê"
   - Use comentários em português
   - Seja claro e conciso

4. **TESTAR após mudanças**
   ```bash
   npm run build  # Verifica compilação
   npm run preview  # Testa funcionamento
   ```

5. **DOCUMENTAR mudanças significativas**
   - Atualize documentação relevante
   - Adicione comentários no código
   - Liste breaking changes

### DON'T ❌

1. **NUNCA quebrar funcionalidades existentes**
   - Teste antes e depois
   - Verifique impacto em outros componentes

2. **NUNCA commitar credenciais**
   - .env não vai para o Git
   - Senhas nunca hard-coded

3. **NUNCA usar `any` em TypeScript sem motivo**
   - Sempre defina tipos apropriados
   - Use interfaces para objetos complexos

4. **NUNCA ignorar erros de build**
   - Resolva todos os erros
   - Entenda avisos importantes

5. **NUNCA fazer changes massivos sem plano**
   - Faça mudanças incrementais
   - Teste cada mudança

---

## 🐛 DEBUGGING PARA AGENTES IA

### Problema: "Não consigo ver a página principal"

**Diagnóstico:**
```typescript
// 1. Verificar qual rota está ativa
// A rota "/" renderiza src/pages/Index.tsx

// 2. Index.tsx deve incluir TODOS estes componentes:
<Header />
<HeroSection />
<CategoriesSection />
<FreeAgentsSection />
<FeaturedProducts />
<TestimonialsSection />
<Footer />

// 3. Se você vê apenas "busca simples", você NÃO está em Index.tsx
// Verifique a URL e o roteamento em App.tsx
```

### Problema: "Erro de import"

**Diagnóstico:**
```bash
# 1. Verificar se arquivo existe
ls -la src/components/...

# 2. Verificar se path alias "@" está configurado
# Veja tsconfig.json: "@/*" deve mapear para "./src/*"

# 3. Reinstalar dependências
npm install
```

### Problema: "Componente não renderiza"

**Diagnóstico:**
```typescript
// 1. Verificar console do navegador (erros JS)
// 2. Verificar se componente é exportado corretamente
export default MeuComponente;  // ✅
export MeuComponente;  // ❌ (precisa import { })

// 3. Verificar se props estão corretas
// 4. Verificar se há erros de TypeScript
```

### Problema: "Estilos não aplicam"

**Diagnóstico:**
```typescript
// 1. Verificar sintaxe Tailwind
className="flex gap-4"  // ✅
className="display: flex;"  // ❌

// 2. Verificar conflitos de classes
// Última classe tem prioridade

// 3. Verificar se Tailwind está configurado
// Veja tailwind.config.ts
```

---

## 📚 RECURSOS E REFERÊNCIAS

### Documentação das Tecnologias

- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Vite**: https://vitejs.dev/
- **React Router**: https://reactrouter.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Supabase**: https://supabase.com/docs
- **Capacitor**: https://capacitorjs.com/docs
- **shadcn/ui**: https://ui.shadcn.com/

### Comandos Úteis

```bash
# Desenvolvimento
npm run dev                 # Inicia servidor dev
npm run build              # Build de produção
npm run preview            # Preview do build
npm run lint               # Verifica erros de lint

# Capacitor
npx cap sync android       # Sincroniza com Android
npx cap open android       # Abre Android Studio

# Limpeza
rm -rf node_modules dist   # Limpa completamente
npm install                # Reinstala tudo
```

---

## 🎓 FLUXOS DE TRABALHO RECOMENDADOS

### Para Análise/Revisão de Código

1. Ler README.md e este arquivo (AI-MAINTENANCE-GUIDE.md)
2. Examinar src/App.tsx para entender rotas
3. Examinar src/pages/Index.tsx para entender página principal
4. Seguir imports para componentes específicos
5. Verificar contexts para estado global
6. Revisar migrações para schema do banco

### Para Adicionar Funcionalidade

1. Planejar: Que páginas/componentes preciso?
2. Verificar: Já existe algo similar?
3. Criar: Novos arquivos seguindo estrutura
4. Integrar: Adicionar rotas, imports, etc
5. Testar: npm run build && npm run preview
6. Documentar: Comentários e updates em docs

### Para Corrigir Bugs

1. Reproduzir: Entender exatamente o problema
2. Localizar: Encontrar arquivo responsável
3. Diagnosticar: Identificar causa raiz
4. Corrigir: Implementar solução
5. Testar: Verificar se corrigiu e não quebrou nada
6. Documentar: Explicar a correção

### Para Refatorar

1. Identificar: O que precisa melhorar?
2. Planejar: Como fazer sem quebrar?
3. Isolar: Trabalhe em partes pequenas
4. Refatorar: Uma mudança por vez
5. Testar: Após cada mudança
6. Documentar: Explicar mudanças

---

## 📝 CONVENÇÕES DO PROJETO

### Nomenclatura

- **Componentes**: PascalCase (ex: `ProductCard.tsx`)
- **Funções**: camelCase (ex: `calculateTotal()`)
- **Constantes**: UPPER_CASE (ex: `API_URL`)
- **Arquivos**: PascalCase para componentes, camelCase para utils

### Organização de Imports

```typescript
// 1. React e bibliotecas externas
import React from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Componentes UI
import { Button } from '@/components/ui/button';

// 3. Componentes do projeto
import Header from '@/components/layout/Header';

// 4. Hooks e utils
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

// 5. Tipos
import type { Product } from '@/types';
```

### Estrutura de Componente

```typescript
/**
 * Documentação do componente
 */

// Imports

// Types/Interfaces
interface Props {
  // ...
}

// Componente
const MeuComponente = ({ props }: Props) => {
  // 1. Hooks
  const [state, setState] = useState();

  // 2. Efeitos
  useEffect(() => {}, []);

  // 3. Funções auxiliares
  const handleClick = () => {};

  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MeuComponente;
```

---

## ✅ CHECKLIST PARA AGENTES IA

Antes de declarar uma tarefa como completa:

- [ ] Li e entendi o código existente
- [ ] Mantive consistência com padrões do projeto
- [ ] Adicionei comentários explicativos quando necessário
- [ ] Testei as mudanças (npm run build)
- [ ] Verifiquei que não quebrei funcionalidades existentes
- [ ] Atualizei documentação se necessário
- [ ] Removi console.logs de debug
- [ ] Validei tipos TypeScript
- [ ] Segui convenções de nomenclatura
- [ ] Código está limpo e organizado

---

**Última Atualização**: 2025-10-24
**Versão**: 1.0
**Mantido por**: Sistema de Documentação Automatizada

---

## 🆘 PRECISA DE AJUDA?

Se você é um agente IA e encontrou algo não documentado ou confuso:

1. Leia TODOS os documentos na raiz do projeto
2. Examine o código fonte com atenção
3. Procure por padrões similares no projeto
4. Use os comandos de diagnóstico mencionados
5. Documente o que você descobriu para futuros agentes

**Lembre-se**: Este projeto está bem estruturado e documentado.
Se algo parece confuso, provavelmente você precisa entender melhor o contexto.
Leia os arquivos relacionados antes de fazer mudanças.
