# MercadoIA Flex - Marketplace de Agentes de IA

Plataforma de marketplace para compra e venda de agentes de IA, com integração Supabase e sistema de autenticação completo.

---

## 📚 DOCUMENTAÇÃO COMPLETA

Este projeto possui documentação detalhada para diferentes casos de uso:

- **[📖 PROJECT-INDEX.md](PROJECT-INDEX.md)** - **COMECE AQUI** - Índice mestre com navegação rápida
- **[🤖 GOOGLE-AI-STUDIO-SETUP.md](GOOGLE-AI-STUDIO-SETUP.md)** - Para desenvolvimento com Google AI Studio/Gemini
- **[📱 ANDROID-STUDIO-GUIDE.md](ANDROID-STUDIO-GUIDE.md)** - Para compilação Android
- **[🔧 AI-MAINTENANCE-GUIDE.md](AI-MAINTENANCE-GUIDE.md)** - Para manutenção e edição por agentes IA
- **[✅ PRE-BUILD-CHECKLIST.md](PRE-BUILD-CHECKLIST.md)** - Checklist pré-compilação Android

**IMPORTANTE PARA AGENTES IA**: Sempre comece lendo o [PROJECT-INDEX.md](PROJECT-INDEX.md) para entender a estrutura completa do projeto e qual documentação específica você precisa.

---

## Requisitos

- Node.js 18+ (recomendado: instalar com [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm ou yarn
- Conta no Supabase (para configuração do banco de dados)
- **Para mobile**: Android Studio (Android) ou Xcode (iOS)

## Configuração Inicial (Web)

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

O arquivo `.env` já existe no projeto. Verifique se as credenciais do Supabase estão corretas:

```env
VITE_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANTE**: O projeto já está configurado para usar as variáveis de ambiente do `.env` automaticamente. Não há necessidade de editar outros arquivos.

### 4. Configure o Banco de Dados Supabase

#### a) Acesse seu projeto no Supabase

1. Vá para [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecione ou crie um projeto
3. Copie a URL e a Anon Key do projeto (Settings > API)
4. Atualize o arquivo `.env` com essas credenciais

#### b) Execute as Migrações

O projeto possui migrações SQL em `supabase/migrations/`. Execute-as no SQL Editor do Supabase:

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

#### c) Configure o Auth

No painel do Supabase, vá para Authentication > Settings:
- Email confirmations: **desabilitado** (para testes)
- Site URL: `http://localhost:8080` (para desenvolvimento web)

### 5. Execute o Projeto Web

```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:8080`

### 6. Build do Projeto Web

Para criar a versão de produção:

```bash
npm run build
```

Para preview da versão de produção:

```bash
npm run preview
```

---

## Configuração para Android/iOS (Capacitor)

### Pré-requisitos Mobile

#### Para Android:
- Android Studio instalado
- SDK Android 33 ou superior
- Java JDK 17

#### Para iOS:
- Xcode instalado (apenas macOS)
- CocoaPods instalado: `sudo gem install cocoapods`

### Passos para Compilar o App Mobile

#### 1. Build do Projeto Web

Primeiro, compile a versão web do projeto:

```bash
npm run build
```

**IMPORTANTE**: Sempre execute `npm run build` antes de sincronizar com o Capacitor. Sem o build, o app mobile ficará vazio ou redirecionará para páginas externas incorretas.

#### 2. Sincronize com Capacitor

Após o build, sincronize os arquivos com as plataformas mobile:

```bash
npx cap sync
```

Este comando:
- Copia os arquivos do `dist/` para as pastas `android/` e `ios/`
- Atualiza os plugins do Capacitor
- Prepara o projeto para ser aberto nas IDEs nativas

#### 3. Abra no Android Studio

```bash
npx cap open android
```

Ou manualmente: abra a pasta `android/` no Android Studio.

#### 4. Configure o Projeto Android

No Android Studio:

1. Aguarde o Gradle sincronizar (primeira vez pode demorar)
2. Verifique o `android/app/build.gradle`:
   - `applicationId`: deve estar configurado (ex: `com.mercadoia.flex`)
   - `minSdk`: 22 ou superior
   - `targetSdk`: 33 ou superior

3. Verifique o `android/app/src/main/AndroidManifest.xml`:
   - Certifique-se de que não há redirecionamentos para URLs externas
   - O `android:name` da MainActivity deve estar correto

#### 5. Execute ou Gere o APK

**Para testar em dispositivo/emulador:**

1. Conecte um dispositivo Android via USB (com depuração USB ativada) ou inicie um emulador
2. Clique em "Run" (ou pressione Shift+F10) no Android Studio

**Para gerar APK de produção:**

1. No Android Studio, vá em: `Build > Build Bundle(s) / APK(s) > Build APK(s)`
2. O APK será gerado em: `android/app/build/outputs/apk/debug/app-debug.apk`

**Para gerar APK assinado (release):**

1. Vá em: `Build > Generate Signed Bundle / APK`
2. Siga o wizard para criar/usar uma keystore
3. O APK será gerado em: `android/app/build/outputs/apk/release/app-release.apk`

#### 6. Para iOS (apenas macOS)

```bash
npx cap open ios
```

No Xcode:

1. Aguarde as dependências serem instaladas
2. Configure o Team de desenvolvimento (Xcode > Preferences > Accounts)
3. Configure o Bundle Identifier único
4. Conecte um dispositivo iOS ou use o simulador
5. Clique em "Run" para compilar e executar

---

## Fluxo Completo de Atualização Mobile

Sempre que fizer alterações no código:

```bash
# 1. Build da aplicação web
npm run build

# 2. Sincronizar com Capacitor
npx cap sync

# 3. Abrir no Android Studio ou Xcode
npx cap open android
# ou
npx cap open ios
```

---

## Estrutura do Projeto

```
/
├── src/                 # Código fonte React
│   ├── components/      # Componentes React
│   ├── contexts/        # Contextos (Auth, Cart)
│   ├── hooks/           # Hooks customizados
│   ├── lib/             # Utilitários e Supabase
│   └── pages/           # Páginas da aplicação
├── android/             # Projeto Android (Capacitor)
├── ios/                 # Projeto iOS (Capacitor)
├── supabase/            # Migrações e Edge Functions
├── dist/                # Build da aplicação web (gerado)
└── public/              # Arquivos estáticos
```

## Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Roteamento**: React Router v6
- **Estado**: React Context API + React Query
- **Backend**: Supabase (Auth, Database, Storage)
- **Mobile**: Capacitor 7

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

---

## Troubleshooting

### Problema: "Invalid API key" ou erros de Supabase

**Causa**: Credenciais do Supabase incorretas

**Solução**:
1. Verifique o arquivo `.env` na raiz do projeto
2. Confirme que VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão corretas
3. Execute `npm run build` novamente
4. Execute `npx cap sync` para atualizar o mobile

### Problema: "Table does not exist"

**Causa**: Migrações não executadas no banco de dados

**Solução**:
1. Acesse o SQL Editor no Supabase Dashboard
2. Execute os scripts em `supabase/migrations/`
3. Verifique em Database > Tables se as tabelas foram criadas

### Problema: App mobile abre tela em branco ou URL externa

**Causa**: Build web não foi executado ou sincronização incorreta

**Solução**:
1. Execute `npm run build` (OBRIGATÓRIO)
2. Execute `npx cap sync`
3. Limpe o projeto no Android Studio: `Build > Clean Project`
4. Recompile: `Build > Rebuild Project`

### Problema: Gradle sync failed

**Causa**: Configuração do Android ou dependências

**Solução**:
1. Verifique se o Android SDK está instalado
2. No Android Studio: `File > Invalidate Caches / Restart`
3. Execute no terminal dentro de `android/`: `./gradlew clean`

### Problema: Erro de assinatura no iOS

**Causa**: Certificado de desenvolvedor não configurado

**Solução**:
1. No Xcode, vá em: Signing & Capabilities
2. Selecione seu Team de desenvolvimento
3. Configure um Bundle Identifier único

---

## Deploy

### Web (Vercel/Netlify)

1. Faça o build do projeto: `npm run build`
2. Configure as variáveis de ambiente no painel da plataforma
3. Faça deploy da pasta `dist/`

### Android (Google Play Store)

1. Gere um APK/Bundle assinado no Android Studio
2. Siga o processo de publicação da Google Play Console
3. [Guia oficial do Google](https://support.google.com/googleplay/android-developer/answer/9859152)

### iOS (Apple App Store)

1. Archive o app no Xcode
2. Upload via App Store Connect
3. [Guia oficial da Apple](https://developer.apple.com/app-store/submitting/)

---

## Suporte

- Documentação Supabase: [https://supabase.com/docs](https://supabase.com/docs)
- Documentação Capacitor: [https://capacitorjs.com/docs](https://capacitorjs.com/docs)
- Documentação Vite: [https://vitejs.dev](https://vitejs.dev)

## Licença

Este projeto é privado e de uso restrito.
