# Project Structure

## 📁 Overview

This document explains the file organization and conventions used in the Nuxt 3 boilerplate project.

## 🏗️ Directory Structure

```
nuxt-boilerplate/
├── .nuxt/                    # Auto-generated Nuxt files (don't edit)
├── .output/                  # Build output directory
├── assets/                   # Raw assets (Sass, images, fonts)
│   ├── css/
│   │   └── main.css         # Main CSS file with Tailwind imports
│   ├── images/              # Image assets
│   └── fonts/               # Font files
├── components/              # Vue components
│   ├── ui/                  # Base UI components
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   └── BaseCard.vue
│   ├── forms/               # Form-specific components
│   │   ├── ContactForm.vue
│   │   ├── LoginForm.vue
│   │   └── RegisterForm.vue
│   ├── layout/              # Layout components
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── AppSidebar.vue
│   │   └── AppNavigation.vue
│   └── features/            # Feature-specific components
│       ├── user/
│       │   ├── UserProfile.vue
│       │   └── UserList.vue
│       └── product/
│           ├── ProductCard.vue
│           └── ProductList.vue
├── composables/             # Reusable composition functions
│   ├── useApi.ts           # API client composable
│   ├── useAuth.ts          # Authentication composable
│   ├── useUsers.ts         # User management composable
│   ├── useProducts.ts      # Product management composable
│   ├── useNotifications.ts # Notification composable
│   └── useLocalStorage.ts  # Local storage utilities
├── layouts/                 # App layouts
│   ├── default.vue         # Default layout
│   ├── admin.vue           # Admin layout
│   ├── auth.vue            # Authentication layout
│   └── error.vue           # Error layout
├── locales/                 # Internationalization files
│   ├── en.json             # English translations
│   ├── tr.json             # Turkish translations
│   └── index.ts            # i18n configuration
├── middleware/              # Route middleware
│   ├── auth.ts             # Authentication middleware
│   ├── admin.ts            # Admin access middleware
│   ├── guest.ts            # Guest-only middleware
│   └── role.ts             # Role-based middleware
├── pages/                   # Application pages (file-based routing)
│   ├── index.vue           # Home page (/)
│   ├── about.vue           # About page (/about)
│   ├── auth/               # Authentication pages
│   │   ├── login.vue       # Login page (/auth/login)
│   │   ├── register.vue    # Register page (/auth/register)
│   │   └── reset.vue       # Password reset (/auth/reset)
│   ├── dashboard/          # Dashboard pages
│   │   ├── index.vue       # Dashboard home (/dashboard)
│   │   ├── profile.vue     # User profile (/dashboard/profile)
│   │   └── settings.vue    # User settings (/dashboard/settings)
│   ├── admin/              # Admin pages
│   │   ├── index.vue       # Admin dashboard (/admin)
│   │   ├── users.vue       # User management (/admin/users)
│   │   └── products.vue    # Product management (/admin/products)
│   └── [...slug].vue       # Catch-all page for 404s
├── plugins/                 # Nuxt plugins
│   ├── api.client.ts       # API client plugin
│   ├── auth.client.ts      # Authentication plugin
│   ├── primevue.client.ts  # PrimeVue plugin
│   └── i18n.client.ts      # i18n plugin
├── public/                  # Static files
│   ├── favicon.ico         # Favicon
│   ├── logo.png            # Logo
│   ├── images/             # Public images
│   └── robots.txt          # SEO robots file
├── server/                  # Server-side code
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   │   ├── login.post.ts
│   │   │   ├── register.post.ts
│   │   │   └── logout.post.ts
│   │   ├── users/          # User endpoints
│   │   │   ├── index.get.ts
│   │   │   ├── [id].get.ts
│   │   │   └── [id].put.ts
│   │   └── health.get.ts   # Health check endpoint
│   ├── middleware/         # Server middleware
│   │   ├── cors.ts         # CORS configuration
│   │   └── auth.ts         # Server-side auth
│   └── utils/              # Server utilities
│       ├── db.ts           # Database connection
│       └── jwt.ts          # JWT utilities
├── stores/                  # Pinia stores
│   ├── auth.ts             # Authentication store
│   ├── user.ts             # User store
│   ├── product.ts          # Product store
│   └── notification.ts     # Notification store
├── types/                   # TypeScript type definitions
│   ├── index.ts            # Main type exports
│   ├── api.ts              # API response types
│   ├── auth.ts             # Authentication types
│   ├── user.ts             # User types
│   └── product.ts          # Product types
├── utils/                   # Utility functions
│   ├── index.ts            # Main utility exports
│   ├── validation.ts       # Validation utilities
│   ├── format.ts           # Formatting utilities
│   └── constants.ts        # Application constants
├── tests/                   # Test files
│   ├── components/         # Component tests
│   ├── composables/        # Composable tests
│   ├── pages/              # Page tests
│   └── setup.ts            # Test setup
├── docs/                    # Documentation
│   ├── README.md           # Main documentation
│   ├── installation.md     # Installation guide
│   ├── api-integration.md  # API integration guide
│   └── examples/           # Usage examples
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── nuxt.config.ts          # Nuxt configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project README
```

## 📝 File Naming Conventions

### Components
- Use PascalCase for component names: `UserProfile.vue`
- Use kebab-case for component files in subdirectories: `user-profile.vue`
- Prefix base components with `Base`: `BaseButton.vue`
- Use descriptive names: `ProductCard.vue` instead of `Card.vue`

### Composables
- Use camelCase starting with `use`: `useApi.ts`
- Group related composables in subdirectories when needed
- Export as named exports: `export const useApi = () => {}`

### Pages
- Use kebab-case for page files: `user-profile.vue`
- Use `index.vue` for directory index pages
- Use `[param].vue` for dynamic routes
- Use `[...slug].vue` for catch-all routes

### Stores
- Use singular nouns: `user.ts` instead of `users.ts`
- Use camelCase for store files: `userProfile.ts`
- Export store using `defineStore`: `export const useUserStore = defineStore('user', ...)`

### Types
- Use PascalCase for interfaces: `User`, `Product`
- Use camelCase for type files: `user.ts`
- Group related types in the same file
- Use `interface` for object shapes, `type` for unions

### Utilities
- Use camelCase for utility functions: `formatDate`
- Use camelCase for utility files: `dateUtils.ts`
- Group related utilities in the same file
- Export as named exports

## 🎯 Component Organization

### Base Components (`components/ui/`)
Reusable UI components that can be used throughout the application:

```typescript
// BaseButton.vue
<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})

const buttonClass = computed(() => {
  // Component logic
})
</script>
```

### Feature Components (`components/features/`)
Components specific to particular features or domains:

```typescript
// components/features/user/UserProfile.vue
<template>
  <div class="user-profile">
    <BaseCard>
      <template #header>
        <h2>User Profile</h2>
      </template>
      
      <UserAvatar :user="user" />
      <UserDetails :user="user" />
      
      <template #footer>
        <BaseButton @click="editProfile">
          Edit Profile
        </BaseButton>
      </template>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

interface Props {
  user: User
}

const props = defineProps<Props>()

const editProfile = () => {
  // Edit profile logic
}
</script>
```

### Layout Components (`components/layout/`)
Components used for application layout:

```typescript
// components/layout/AppHeader.vue
<template>
  <header class="app-header">
    <nav class="container mx-auto">
      <AppLogo />
      <AppNavigation />
      <AppUserMenu />
    </nav>
  </header>
</template>

<script setup lang="ts">
// Header logic
</script>
```

## 🔧 Composable Organization

### API Composables
Handle API communication and data fetching:

```typescript
// composables/useUsers.ts
export const useUsers = () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUsers = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/users')
      users.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    users: readonly(users),
    loading: readonly(loading),
    error: readonly(error),
    fetchUsers
  }
}
```

### UI Composables
Handle UI state and interactions:

```typescript
// composables/useModal.ts
export const useModal = () => {
  const isOpen = ref(false)
  const title = ref('')
  const content = ref('')

  const openModal = (modalTitle: string, modalContent: string) => {
    title.value = modalTitle
    content.value = modalContent
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
    title.value = ''
    content.value = ''
  }

  return {
    isOpen: readonly(isOpen),
    title: readonly(title),
    content: readonly(content),
    openModal,
    closeModal
  }
}
```

## 🗂️ Store Organization

### Pinia Store Structure
Organize stores by feature or domain:

```typescript
// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || 'guest')

  // Actions
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      user.value = response.user
      token.value = response.token
      
      // Store token in cookie
      const tokenCookie = useCookie('token')
      tokenCookie.value = response.token
      
      return response
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST'
      })
    } finally {
      user.value = null
      token.value = null
      
      const tokenCookie = useCookie('token')
      tokenCookie.value = null
      
      await navigateTo('/auth/login')
    }
  }

  return {
    // State
    user: readonly(user),
    token: readonly(token),
    isLoading: readonly(isLoading),
    
    // Getters
    isAuthenticated,
    userRole,
    
    // Actions
    login,
    logout
  }
})
```

## 📄 Page Organization

### Page Structure
Each page should follow this structure:

```vue
<!-- pages/dashboard/profile.vue -->
<template>
  <div class="profile-page">
    <AppPageHeader :title="$t('profile.title')" />
    
    <div class="container mx-auto py-8">
      <UserProfile :user="user" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  title: 'Profile',
  layout: 'dashboard',
  middleware: 'auth'
})

// Head configuration
useHead({
  title: 'Profile - Dashboard',
  meta: [
    {
      name: 'description',
      content: 'User profile page'
    }
  ]
})

// Data fetching
const { user } = useAuthStore()
</script>
```

### Dynamic Routes
For dynamic routes, use proper parameter handling:

```vue
<!-- pages/users/[id].vue -->
<template>
  <div class="user-detail-page">
    <div v-if="pending">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="error">
      <ErrorMessage :error="error" />
    </div>
    
    <div v-else>
      <UserDetail :user="user" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const userId = route.params.id as string

// Fetch user data
const { data: user, pending, error } = await useFetch(`/api/users/${userId}`)

// Validate user ID
if (!userId || isNaN(Number(userId))) {
  throw createError({
    statusCode: 400,
    statusMessage: 'Invalid user ID'
  })
}
</script>
```

## 🚀 Best Practices

### 1. Import Organization
Order imports consistently:

```typescript
// 1. Vue imports
import { ref, computed, onMounted } from 'vue'

// 2. Nuxt imports
import { useRoute, useRouter, useFetch } from 'nuxt/app'

// 3. Third-party imports
import { format } from 'date-fns'

// 4. Local imports
import { useAuthStore } from '~/stores/auth'
import type { User } from '~/types'
```

### 2. Component Props
Use TypeScript interfaces for props:

```typescript
interface Props {
  user: User
  readonly?: boolean
  onSave?: (user: User) => void
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false
})
```

### 3. Event Handling
Use proper event typing:

```typescript
const emits = defineEmits<{
  save: [user: User]
  cancel: []
  delete: [id: string]
}>()

const handleSave = (user: User) => {
  emits('save', user)
}
```

### 4. Composable Usage
Use composables consistently:

```typescript
// Good
const { users, loading, fetchUsers } = useUsers()

// Better - with error handling
const { users, loading, error, fetchUsers } = useUsers()

onMounted(async () => {
  try {
    await fetchUsers()
  } catch (err) {
    // Handle error
  }
})
```

## 🧪 Testing Structure

### Test Organization
Mirror your source structure in tests:

```
tests/
├── components/
│   ├── ui/
│   │   └── BaseButton.test.ts
│   └── features/
│       └── user/
│           └── UserProfile.test.ts
├── composables/
│   ├── useApi.test.ts
│   └── useAuth.test.ts
├── pages/
│   └── index.test.ts
└── utils/
    └── validation.test.ts
```

### Test Naming
Use descriptive test names:

```typescript
describe('UserProfile', () => {
  it('should display user information correctly', () => {
    // Test implementation
  })
  
  it('should emit save event when save button is clicked', () => {
    // Test implementation
  })
  
  it('should handle loading state properly', () => {
    // Test implementation
  })
})
```

## 📚 Documentation

### Component Documentation
Document complex components:

```vue
<!--
UserProfile Component

A comprehensive user profile component that displays user information
and allows for editing when not in readonly mode.

Props:
- user: User object containing user data
- readonly: Boolean to disable editing (default: false)
- showAvatar: Boolean to show/hide avatar (default: true)

Events:
- save: Emitted when user data is saved
- cancel: Emitted when edit is cancelled
- delete: Emitted when user requests deletion

Usage:
<UserProfile
  :user="currentUser"
  :readonly="!canEdit"
  @save="handleSave"
  @cancel="handleCancel"
/>
-->
```

### Composable Documentation
Document composable usage:

```typescript
/**
 * useUsers - User management composable
 * 
 * Provides reactive state and methods for managing users
 * 
 * @returns {Object} User management interface
 * @returns {Ref<User[]>} users - Reactive array of users
 * @returns {Ref<boolean>} loading - Loading state
 * @returns {Ref<string|null>} error - Error state
 * @returns {Function} fetchUsers - Fetch users from API
 * @returns {Function} createUser - Create new user
 * @returns {Function} updateUser - Update existing user
 * @returns {Function} deleteUser - Delete user
 * 
 * @example
 * const { users, loading, fetchUsers } = useUsers()
 * 
 * onMounted(async () => {
 *   await fetchUsers()
 * })
 */
```

## 🔗 Next Steps

1. [PrimeVue Setup](./primevue-setup.md) - UI component configuration
2. [API Integration](./api-integration.md) - Backend communication
3. [Authentication](./authentication.md) - User authentication
4. [Examples](./examples/components.md) - Usage examples

---

**Project structure documented!** 📁 Use this guide to maintain consistent organization throughout your project. 