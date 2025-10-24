# 📱 GUIA DE COMPILAÇÃO - Android Studio

## 🎯 OBJETIVO
Este guia orienta a compilação do projeto React para Android usando Capacitor.

---

## ⚙️ PRÉ-REQUISITOS

### Software Necessário
- ✅ **Node.js** 18.x ou superior
- ✅ **npm** (vem com Node.js)
- ✅ **Android Studio** (versão mais recente)
- ✅ **JDK** 17 ou superior
- ✅ **Android SDK** (instalado via Android Studio)

### Verificar Instalações
```bash
node --version    # Deve mostrar v18.x ou superior
npm --version     # Deve mostrar 9.x ou superior
java --version    # Deve mostrar JDK 17 ou superior
```

---

## 🚀 PROCESSO DE COMPILAÇÃO

### ETAPA 1: Preparação do Projeto Web

#### 1.1. Instalar Dependências
```bash
cd /caminho/do/projeto
npm install
```

#### 1.2. Build de Produção
```bash
npm run build
```
- ✅ Deve completar sem erros
- ✅ Cria pasta `dist/` com arquivos otimizados
- ⚠️ Se houver erros, corrija antes de prosseguir

#### 1.3. Verificar Build
```bash
npm run preview
```
- Testa o build localmente
- Acesse `http://localhost:4173/`
- Verifique se todas as páginas funcionam

---

### ETAPA 2: Sincronizar com Capacitor

#### 2.1. Copiar Arquivos Web para Android
```bash
npx cap sync android
```
**O que este comando faz:**
- Copia arquivos de `dist/` para `android/app/src/main/assets/public/`
- Atualiza plugins Capacitor
- Sincroniza configurações

#### 2.2. Verificar Sincronização
```bash
npx cap sync
```
- Execute novamente para garantir

---

### ETAPA 3: Abrir no Android Studio

#### 3.1. Abrir Projeto Android
```bash
npx cap open android
```
**OU** manualmente:
- Abra Android Studio
- File → Open
- Navegue até `projeto/android/`
- Clique em "OK"

#### 3.2. Aguardar Gradle Sync
- Android Studio fará o Gradle Sync automaticamente
- Aguarde até completar (pode levar alguns minutos na primeira vez)
- Verifique se não há erros no painel "Build"

---

### ETAPA 4: Configurar Android Studio

#### 4.1. Verificar SDK
- Tools → SDK Manager
- **Android SDK Platform 34** ou superior instalado
- **Android SDK Build-Tools 34.0.0** ou superior

#### 4.2. Verificar Gradle
- O projeto usa Gradle 8.11.1
- Arquivo: `android/gradle/wrapper/gradle-wrapper.properties`

#### 4.3. Configurar Emulador (Opcional)
- Tools → Device Manager
- Create Device
- Selecione um dispositivo (ex: Pixel 5)
- Selecione system image (API 34 recomendado)

---

### ETAPA 5: Compilar APK

#### 5.1. Build Debug APK
**Via Android Studio:**
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Aguarde a compilação
3. APK estará em: `android/app/build/outputs/apk/debug/`

**Via Linha de Comando:**
```bash
cd android
./gradlew assembleDebug
```

#### 5.2. Build Release APK (Produção)
```bash
cd android
./gradlew assembleRelease
```
⚠️ **Importante**: Para release, você precisa configurar a assinatura (keystore)

---

### ETAPA 6: Instalar e Testar

#### 6.1. Instalar em Emulador
1. Inicie o emulador no Android Studio
2. Run → Run 'app'
3. Ou clique no botão ▶️ verde

#### 6.2. Instalar em Dispositivo Físico
```bash
# Habilite "Depuração USB" no dispositivo Android
# Conecte via USB
adb devices  # Verifica se o dispositivo está conectado
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔄 FLUXO COMPLETO RESUMIDO

```bash
# 1. Preparar projeto web
npm install
npm run build

# 2. Sincronizar com Capacitor
npx cap sync android

# 3. Abrir Android Studio
npx cap open android

# 4. No Android Studio:
#    - Build → Build APK(s)
#    - Ou Run → Run 'app'
```

---

## 📝 ATUALIZAÇÕES APÓS EDIÇÕES

### Quando Modificar Código React/TypeScript:

```bash
# 1. Rebuild do projeto web
npm run build

# 2. Sincronizar novamente
npx cap sync android

# 3. Recompilar no Android Studio
# (Android Studio detectará mudanças automaticamente)
```

### Quando Modificar Código Android Nativo:
- Não precisa rebuildar o web
- Apenas recompile no Android Studio

---

## 🛠️ CONFIGURAÇÕES IMPORTANTES

### capacitor.config.ts
```typescript
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.mercadoia.flex',
  appName: 'Mercado Livre-IA',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

### android/app/build.gradle
- **minSdkVersion**: 22
- **targetSdkVersion**: 34
- **compileSdkVersion**: 34

---

## ⚠️ PROBLEMAS COMUNS E SOLUÇÕES

### Erro: "Build failed with an exception"
**Solução:**
```bash
cd android
./gradlew clean
./gradlew build
```

### Erro: "SDK location not found"
**Solução:**
1. Crie arquivo `android/local.properties`
2. Adicione: `sdk.dir=/caminho/para/Android/Sdk`
3. No Windows: `sdk.dir=C:\\Users\\SeuUsuario\\AppData\\Local\\Android\\Sdk`

### Erro: "Execution failed for task ':app:processDebugResources'"
**Solução:**
```bash
npx cap sync android
```

### App em branco após instalar
**Solução:**
1. Verifique se `npm run build` foi executado
2. Execute `npx cap sync android` novamente
3. Verifique arquivo `android/app/src/main/assets/capacitor.config.json`

### Erro de permissões (Linux/Mac)
```bash
chmod +x android/gradlew
```

---

## 🔐 ASSINATURA DO APK (Produção)

### Criar Keystore
```bash
keytool -genkey -v -keystore mercadoia-release.keystore -alias mercadoia -keyalg RSA -keysize 2048 -validity 10000
```

### Configurar em android/app/build.gradle
```gradle
android {
    signingConfigs {
        release {
            storeFile file('../../mercadoia-release.keystore')
            storePassword 'sua-senha'
            keyAlias 'mercadoia'
            keyPassword 'sua-senha'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### Gerar APK Assinado
```bash
cd android
./gradlew assembleRelease
```
APK estará em: `android/app/build/outputs/apk/release/app-release.apk`

---

## 📊 TAMANHOS ESPERADOS

- **APK Debug**: ~15-25 MB
- **APK Release**: ~10-15 MB (otimizado)
- **AAB (Bundle)**: ~8-12 MB

---

## 🚀 PUBLICAR NA GOOGLE PLAY

### 1. Gerar AAB (Android App Bundle)
```bash
cd android
./gradlew bundleRelease
```
AAB em: `android/app/build/outputs/bundle/release/app-release.aab`

### 2. Fazer Upload
- Acesse: https://play.google.com/console
- Create App
- Upload do AAB
- Preencha informações da loja
- Submeta para revisão

---

## 📋 CHECKLIST PRÉ-COMPILAÇÃO

Antes de compilar para Android:
- [ ] `npm run build` executado com sucesso
- [ ] `npx cap sync android` executado
- [ ] Variáveis de ambiente configuradas
- [ ] Testado em navegador (`npm run preview`)
- [ ] Android Studio instalado e configurado
- [ ] SDK Android atualizado
- [ ] Gradle Sync completado sem erros
- [ ] Emulador ou dispositivo disponível para teste

---

## 📞 COMANDOS ÚTEIS

```bash
# Ver dispositivos conectados
adb devices

# Ver logs do app em tempo real
adb logcat | grep "Capacitor"

# Desinstalar app do dispositivo
adb uninstall com.mercadoia.flex

# Limpar cache do Gradle
cd android && ./gradlew clean

# Rebuild completo
npm run build && npx cap sync android && cd android && ./gradlew clean build
```

---

## 📚 RECURSOS ADICIONAIS

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/studio)
- [Capacitor Android](https://capacitorjs.com/docs/android)

---

**Última Atualização**: 2025-10-24
**Versão Capacitor**: 7.4.3
**Versão Gradle**: 8.11.1
**Target SDK**: 34
