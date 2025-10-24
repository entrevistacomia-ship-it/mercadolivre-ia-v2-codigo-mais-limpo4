# 📚 ÍNDICE MESTRE DO PROJETO - Mercado Livre-IA

## 🎯 NAVEGAÇÃO RÁPIDA PARA AGENTES IA

### Para Começar (LEIA PRIMEIRO)
1. **Para Google AI Studio / Gemini**: [GOOGLE-AI-STUDIO-SETUP.md](GOOGLE-AI-STUDIO-SETUP.md)
2. **Para Compilação Android**: [ANDROID-STUDIO-GUIDE.md](ANDROID-STUDIO-GUIDE.md)
3. **Para Manutenção/Edição**: [AI-MAINTENANCE-GUIDE.md](AI-MAINTENANCE-GUIDE.md)
4. **Antes de Compilar**: [PRE-BUILD-CHECKLIST.md](PRE-BUILD-CHECKLIST.md)

---

## 📖 DOCUMENTAÇÃO DISPONÍVEL

### 1. GOOGLE-AI-STUDIO-SETUP.md
**Use quando**: Estiver trabalhando no Google AI Studio ou Gemini
**Contém**:
- Como rodar o projeto (`npm run dev`)
- Estrutura completa de arquivos
- Todas as rotas disponíveis
- Como fazer edições
- Problemas comuns e soluções
- Comandos essenciais

**Principais Seções**:
- 🚀 Comandos Essenciais
- 📁 Estrutura do Projeto
- 🎯 Página Principal (Index.tsx)
- 🔀 Rotas Disponíveis
- 🗄️ Banco de Dados (Supabase)
- 🛠️ Edição e Desenvolvimento

### 2. ANDROID-STUDIO-GUIDE.md
**Use quando**: For compilar para Android
**Contém**:
- Pré-requisitos (Node, Android Studio, SDK)
- Processo completo de compilação
- Como gerar APK/AAB
- Como publicar na Google Play
- Problemas comuns e soluções

**Principais Seções**:
- ⚙️ Pré-requisitos
- 🚀 Processo de Compilação (6 etapas)
- 🔄 Fluxo Completo Resumido
- 📝 Atualizações Após Edições
- 🔐 Assinatura do APK
- ⚠️ Problemas Comuns

### 3. AI-MAINTENANCE-GUIDE.md
**Use quando**: For fazer manutenção, edição ou análise
**Contém**:
- Estrutura detalhada do projeto
- Mapa de navegação rápida
- Como analisar o projeto
- Tarefas comuns (adicionar página, componente, etc)
- Debugging para agentes IA
- Convenções do projeto

**Principais Seções**:
- 📁 Estrutura Completa
- 🗺️ Mapa de Navegação
- 🔍 Como Analisar Este Projeto
- 🛠️ Tarefas Comuns
- ⚠️ Regras Importantes (DO/DON'T)
- 🐛 Debugging
- 📝 Convenções

### 4. PRE-BUILD-CHECKLIST.md
**Use quando**: For preparar o projeto para compilação Android
**Contém**:
- Checklist completa de verificações
- Comandos para cada verificação
- Testes necessários
- Passo a passo final

**Principais Seções**:
- ✅ 10 Categorias de Verificação
- 🚀 Passo a Passo Final
- ⚠️ Problemas Comuns
- 📝 Notas para Agentes IA

---

## 🎬 FLUXOS DE TRABALHO RÁPIDOS

### Cenário 1: Google AI Studio - Primeira Vez
```
1. Abrir: GOOGLE-AI-STUDIO-SETUP.md
2. Executar: npm install
3. Executar: npm run dev
4. Acessar: http://localhost:5173/
5. Explorar a aplicação
```

### Cenário 2: Fazer Edições no Código
```
1. Abrir: AI-MAINTENANCE-GUIDE.md
2. Localizar arquivo a editar (use Mapa de Navegação)
3. Ler arquivo completamente
4. Fazer edições mantendo padrões
5. Testar: npm run build
6. Verificar: npm run preview
```

### Cenário 3: Adicionar Nova Funcionalidade
```
1. Abrir: AI-MAINTENANCE-GUIDE.md → "TAREFAS COMUNS"
2. Seguir guia específico:
   - Adicionar Nova Página
   - Adicionar Novo Componente
   - Trabalhar com Banco de Dados
3. Testar mudanças
4. Documentar se necessário
```

### Cenário 4: Preparar para Compilação Android
```
1. Abrir: PRE-BUILD-CHECKLIST.md
2. Executar TODAS as verificações
3. Marcar cada item concluído
4. Abrir: ANDROID-STUDIO-GUIDE.md
5. Seguir processo de compilação
```

### Cenário 5: Corrigir Bugs
```
1. Abrir: AI-MAINTENANCE-GUIDE.md → "DEBUGGING"
2. Identificar tipo de problema
3. Seguir diagnóstico específico
4. Aplicar correção
5. Testar: npm run build && npm run preview
```

---

## 📂 ESTRUTURA DE ARQUIVOS IMPORTANTES

### Arquivos de Documentação (Raiz)
```
/
├── PROJECT-INDEX.md              ← VOCÊ ESTÁ AQUI
├── GOOGLE-AI-STUDIO-SETUP.md     ← Para desenvolvimento
├── ANDROID-STUDIO-GUIDE.md       ← Para compilação
├── AI-MAINTENANCE-GUIDE.md       ← Para manutenção
├── PRE-BUILD-CHECKLIST.md        ← Antes de compilar
└── README.md                     ← Visão geral
```

### Código Fonte Principal
```
src/
├── App.tsx                       ← ⭐ ROTEAMENTO (comece aqui)
├── pages/
│   └── Index.tsx                 ← ⭐ PÁGINA PRINCIPAL (rota "/")
├── components/
│   ├── layout/
│   │   ├── Header.tsx            ← Cabeçalho global
│   │   └── Footer.tsx            ← Rodapé global
│   └── home/                     ← Componentes da página inicial
├── contexts/
│   ├── AuthContext.tsx           ← Estado de autenticação
│   └── CartContext.tsx           ← Estado do carrinho
└── lib/
    └── supabase.ts               ← Cliente Supabase
```

### Configuração
```
/
├── .env                          ← Credenciais (NÃO committar)
├── capacitor.config.ts           ← Config Capacitor
├── vite.config.ts                ← Config Vite
├── tailwind.config.ts            ← Config Tailwind
└── package.json                  ← Dependências
```

---

## 🚨 AVISOS IMPORTANTES PARA AGENTES IA

### ⚠️ PROBLEMA COMUM: "Só vejo uma página de busca simples"

**Causa**: Você NÃO está na rota correta.

**Solução**:
1. A página COMPLETA está em `src/pages/Index.tsx`
2. Ela é acessada pela rota "/" ou "/home"
3. Inclui: Header, HeroSection, CategoriesSection, FreeAgentsSection, FeaturedProducts, TestimonialsSection, Footer
4. Se não vê isso, verifique:
   - Qual rota está acessando?
   - O servidor está rodando? (`npm run dev`)
   - Os arquivos foram buildados? (`npm run build`)

**Verificação**:
```bash
# 1. Ver conteúdo de Index.tsx
cat src/pages/Index.tsx

# 2. Deve mostrar TODOS estes componentes:
# - Header
# - HeroSection
# - CategoriesSection
# - FreeAgentsSection
# - FeaturedProducts
# - TestimonialsSection
# - Footer
```

### ⚠️ ANTES DE FAZER QUALQUER MUDANÇA

1. **LEIA** o arquivo AI-MAINTENANCE-GUIDE.md
2. **ENTENDA** a estrutura em App.tsx e Index.tsx
3. **VERIFIQUE** que está editando o arquivo correto
4. **MANTENHA** os padrões existentes
5. **TESTE** após cada mudança

### ⚠️ NUNCA FAÇA

- ❌ Editar sem ler arquivos relacionados
- ❌ Quebrar funcionalidades existentes
- ❌ Commitar credenciais (.env)
- ❌ Usar `any` sem necessidade
- ❌ Ignorar erros de build

---

## 📊 COMANDOS MAIS USADOS

```bash
# DESENVOLVIMENTO
npm install              # Instalar dependências
npm run dev             # Servidor desenvolvimento
npm run build           # Build produção
npm run preview         # Preview do build

# CAPACITOR
npx cap sync android    # Sincronizar com Android
npx cap open android    # Abrir Android Studio

# LIMPEZA
rm -rf node_modules dist
npm install
npm run build

# DIAGNÓSTICO
npm run lint            # Verificar erros
ls -la src/pages/       # Listar páginas
cat src/App.tsx         # Ver rotas
```

---

## 🎯 DECISÃO RÁPIDA: QUAL DOCUMENTO USAR?

### Perguntas para Se Fazer

**"Preciso rodar o projeto no Google AI Studio?"**
→ Use: [GOOGLE-AI-STUDIO-SETUP.md](GOOGLE-AI-STUDIO-SETUP.md)

**"Preciso compilar para Android?"**
→ Use: [ANDROID-STUDIO-GUIDE.md](ANDROID-STUDIO-GUIDE.md)

**"Preciso fazer manutenção/edição?"**
→ Use: [AI-MAINTENANCE-GUIDE.md](AI-MAINTENANCE-GUIDE.md)

**"Vou compilar mas preciso preparar antes?"**
→ Use: [PRE-BUILD-CHECKLIST.md](PRE-BUILD-CHECKLIST.md)

**"Não sei por onde começar?"**
→ Use: Este arquivo (PROJECT-INDEX.md) que você está lendo agora

**"Preciso de visão geral do projeto?"**
→ Use: [README.md](README.md)

---

## 🔑 INFORMAÇÕES CRÍTICAS

### Tecnologias Principais
- **Framework**: React 18
- **Linguagem**: TypeScript
- **Build**: Vite
- **Estilo**: Tailwind CSS
- **UI**: shadcn/ui
- **Roteamento**: React Router
- **Backend**: Supabase
- **Mobile**: Capacitor

### Rotas Mais Importantes
- `/` - Página principal (Index.tsx)
- `/login` - Login
- `/cart` - Carrinho
- `/product/:id` - Detalhes do produto
- `/seller/dashboard` - Dashboard vendedor

### Contextos Globais
- **AuthContext** - Gerencia autenticação
- **CartContext** - Gerencia carrinho

### Variáveis de Ambiente
```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

---

## ✅ CHECKLIST INICIAL (TODO AGENTE IA)

Antes de começar qualquer trabalho:
- [ ] Li este arquivo (PROJECT-INDEX.md)
- [ ] Identifiquei qual documento específico preciso
- [ ] Li o documento específico completamente
- [ ] Entendi a estrutura do projeto
- [ ] Sei onde estão os arquivos principais
- [ ] Sei executar comandos básicos
- [ ] Entendi o problema que preciso resolver

---

## 🆘 PRECISA DE AJUDA?

### 1. Leia os Documentos
Tudo está documentado. Leia na ordem:
1. PROJECT-INDEX.md (este arquivo)
2. Documento específico para sua tarefa
3. AI-MAINTENANCE-GUIDE.md para detalhes

### 2. Use os Comandos de Diagnóstico
```bash
# Ver estrutura
ls -la src/

# Ver rotas
cat src/App.tsx

# Ver página principal
cat src/pages/Index.tsx

# Testar build
npm run build
```

### 3. Siga os Padrões
Veja como código similar é escrito e faça igual.

---

**Última Atualização**: 2025-10-24
**Versão**: 1.0
**Projeto**: Mercado Livre-IA (mercadoia-flex)
**Tipo**: Marketplace de Agentes de Automação
**Status**: Em Desenvolvimento Ativo

---

## 📞 CONTATOS E RECURSOS

- **Repositório**: (adicione URL quando disponível)
- **Documentação Supabase**: https://supabase.com/docs
- **Documentação React**: https://react.dev/
- **Documentação Capacitor**: https://capacitorjs.com/docs

---

**LEMBRE-SE**: Este índice é seu ponto de partida. Sempre comece aqui quando não tiver certeza de qual documento ler.
