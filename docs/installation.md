# Installation Guide

## 📋 Prerequisites

Before starting, ensure you have the following installed on your system:

### Required
- **Node.js** 18.0.0 or higher
- **npm**, **pnpm**, or **yarn** package manager
- **Git** for version control

### Optional
- **Laravel API** backend (for full-stack development)
- **Database** (MySQL, PostgreSQL, etc.)
- **Redis** (for caching and sessions)

## 🚀 Step-by-Step Installation

### Step 1: Clone or Create Project

#### Option A: From Existing Repository
```bash
# Clone the repository
git clone https://github.com/your-username/nuxt-boilerplate.git
cd nuxt-boilerplate

# Install dependencies
npm install
```

#### Option B: Start from Scratch
```bash
# Create new Nuxt 3 project
npm create nuxt@latest nuxt-boilerplate
cd nuxt-boilerplate

# Install required dependencies
npm install @nuxtjs/i18n @pinia/nuxt @vueuse/nuxt @nuxtjs/tailwindcss @sidebase/nuxt-auth @primevue/nuxt-module primevue @primevue/themes primeicons ofetch @vee-validate/yup yup @nuxt/content @nuxt/eslint @nuxt/fonts @nuxt/icon @nuxt/image @nuxt/scripts @nuxt/test-utils
```

### Step 2: Configure Nuxt

Update your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@sidebase/nuxt-auth',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils'
  ],

  // PrimeVue configuration
  primevue: {
    options: {
      theme: {
        preset: 'Aura',
        options: {
          prefix: 'p',
          darkModeSelector: '.dark',
          cssLayer: false
        }
      }
    }
  },

  // Tailwind CSS configuration
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },

  // i18n configuration
  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'tr',
        iso: 'tr-TR',
        name: 'Türkçe',
        file: 'tr.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
  },

  // Runtime config
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8000/api',
      appName: process.env.APP_NAME || 'Nuxt Boilerplate',
      authUrl: process.env.AUTH_URL || 'http://localhost:8000'
    }
  },

  // CSS configuration
  css: ['~/assets/css/main.css'],

  // TypeScript configuration
  typescript: {
    typeCheck: true
  }
})
```

### Step 3: Create Environment Configuration

Create `.env` file:

```bash
# App Configuration
APP_NAME="Nuxt Boilerplate"
APP_URL="http://localhost:3000"

# API Configuration
API_BASE_URL="http://localhost:8000/api"
AUTH_URL="http://localhost:8000"

# Authentication
AUTH_ORIGIN="http://localhost:3000"
AUTH_SECRET="your-secret-key-here"

# Database (if using server-side features)
DATABASE_URL="postgresql://username:password@localhost:5432/database"

# Development
NODE_ENV="development"
NUXT_DEVTOOLS_ENABLED="true"
```

### Step 4: Set Up Basic File Structure

Create the following directory structure:

```
nuxt-boilerplate/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── ui/
│   ├── forms/
│   └── layout/
├── composables/
├── layouts/
├── locales/
│   ├── en.json
│   └── tr.json
├── middleware/
├── pages/
├── plugins/
├── server/
│   └── api/
├── stores/
├── types/
└── utils/
```

### Step 5: Configure Tailwind CSS

Create `assets/css/main.css`:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* PrimeVue theme variables */
:root {
  --primary-color: #10b981;
  --primary-color-text: #ffffff;
  --surface-0: #ffffff;
  --surface-50: #f9fafb;
  --surface-100: #f3f4f6;
  --surface-200: #e5e7eb;
  --surface-300: #d1d5db;
  --surface-400: #9ca3af;
  --surface-500: #6b7280;
  --surface-600: #4b5563;
  --surface-700: #374151;
  --surface-800: #1f2937;
  --surface-900: #111827;
  --surface-950: #030712;
}

.dark {
  --primary-color: #10b981;
  --primary-color-text: #ffffff;
  --surface-0: #111827;
  --surface-50: #1f2937;
  --surface-100: #374151;
  --surface-200: #4b5563;
  --surface-300: #6b7280;
  --surface-400: #9ca3af;
  --surface-500: #d1d5db;
  --surface-600: #e5e7eb;
  --surface-700: #f3f4f6;
  --surface-800: #f9fafb;
  --surface-900: #ffffff;
  --surface-950: #ffffff;
}

/* Global styles */
body {
  font-family: 'Inter', sans-serif;
  @apply text-gray-900 dark:text-gray-100;
  @apply bg-white dark:bg-gray-900;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-md;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
```

### Step 6: Set Up i18n

Create `locales/en.json`:

```json
{
  "common": {
    "welcome": "Welcome",
    "hello": "Hello",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "close": "Close",
    "search": "Search",
    "submit": "Submit",
    "reset": "Reset"
  },
  "navigation": {
    "home": "Home",
    "about": "About",
    "contact": "Contact",
    "dashboard": "Dashboard",
    "profile": "Profile",
    "settings": "Settings",
    "logout": "Logout"
  },
  "auth": {
    "login": "Login",
    "register": "Register",
    "email": "Email",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "forgotPassword": "Forgot Password",
    "rememberMe": "Remember Me",
    "loginSuccess": "Login successful",
    "loginError": "Login failed",
    "logoutSuccess": "Logout successful"
  },
  "validation": {
    "required": "This field is required",
    "email": "Please enter a valid email address",
    "minLength": "Must be at least {min} characters",
    "maxLength": "Must be no more than {max} characters",
    "passwordMatch": "Passwords must match"
  }
}
```

Create `locales/tr.json`:

```json
{
  "common": {
    "welcome": "Hoş geldiniz",
    "hello": "Merhaba",
    "loading": "Yükleniyor...",
    "error": "Hata",
    "success": "Başarılı",
    "save": "Kaydet",
    "cancel": "İptal",
    "delete": "Sil",
    "edit": "Düzenle",
    "close": "Kapat",
    "search": "Ara",
    "submit": "Gönder",
    "reset": "Sıfırla"
  },
  "navigation": {
    "home": "Ana Sayfa",
    "about": "Hakkında",
    "contact": "İletişim",
    "dashboard": "Gösterge Paneli",
    "profile": "Profil",
    "settings": "Ayarlar",
    "logout": "Çıkış"
  },
  "auth": {
    "login": "Giriş",
    "register": "Kayıt Ol",
    "email": "E-posta",
    "password": "Şifre",
    "confirmPassword": "Şifre Doğrula",
    "forgotPassword": "Şifre Unuttum",
    "rememberMe": "Beni Hatırla",
    "loginSuccess": "Giriş başarılı",
    "loginError": "Giriş başarısız",
    "logoutSuccess": "Çıkış başarılı"
  },
  "validation": {
    "required": "Bu alan gereklidir",
    "email": "Geçerli bir e-posta adresi giriniz",
    "minLength": "En az {min} karakter olmalıdır",
    "maxLength": "En fazla {max} karakter olmalıdır",
    "passwordMatch": "Şifreler eşleşmelidir"
  }
}
```

Create `i18n.config.ts`:

```typescript
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      welcome: 'Welcome'
    },
    tr: {
      welcome: 'Hoş geldiniz'
    }
  }
}))
```

### Step 7: Update app.vue

Replace the default `app.vue`:

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Configure app head
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Nuxt Boilerplate` : 'Nuxt Boilerplate'
  },
  meta: [
    { name: 'description', content: 'A comprehensive Nuxt 3 boilerplate with PrimeVue and Laravel API integration' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})

// Configure dark mode
const colorMode = useColorMode()
</script>
```

### Step 8: Create Default Layout

Create `layouts/default.vue`:

```vue
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
// Layout-specific logic here
</script>
```

### Step 9: Create Index Page

Create `pages/index.vue`:

```vue
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('common.welcome') }}
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Nuxt 3 + PrimeVue + Laravel API Boilerplate
      </p>
      
      <div class="space-y-4">
        <Button 
          label="Get Started" 
          icon="pi pi-arrow-right" 
          class="mr-4"
          @click="navigateTo('/dashboard')"
        />
        
        <Button 
          label="Documentation" 
          icon="pi pi-book" 
          severity="secondary"
          outlined
          @click="navigateTo('/docs')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'Home'
})
</script>
```

### Step 10: Verify Installation

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your boilerplate in action!

## 🔧 Post-Installation Steps

### 1. Configure ESLint

Create `.eslintrc.js`:

```javascript
module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  rules: {
    // Add your custom rules here
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off'
  }
}
```

### 2. Configure TypeScript

Update `tsconfig.json`:

```json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "skipLibCheck": true
  }
}
```

### 3. Set Up Git Hooks (Optional)

```bash
# Install husky for git hooks
npm install --save-dev husky

# Initialize husky
npx husky init

# Add pre-commit hook
echo "npm run lint" > .husky/pre-commit
```

## 🚨 Troubleshooting

### Common Issues

1. **Node.js Version**: Ensure you're using Node.js 18+
2. **Port Conflicts**: Change the port in `nuxt.config.ts` if 3000 is occupied
3. **Module Conflicts**: Clear `.nuxt` directory and reinstall: `rm -rf .nuxt && npm install`
4. **TypeScript Errors**: Run `npm run postinstall` to regenerate types

### Getting Help

- Check the [FAQ](./faq.md)
- Visit [troubleshooting guide](./troubleshooting.md)
- Open an issue on GitHub

## ✅ Next Steps

After successful installation:

1. [Configure PrimeVue](./primevue-setup.md)
2. [Set up authentication](./authentication.md)
3. [Configure API integration](./api-integration.md)
4. [Explore components](./examples/components.md)

---

**Installation complete!** 🎉 Your Nuxt 3 boilerplate is ready for development. 