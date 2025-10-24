# 🤖 INSTRUÇÕES PARA O GEMINI (Google AI Studio)

## 📋 COPIE E ENVIE ESTE PROMPT PARA O GEMINI

---

Olá Gemini! Este é um projeto **React + TypeScript + Vite** completo chamado **Mercado Livre-IA**.

### 🎯 ESTRUTURA DO PROJETO

Este projeto tem **documentação completa e organizada**. Aqui estão os arquivos de documentação:

1. **PROJECT-INDEX.md** ⭐ - Índice mestre (COMECE POR AQUI)
2. **GOOGLE-AI-STUDIO-SETUP.md** - Como rodar e editar no Google AI Studio
3. **AI-MAINTENANCE-GUIDE.md** - Guia completo de manutenção para agentes IA
4. **ANDROID-STUDIO-GUIDE.md** - Como compilar para Android
5. **PRE-BUILD-CHECKLIST.md** - Checklist antes de compilar

### 📁 ARQUIVOS PRINCIPAIS DO CÓDIGO

- `src/App.tsx` - Define todas as rotas da aplicação
- `src/pages/Index.tsx` - **PÁGINA PRINCIPAL** (rota "/" ou "/home")
- `src/components/layout/Header.tsx` - Cabeçalho global
- `src/components/layout/Footer.tsx` - Rodapé global
- `src/components/home/` - Componentes da página inicial
  - HeroSection.tsx
  - CategoriesSection.tsx
  - FreeAgentsSection.tsx
  - FeaturedProducts.tsx
  - TestimonialsSection.tsx

### ⚠️ IMPORTANTE: SOBRE A PÁGINA PRINCIPAL

A página principal (`src/pages/Index.tsx`) **NÃO É** apenas uma "página de busca simples".

Ela é uma página COMPLETA que inclui:
1. Header (cabeçalho com navegação)
2. HeroSection (banner principal)
3. CategoriesSection (categorias de produtos)
4. FreeAgentsSection (agentes gratuitos)
5. FeaturedProducts (produtos em destaque)
6. TestimonialsSection (depoimentos)
7. Footer (rodapé)

Se você está vendo apenas uma "página de busca", você está analisando o arquivo errado ou uma versão antiga.

### 🚀 COMO RODAR O PROJETO

```bash
# 1. Instalar dependências
npm install

# 2. Rodar servidor de desenvolvimento
npm run dev

# 3. Acessar no navegador
# http://localhost:5173/
```

### 🔧 COMANDOS PRINCIPAIS

```bash
npm install          # Instalar dependências
npm run dev         # Servidor desenvolvimento
npm run build       # Build de produção
npm run preview     # Preview do build
npm run lint        # Verificar erros
```

### 📖 PRIMEIRA AÇÃO

**Por favor, leia os seguintes arquivos NESTA ORDEM:**

1. **PROJECT-INDEX.md** - Para entender a estrutura geral
2. **GOOGLE-AI-STUDIO-SETUP.md** - Para instruções específicas de desenvolvimento
3. **src/App.tsx** - Para ver todas as rotas
4. **src/pages/Index.tsx** - Para ver a página principal completa

### ✅ VERIFICAÇÕES IMPORTANTES

Antes de fazer qualquer análise ou modificação:

- [ ] Li o arquivo PROJECT-INDEX.md completamente
- [ ] Li o arquivo GOOGLE-AI-STUDIO-SETUP.md
- [ ] Verifiquei o conteúdo de src/pages/Index.tsx
- [ ] Entendi que a rota "/" renderiza Index.tsx completo
- [ ] Vi todos os 7 componentes que Index.tsx inclui

### 🤝 COMO TRABALHAR COM ESTE PROJETO

1. **Para desenvolvimento/edição**: Use GOOGLE-AI-STUDIO-SETUP.md
2. **Para manutenção**: Use AI-MAINTENANCE-GUIDE.md
3. **Para compilar Android**: Use ANDROID-STUDIO-GUIDE.md + PRE-BUILD-CHECKLIST.md
4. **Se tiver dúvidas**: Consulte PROJECT-INDEX.md

### 🎯 TECNOLOGIAS

- React 18 + TypeScript
- Vite (build tool)
- React Router (navegação)
- Tailwind CSS (estilos)
- Supabase (backend)
- Capacitor (mobile)

### 📝 PRÓXIMOS PASSOS

1. Confirme que você leu PROJECT-INDEX.md
2. Confirme que você entende a estrutura do projeto
3. Execute `npm install` e `npm run dev`
4. Acesse http://localhost:5173/ e veja a aplicação completa
5. Me informe o que você vê e podemos prosseguir

---

**LEMBRE-SE**: Este projeto está **totalmente documentado e comentado**. Sempre consulte a documentação antes de fazer suposições sobre a estrutura ou funcionamento.
