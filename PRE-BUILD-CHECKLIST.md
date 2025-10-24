# ✅ CHECKLIST PRÉ-COMPILAÇÃO ANDROID

## 📋 INSTRUÇÕES PARA PREPARAÇÃO

Execute esta checklist ANTES de enviar o projeto para o Android Studio.
Cada item deve ser verificado para garantir uma compilação bem-sucedida.

---

## 🔍 VERIFICAÇÕES OBRIGATÓRIAS

### 1. AMBIENTE DE DESENVOLVIMENTO

#### Node.js e npm
```bash
node --version
# Deve ser v18.x ou superior
```
- [ ] Node.js 18.x ou superior instalado
- [ ] npm atualizado

#### Dependências do Projeto
```bash
npm install
```
- [ ] Todas as dependências instaladas sem erros
- [ ] Nenhum aviso crítico de vulnerabilidade
- [ ] package-lock.json atualizado

---

### 2. VARIÁVEIS DE AMBIENTE

#### Arquivo .env
Verifique se o arquivo `.env` existe na raiz do projeto:

```bash
ls -la .env
```

**Conteúdo esperado:**
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

- [ ] Arquivo .env existe
- [ ] VITE_SUPABASE_URL configurada
- [ ] VITE_SUPABASE_ANON_KEY configurada
- [ ] URLs sem espaços ou caracteres especiais
- [ ] Credenciais válidas e testadas

**Como testar:**
```bash
npm run dev
# Acesse http://localhost:5173 e verifique se o app carrega
```

---

### 3. BUILD DO PROJETO WEB

#### Build de Produção
```bash
npm run build
```

**Verificações:**
- [ ] Build completa sem erros
- [ ] Pasta `dist/` criada
- [ ] Arquivos presentes em `dist/`:
  - [ ] index.html
  - [ ] assets/index-*.js
  - [ ] assets/index-*.css

#### Preview do Build
```bash
npm run preview
```
- [ ] Preview inicia sem erros
- [ ] Site acessível em http://localhost:4173
- [ ] Todas as páginas carregam corretamente
- [ ] Navegação entre rotas funciona
- [ ] Não há erros no console do navegador

#### Teste de Rotas Principais
Acesse e verifique cada rota:
- [ ] `/` - Página principal carrega completamente
- [ ] `/login` - Página de login acessível
- [ ] `/register` - Página de registro acessível
- [ ] `/cart` - Página do carrinho acessível
- [ ] `/agents` - Lista de agentes carrega

---

### 4. BANCO DE DADOS SUPABASE

#### Conexão
```bash
# Teste a conexão acessando qualquer página que use o banco
npm run dev
# Acesse http://localhost:5173/agents
```

- [ ] Conexão com Supabase estabelecida
- [ ] Sem erros de autenticação no console
- [ ] Dados carregam corretamente

#### Tabelas Necessárias
Verifique no Supabase Dashboard se existem:
- [ ] `profiles`
- [ ] `products`
- [ ] `categories`
- [ ] `orders`
- [ ] `order_items`
- [ ] `reviews`

#### Migrações
- [ ] Todas as migrações em `supabase/migrations/` aplicadas
- [ ] RLS (Row Level Security) habilitado nas tabelas
- [ ] Políticas de acesso configuradas

---

### 5. CAPACITOR

#### Configuração
```bash
cat capacitor.config.ts
```

**Verificar:**
- [ ] `appId`: `com.mercadoia.flex`
- [ ] `appName`: `Mercado Livre-IA`
- [ ] `webDir`: `dist`
- [ ] `androidScheme`: `https`

#### Sincronização
```bash
npx cap sync android
```

**Verificações:**
- [ ] Comando executa sem erros
- [ ] Mensagem "Copying web assets..." aparece
- [ ] Mensagem "Updating Android plugins" aparece
- [ ] Arquivos copiados para `android/app/src/main/assets/public/`

#### Verificar Assets Copiados
```bash
ls -la android/app/src/main/assets/public/
```
- [ ] Pasta `public/` existe
- [ ] Contém `index.html`
- [ ] Contém pasta `assets/` com JS e CSS

---

### 6. PROJETO ANDROID

#### Estrutura de Pastas
```bash
ls -la android/
```

Verificar existência de:
- [ ] `android/app/`
- [ ] `android/gradle/`
- [ ] `android/build.gradle`
- [ ] `android/settings.gradle`
- [ ] `android/gradlew`

#### Permissões do gradlew (Linux/Mac)
```bash
chmod +x android/gradlew
```
- [ ] gradlew tem permissão de execução

#### Configurações Android
Verificar `android/app/build.gradle`:
- [ ] `applicationId "com.mercadoia.flex"`
- [ ] `minSdkVersion 22`
- [ ] `targetSdkVersion 34`
- [ ] `versionCode` atualizado
- [ ] `versionName` atualizado

---

### 7. LIMPEZA E OTIMIZAÇÃO

#### Remover Arquivos Temporários
```bash
# Limpar node_modules se necessário
rm -rf node_modules package-lock.json
npm install

# Limpar builds anteriores
rm -rf dist
npm run build
```

- [ ] Sem arquivos desnecessários
- [ ] Cache limpo
- [ ] Build fresh executado

#### Verificar .gitignore
- [ ] `node_modules/` ignorado
- [ ] `dist/` ignorado
- [ ] `.env` ignorado
- [ ] `android/build/` ignorado

---

### 8. TESTES FINAIS

#### Teste Local Completo
```bash
# 1. Reinstalar dependências
npm install

# 2. Build
npm run build

# 3. Preview
npm run preview
```

- [ ] Aplicação funciona perfeitamente no preview
- [ ] Sem erros no console
- [ ] Todas as funcionalidades testadas

#### Teste de Capacitor
```bash
npx cap sync android
npx cap open android
```

- [ ] Android Studio abre sem erros
- [ ] Gradle Sync completa automaticamente
- [ ] Sem erros no painel "Build" do Android Studio

---

### 9. DOCUMENTAÇÃO

- [ ] README.md atualizado
- [ ] GOOGLE-AI-STUDIO-SETUP.md revisado
- [ ] ANDROID-STUDIO-GUIDE.md revisado
- [ ] Comentários no código atualizados

---

### 10. SEGURANÇA

- [ ] Credenciais não commitadas no Git
- [ ] .env não está no repositório
- [ ] Senhas não hard-coded no código
- [ ] API keys protegidas

---

## 🚀 PASSO A PASSO FINAL

Execute estes comandos em sequência:

```bash
# 1. Limpar e preparar
rm -rf node_modules dist
npm install

# 2. Build de produção
npm run build

# 3. Verificar build
npm run preview
# Teste manualmente no navegador

# 4. Sincronizar com Android
npx cap sync android

# 5. Abrir Android Studio
npx cap open android

# 6. No Android Studio:
#    - Aguarde Gradle Sync
#    - Build > Build APK(s)
#    - Ou Run > Run 'app'
```

---

## ⚠️ PROBLEMAS COMUNS E SOLUÇÕES

### "Build failed"
```bash
rm -rf node_modules dist
npm install
npm run build
```

### "Sync failed"
```bash
npx cap sync android --force
```

### "Android Studio não abre"
Verifique:
1. Android Studio está instalado
2. JAVA_HOME configurado
3. Android SDK instalado

### "App em branco após instalação"
```bash
npm run build
npx cap sync android
# Recompile no Android Studio
```

---

## 📝 NOTAS IMPORTANTES

### Para Agentes IA:
- **Execute TODAS as verificações** antes de declarar "pronto para compilação"
- **Não pule etapas** - cada uma é crucial
- **Documente problemas** encontrados durante a checklist
- **Resolva todos os erros** antes de prosseguir

### Para Desenvolvedores:
- Esta checklist economiza horas de debugging
- Sempre execute após mudanças significativas
- Mantenha esta lista atualizada
- Adicione novos itens conforme necessário

---

## ✅ CHECKLIST COMPLETA

Todos os itens acima estão marcados?
- [ ] SIM - Pronto para compilação no Android Studio
- [ ] NÃO - Revisar e completar itens pendentes

---

**Última Atualização**: 2025-10-24
**Versão**: 1.0
**Mantido por**: Sistema de Documentação Automatizada
