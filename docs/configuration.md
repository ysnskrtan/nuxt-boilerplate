# Configuration Guide

## 🔧 Environment Configuration

### 1. Environment Variables

Create a `.env` file in your project root:

```bash
# Application
APP_NAME="Nuxt Boilerplate"
APP_URL="http://localhost:3000"
APP_ENV="development"

# API Configuration
API_BASE_URL="http://localhost:8000/api"
AUTH_URL="http://localhost:8000"
API_TIMEOUT=30000

# Laravel Sanctum
SANCTUM_STATEFUL_DOMAINS="localhost:3000"
SESSION_DOMAIN="localhost"

# Authentication
AUTH_ORIGIN="http://localhost:3000"
AUTH_SECRET="your-super-secret-key-here"
NUXT_SECRET_KEY="your-nuxt-secret-key"

# Database (if using server-side features)
DATABASE_URL="postgresql://username:password@localhost:5432/database"
REDIS_URL="redis://localhost:6379"

# Email Configuration
MAIL_MAILER="smtp"
MAIL_HOST="localhost"
MAIL_PORT="1025"
MAIL_USERNAME=""
MAIL_PASSWORD=""
MAIL_ENCRYPTION=""
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="Nuxt Boilerplate"

# File Storage
STORAGE_DISK="local"
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_DEFAULT_REGION="us-east-1"
AWS_BUCKET=""

# Social Authentication
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Analytics
GOOGLE_ANALYTICS_ID=""
FACEBOOK_PIXEL_ID=""

# Development
NODE_ENV="development"
NUXT_DEVTOOLS_ENABLED="true"
DEBUG="true"
```

### 2. Production Environment

For production, create `.env.production`:

```bash
# Application
APP_NAME="Nuxt Boilerplate"
APP_URL="https://yourdomain.com"
APP_ENV="production"

# API Configuration
API_BASE_URL="https://api.yourdomain.com/api"
AUTH_URL="https://api.yourdomain.com"
API_TIMEOUT=30000

# Security
AUTH_SECRET="your-production-secret-key"
NUXT_SECRET_KEY="your-production-nuxt-secret"

# Database
DATABASE_URL="postgresql://user:password@host:5432/database"
REDIS_URL="redis://host:6379"

# SSL
FORCE_HTTPS="true"
HSTS_MAX_AGE=31536000

# Caching
CACHE_DRIVER="redis"
SESSION_DRIVER="redis"

# Development
NODE_ENV="production"
NUXT_DEVTOOLS_ENABLED="false"
DEBUG="false"
```

## ⚙️ Nuxt Configuration

### 1. Complete `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  // Compatibility
  compatibilityDate: '2024-04-03',
  
  // Development tools
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  
  // SSR Configuration
  ssr: true,
  
  // Modules
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

  // CSS
  css: ['~/assets/css/main.css'],

  // Build Configuration
  build: {
    transpile: ['@headlessui/vue']
  },

  // Runtime Configuration
  runtimeConfig: {
    // Private keys (only available on server-side)
    authSecret: process.env.AUTH_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    
    // Public keys (exposed to client-side)
    public: {
      appName: process.env.APP_NAME || 'Nuxt Boilerplate',
      appUrl: process.env.APP_URL || 'http://localhost:3000',
      apiBase: process.env.API_BASE_URL || 'http://localhost:8000/api',
      authUrl: process.env.AUTH_URL || 'http://localhost:8000',
      apiTimeout: parseInt(process.env.API_TIMEOUT || '30000'),
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
      facebookPixelId: process.env.FACEBOOK_PIXEL_ID
    }
  },

  // App Configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nuxt Boilerplate',
      meta: [
        { name: 'description', content: 'A comprehensive Nuxt 3 boilerplate with PrimeVue and Laravel API integration' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#10b981' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },

  // Nitro Configuration
  nitro: {
    // Server-side compression
    compressPublicAssets: true,
    
    // CORS configuration
    cors: {
      origin: process.env.APP_URL || 'http://localhost:3000',
      credentials: true
    },
    
    // Development proxy
    devProxy: {
      '/api': {
        target: process.env.API_BASE_URL || 'http://localhost:8000/api',
        changeOrigin: true,
        prependPath: true
      }
    }
  },

  // PrimeVue Configuration
  primevue: {
    options: {
      theme: {
        preset: 'Aura',
        options: {
          prefix: 'p',
          darkModeSelector: '.dark',
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities'
          }
        }
      }
    },
    components: {
      // Include only the components you need
      include: [
        'Button',
        'InputText',
        'Password',
        'Dropdown',
        'MultiSelect',
        'Calendar',
        'Checkbox',
        'RadioButton',
        'DataTable',
        'Card',
        'Dialog',
        'Toast',
        'ConfirmDialog',
        'Menu',
        'Menubar',
        'Breadcrumb',
        'Steps',
        'TabView',
        'TabPanel',
        'Timeline',
        'Rating',
        'Tag',
        'Avatar',
        'Chip',
        'Badge',
        'ProgressBar',
        'Skeleton',
        'Divider',
        'Accordion',
        'AccordionTab',
        'Fieldset',
        'Panel',
        'Toolbar',
        'FileUpload',
        'Column'
      ]
    }
  },

  // Tailwind Configuration
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
    config: {
      darkMode: 'class',
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
        './app.vue'
      ]
    }
  },

  // i18n Configuration
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
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
        file: 'es.json'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  // Authentication Configuration
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    },
    session: {
      enableRefreshOnWindowFocus: true,
      enableRefreshPeriodically: 30000 // 30 seconds
    }
  },

  // Fonts Configuration
  fonts: {
    google: {
      families: {
        Inter: [400, 500, 600, 700],
        'Plus Jakarta Sans': [400, 500, 600, 700]
      }
    }
  },

  // Icon Configuration
  icon: {
    serverBundle: {
      collections: ['heroicons', 'lucide', 'tabler']
    }
  },

  // Image Configuration
  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // TypeScript Configuration
  typescript: {
    typeCheck: true,
    strict: true
  },

  // Experimental Features
  experimental: {
    payloadExtraction: false,
    viewTransition: true
  },

  // Hooks
  hooks: {
    'build:before': () => {
      console.log('🚀 Starting build process...')
    },
    'build:done': () => {
      console.log('✅ Build completed successfully!')
    }
  }
})
```

### 2. TypeScript Configuration

Update `tsconfig.json`:

```json
{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "types/**/*",
    "**/*.ts",
    "**/*.vue"
  ],
  "exclude": [
    "node_modules",
    ".nuxt",
    ".output"
  ]
}
```

### 3. Tailwind Configuration

Create `tailwind.config.js`:

```javascript
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22'
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
}
```

## 🌐 i18n Configuration

### 1. Main i18n Config

Create `i18n.config.ts`:

```typescript
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      welcome: 'Welcome',
      hello: 'Hello {name}!'
    },
    tr: {
      welcome: 'Hoş geldiniz',
      hello: 'Merhaba {name}!'
    }
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    },
    tr: {
      currency: {
        style: 'currency',
        currency: 'TRY',
        notation: 'standard'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    }
  },
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    tr: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  }
}))
```

### 2. Extended Language Files

Create `locales/en.json`:

```json
{
  "common": {
    "welcome": "Welcome",
    "hello": "Hello",
    "goodbye": "Goodbye",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",
    "warning": "Warning",
    "info": "Information",
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "close": "Close",
    "search": "Search",
    "filter": "Filter",
    "sort": "Sort",
    "submit": "Submit",
    "reset": "Reset",
    "clear": "Clear",
    "back": "Back",
    "next": "Next",
    "previous": "Previous",
    "continue": "Continue",
    "finish": "Finish",
    "yes": "Yes",
    "no": "No",
    "ok": "OK",
    "confirm": "Confirm",
    "optional": "Optional",
    "required": "Required",
    "select": "Select",
    "choose": "Choose",
    "upload": "Upload",
    "download": "Download",
    "print": "Print",
    "share": "Share",
    "copy": "Copy",
    "cut": "Cut",
    "paste": "Paste",
    "refresh": "Refresh",
    "reload": "Reload",
    "home": "Home",
    "dashboard": "Dashboard",
    "profile": "Profile",
    "settings": "Settings",
    "help": "Help",
    "about": "About",
    "contact": "Contact",
    "privacy": "Privacy",
    "terms": "Terms",
    "logout": "Logout"
  },
  "navigation": {
    "home": "Home",
    "products": "Products",
    "services": "Services",
    "about": "About",
    "contact": "Contact",
    "blog": "Blog",
    "support": "Support",
    "documentation": "Documentation",
    "api": "API",
    "pricing": "Pricing",
    "features": "Features",
    "dashboard": "Dashboard",
    "admin": "Admin",
    "profile": "Profile",
    "settings": "Settings",
    "logout": "Logout"
  },
  "auth": {
    "login": "Login",
    "register": "Register",
    "logout": "Logout",
    "email": "Email",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "currentPassword": "Current Password",
    "newPassword": "New Password",
    "forgotPassword": "Forgot Password",
    "resetPassword": "Reset Password",
    "rememberMe": "Remember Me",
    "name": "Name",
    "firstName": "First Name",
    "lastName": "Last Name",
    "username": "Username",
    "phone": "Phone",
    "dateOfBirth": "Date of Birth",
    "gender": "Gender",
    "address": "Address",
    "city": "City",
    "country": "Country",
    "zipCode": "ZIP Code",
    "loginSuccess": "Login successful",
    "loginError": "Login failed",
    "logoutSuccess": "Logout successful",
    "registerSuccess": "Registration successful",
    "registerError": "Registration failed",
    "passwordResetSent": "Password reset email sent",
    "passwordResetSuccess": "Password reset successful",
    "passwordResetError": "Password reset failed",
    "emailVerificationSent": "Email verification sent",
    "emailVerified": "Email verified successfully",
    "emailVerificationError": "Email verification failed",
    "accountLocked": "Account locked",
    "accountSuspended": "Account suspended",
    "invalidCredentials": "Invalid credentials",
    "sessionExpired": "Session expired",
    "unauthorized": "Unauthorized access",
    "accessDenied": "Access denied"
  },
  "validation": {
    "required": "This field is required",
    "email": "Please enter a valid email address",
    "password": "Password must be at least 8 characters",
    "passwordConfirm": "Passwords do not match",
    "minLength": "Must be at least {min} characters",
    "maxLength": "Must be no more than {max} characters",
    "min": "Must be at least {min}",
    "max": "Must be no more than {max}",
    "number": "Must be a number",
    "integer": "Must be an integer",
    "decimal": "Must be a decimal number",
    "url": "Must be a valid URL",
    "date": "Must be a valid date",
    "phone": "Must be a valid phone number",
    "alphanumeric": "Must contain only letters and numbers",
    "alpha": "Must contain only letters",
    "numeric": "Must contain only numbers",
    "unique": "This value already exists",
    "accepted": "Must be accepted",
    "confirmed": "Confirmation does not match",
    "different": "Must be different from {other}",
    "same": "Must be the same as {other}",
    "in": "Must be one of: {values}",
    "notIn": "Must not be one of: {values}",
    "regex": "Invalid format",
    "size": "Must be exactly {size}",
    "between": "Must be between {min} and {max}",
    "before": "Must be before {date}",
    "after": "Must be after {date}",
    "mimes": "Must be a file of type: {types}",
    "image": "Must be an image",
    "file": "Must be a file"
  },
  "errors": {
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "422": "Validation Error",
    "429": "Too Many Requests",
    "500": "Internal Server Error",
    "502": "Bad Gateway",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
    "networkError": "Network Error",
    "timeoutError": "Request Timeout",
    "unknownError": "Unknown Error",
    "somethingWentWrong": "Something went wrong",
    "pleaseRefresh": "Please refresh the page",
    "tryAgain": "Please try again",
    "contactSupport": "Please contact support if the problem persists"
  },
  "messages": {
    "welcome": "Welcome to our application!",
    "dataLoaded": "Data loaded successfully",
    "dataSaved": "Data saved successfully",
    "dataDeleted": "Data deleted successfully",
    "dataUpdated": "Data updated successfully",
    "noData": "No data available",
    "noResults": "No results found",
    "confirmDelete": "Are you sure you want to delete this item?",
    "confirmAction": "Are you sure you want to proceed?",
    "unsavedChanges": "You have unsaved changes. Are you sure you want to leave?",
    "fileUploaded": "File uploaded successfully",
    "fileDeleted": "File deleted successfully",
    "fileTooLarge": "File is too large",
    "invalidFileType": "Invalid file type",
    "processingRequest": "Processing your request...",
    "requestCompleted": "Request completed successfully",
    "requestFailed": "Request failed",
    "connectionLost": "Connection lost. Please check your internet connection.",
    "reconnected": "Connection restored",
    "maintenanceMode": "The application is currently under maintenance. Please try again later.",
    "featureNotAvailable": "This feature is not available at the moment",
    "comingSoon": "Coming soon!",
    "betaFeature": "This is a beta feature",
    "deprecated": "This feature is deprecated and will be removed in a future version"
  }
}
```

## 🔒 Security Configuration

### 1. Security Headers

Create `nitro.config.ts`:

```typescript
export default defineNitroConfig({
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self'; object-src 'none'; frame-src 'none';"
      }
    }
  }
})
```

### 2. CORS Configuration

Create `server/middleware/cors.ts`:

```typescript
export default defineEventHandler(async (event) => {
  // Allow CORS for API routes
  if (event.node.req.url?.startsWith('/api/')) {
    const origin = getHeader(event, 'origin')
    const allowedOrigins = [
      'http://localhost:3000',
      'https://yourdomain.com'
    ]
    
    if (allowedOrigins.includes(origin)) {
      setHeader(event, 'Access-Control-Allow-Origin', origin)
    }
    
    setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    setHeader(event, 'Access-Control-Allow-Credentials', 'true')
    
    // Handle preflight requests
    if (event.node.req.method === 'OPTIONS') {
      return ''
    }
  }
})
```

## 📦 Build Configuration

### 1. Build Optimization

Add to `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  // ... other config
  
  build: {
    // Transpile dependencies
    transpile: ['@headlessui/vue', 'primevue'],
    
    // Optimize CSS
    extractCSS: true,
    
    // Optimization
    optimization: {
      splitChunks: {
        layouts: true,
        pages: true,
        commons: true
      }
    },
    
    // Babel configuration
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }]
      ]
    }
  },
  
  // Vite configuration
  vite: {
    optimizeDeps: {
      include: ['vue', 'vue-router']
    },
    
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            primevue: ['primevue/button', 'primevue/inputtext', 'primevue/datatable']
          }
        }
      }
    }
  }
})
```

### 2. Docker Configuration

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start application
CMD ["npm", "start"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  nuxt-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - API_BASE_URL=http://laravel-api:8000/api
    depends_on:
      - laravel-api
    networks:
      - app-network

  laravel-api:
    image: laravel-api:latest
    ports:
      - "8000:8000"
    environment:
      - DB_CONNECTION=mysql
      - DB_HOST=mysql
      - DB_DATABASE=laravel
      - DB_USERNAME=root
      - DB_PASSWORD=secret
    depends_on:
      - mysql
    networks:
      - app-network

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=secret
      - MYSQL_DATABASE=laravel
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - app-network

volumes:
  mysql-data:

networks:
  app-network:
    driver: bridge
```

## 🚀 Performance Configuration

### 1. Caching Strategy

Create `composables/useCache.ts`:

```typescript
export const useCacheConfig = () => {
  return {
    // API cache settings
    api: {
      default: 5 * 60 * 1000, // 5 minutes
      user: 10 * 60 * 1000,   // 10 minutes
      static: 60 * 60 * 1000, // 1 hour
      longTerm: 24 * 60 * 60 * 1000 // 24 hours
    },
    
    // Storage settings
    storage: {
      prefix: 'nuxt-boilerplate-',
      version: '1.0.0',
      enableCompression: true,
      maxSize: 50 * 1024 * 1024 // 50MB
    },
    
    // CDN settings
    cdn: {
      images: process.env.CDN_IMAGES_URL || '',
      static: process.env.CDN_STATIC_URL || '',
      api: process.env.CDN_API_URL || ''
    }
  }
}
```

### 2. PWA Configuration

Add to `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  // ... other config
  
  // PWA configuration
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})
```

## 🔗 Next Steps

1. [Authentication Setup](./authentication.md) - Configure user authentication
2. [API Integration](./api-integration.md) - Connect to Laravel backend
3. [Deployment](./deployment.md) - Deploy to production
4. [Performance](./performance.md) - Optimize application performance

---

**Configuration complete!** ⚙️ Your application is now properly configured for development and production environments. 