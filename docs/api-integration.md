# API Integration Guide

## 🔌 Overview

This guide covers complete Laravel API integration with authentication, error handling, request/response management, and best practices.

## 🛠️ Configuration

### 1. Environment Setup

Update your `.env` file:

```bash
# API Configuration
API_BASE_URL=http://localhost:8000/api
AUTH_URL=http://localhost:8000
API_TIMEOUT=30000

# Laravel Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

### 2. Runtime Configuration

Update `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:8000/api',
      authUrl: process.env.AUTH_URL || 'http://localhost:8000',
      apiTimeout: parseInt(process.env.API_TIMEOUT || '30000')
    }
  },
  
  // Configure server-side API proxy
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.API_BASE_URL || 'http://localhost:8000/api',
        changeOrigin: true,
        prependPath: true
      }
    }
  }
})
```

## 🔧 Core API Client

### 1. Base API Client

Create `composables/useApi.ts`:

```typescript
import { ofetch } from 'ofetch'
import type { FetchOptions } from 'ofetch'

interface ApiResponse<T = any> {
  data: T
  message?: string
  errors?: Record<string, string[]>
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

interface ApiError {
  statusCode: number
  statusMessage: string
  message: string
  errors?: Record<string, string[]>
}

export const useApi = () => {
  const { $toast } = useNuxtApp()
  const config = useRuntimeConfig()
  
  // Create API client instance
  const api = ofetch.create({
    baseURL: config.public.apiBase,
    timeout: config.public.apiTimeout,
    
    // Default headers
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    
    // Include credentials for Laravel Sanctum
    credentials: 'include',
    
    // Request interceptor
    onRequest({ request, options }) {
      // Add CSRF token if available
      const csrfToken = useCookie('XSRF-TOKEN')
      if (csrfToken.value) {
        options.headers = {
          ...options.headers,
          'X-XSRF-TOKEN': csrfToken.value
        }
      }
      
      // Add authorization header
      const token = useCookie('token')
      if (token.value) {
        options.headers = {
          ...options.headers,
          'Authorization': `Bearer ${token.value}`
        }
      }
      
      // Log request in development
      if (process.dev) {
        console.log(`[API] ${options.method || 'GET'} ${request}`)
      }
    },
    
    // Response interceptor
    onResponse({ response }) {
      if (process.dev) {
        console.log(`[API] Response:`, response.status, response.statusText)
      }
    },
    
    // Error interceptor
    onResponseError({ error, response }) {
      const apiError: ApiError = {
        statusCode: response?.status || 500,
        statusMessage: response?.statusText || 'Unknown Error',
        message: response?._data?.message || 'An error occurred',
        errors: response?._data?.errors
      }
      
      // Handle specific error cases
      switch (response?.status) {
        case 401:
          // Unauthorized - redirect to login
          navigateTo('/auth/login')
          break
        case 403:
          // Forbidden
          $toast.add({
            severity: 'error',
            summary: 'Access Denied',
            detail: 'You do not have permission to perform this action',
            life: 5000
          })
          break
        case 422:
          // Validation error - don't show toast (handle in forms)
          break
        case 429:
          // Too many requests
          $toast.add({
            severity: 'warn',
            summary: 'Too Many Requests',
            detail: 'Please slow down and try again later',
            life: 5000
          })
          break
        case 500:
          // Server error
          $toast.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'Something went wrong on our end',
            life: 5000
          })
          break
        default:
          // Generic error
          $toast.add({
            severity: 'error',
            summary: 'Error',
            detail: apiError.message,
            life: 5000
          })
      }
      
      throw apiError
    }
  })
  
  // Convenience methods
  const get = <T>(url: string, options?: FetchOptions): Promise<ApiResponse<T>> =>
    api(url, { method: 'GET', ...options })
  
  const post = <T>(url: string, body?: any, options?: FetchOptions): Promise<ApiResponse<T>> =>
    api(url, { method: 'POST', body, ...options })
  
  const put = <T>(url: string, body?: any, options?: FetchOptions): Promise<ApiResponse<T>> =>
    api(url, { method: 'PUT', body, ...options })
  
  const patch = <T>(url: string, body?: any, options?: FetchOptions): Promise<ApiResponse<T>> =>
    api(url, { method: 'PATCH', body, ...options })
  
  const del = <T>(url: string, options?: FetchOptions): Promise<ApiResponse<T>> =>
    api(url, { method: 'DELETE', ...options })
  
  return {
    api,
    get,
    post,
    put,
    patch,
    delete: del
  }
}
```

### 2. Authentication API

Create `composables/useAuth.ts`:

```typescript
import type { User } from '~/types/auth'

interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const useAuth = () => {
  const { get, post } = useApi()
  const { $toast } = useNuxtApp()
  
  // State
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = ref(false)
  
  // Get CSRF cookie
  const getCsrfCookie = async () => {
    const config = useRuntimeConfig()
    await $fetch('/sanctum/csrf-cookie', {
      baseURL: config.public.authUrl,
      credentials: 'include'
    })
  }
  
  // Login
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    
    try {
      // Get CSRF cookie first
      await getCsrfCookie()
      
      // Login request
      const response = await post('/auth/login', credentials)
      
      // Store token if provided
      if (response.data.token) {
        const token = useCookie('token', {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })
        token.value = response.data.token
      }
      
      // Set user
      user.value = response.data.user
      
      $toast.add({
        severity: 'success',
        summary: 'Welcome!',
        detail: 'You have been logged in successfully',
        life: 3000
      })
      
      return response.data
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  // Register
  const register = async (data: RegisterData) => {
    isLoading.value = true
    
    try {
      await getCsrfCookie()
      
      const response = await post('/auth/register', data)
      
      // Auto-login after registration
      if (response.data.token) {
        const token = useCookie('token')
        token.value = response.data.token
        user.value = response.data.user
      }
      
      $toast.add({
        severity: 'success',
        summary: 'Account Created!',
        detail: 'Your account has been created successfully',
        life: 3000
      })
      
      return response.data
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  // Logout
  const logout = async () => {
    isLoading.value = true
    
    try {
      await post('/auth/logout')
      
      // Clear token
      const token = useCookie('token')
      token.value = null
      
      // Clear user
      user.value = null
      
      $toast.add({
        severity: 'info',
        summary: 'Logged Out',
        detail: 'You have been logged out successfully',
        life: 3000
      })
      
      // Redirect to login
      await navigateTo('/auth/login')
    } catch (error) {
      console.error('Logout failed:', error)
      // Clear state anyway
      user.value = null
      const token = useCookie('token')
      token.value = null
    } finally {
      isLoading.value = false
    }
  }
  
  // Get current user
  const fetchUser = async () => {
    if (isLoading.value) return
    
    isLoading.value = true
    
    try {
      const response = await get('/auth/user')
      user.value = response.data
      return response.data
    } catch (error) {
      console.error('Failed to fetch user:', error)
      user.value = null
      throw error
    } finally {
      isLoading.value = false
    }
  }
  
  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await post('/auth/refresh')
      
      if (response.data.token) {
        const token = useCookie('token')
        token.value = response.data.token
      }
      
      return response.data
    } catch (error) {
      console.error('Token refresh failed:', error)
      await logout()
      throw error
    }
  }
  
  // Password reset
  const requestPasswordReset = async (email: string) => {
    try {
      await getCsrfCookie()
      const response = await post('/auth/password/email', { email })
      
      $toast.add({
        severity: 'info',
        summary: 'Reset Link Sent',
        detail: 'Check your email for password reset instructions',
        life: 5000
      })
      
      return response.data
    } catch (error) {
      console.error('Password reset request failed:', error)
      throw error
    }
  }
  
  const resetPassword = async (data: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    try {
      await getCsrfCookie()
      const response = await post('/auth/password/reset', data)
      
      $toast.add({
        severity: 'success',
        summary: 'Password Reset',
        detail: 'Your password has been reset successfully',
        life: 3000
      })
      
      return response.data
    } catch (error) {
      console.error('Password reset failed:', error)
      throw error
    }
  }
  
  // Initialize auth state
  const init = async () => {
    const token = useCookie('token')
    if (token.value && !user.value) {
      try {
        await fetchUser()
      } catch (error) {
        // Token might be expired, clear it
        token.value = null
      }
    }
  }
  
  return {
    user: readonly(user),
    isAuthenticated,
    isLoading: readonly(isLoading),
    login,
    register,
    logout,
    fetchUser,
    refreshToken,
    requestPasswordReset,
    resetPassword,
    init
  }
}
```

## 🗂️ Resource Management

### 1. Generic Resource Composable

Create `composables/useResource.ts`:

```typescript
interface ResourceOptions {
  baseUrl: string
  transform?: (data: any) => any
  cache?: boolean
  revalidate?: number
}

export const useResource = <T>(options: ResourceOptions) => {
  const { get, post, put, patch, delete: del } = useApi()
  
  // State
  const items = ref<T[]>([])
  const item = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const meta = ref<any>({})
  
  // Fetch all items
  const fetchAll = async (params?: Record<string, any>) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await get<T[]>(options.baseUrl, { params })
      
      items.value = options.transform 
        ? response.data.map(options.transform)
        : response.data
      
      meta.value = response.meta || {}
      
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Fetch single item
  const fetchOne = async (id: string | number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await get<T>(`${options.baseUrl}/${id}`)
      
      item.value = options.transform 
        ? options.transform(response.data)
        : response.data
      
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Create item
  const create = async (data: Partial<T>) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await post<T>(options.baseUrl, data)
      
      const newItem = options.transform 
        ? options.transform(response.data)
        : response.data
      
      items.value.unshift(newItem)
      item.value = newItem
      
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Update item
  const update = async (id: string | number, data: Partial<T>) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await put<T>(`${options.baseUrl}/${id}`, data)
      
      const updatedItem = options.transform 
        ? options.transform(response.data)
        : response.data
      
      // Update in items array
      const index = items.value.findIndex((item: any) => item.id === id)
      if (index !== -1) {
        items.value[index] = updatedItem
      }
      
      item.value = updatedItem
      
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Delete item
  const remove = async (id: string | number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await del(`${options.baseUrl}/${id}`)
      
      // Remove from items array
      const index = items.value.findIndex((item: any) => item.id === id)
      if (index !== -1) {
        items.value.splice(index, 1)
      }
      
      // Clear item if it was the deleted one
      if (item.value && (item.value as any).id === id) {
        item.value = null
      }
      
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }
  
  // Refresh current data
  const refresh = async () => {
    if (items.value.length > 0) {
      await fetchAll()
    }
    if (item.value) {
      await fetchOne((item.value as any).id)
    }
  }
  
  // Reset state
  const reset = () => {
    items.value = []
    item.value = null
    error.value = null
    meta.value = {}
  }
  
  return {
    items: readonly(items),
    item: readonly(item),
    loading: readonly(loading),
    error: readonly(error),
    meta: readonly(meta),
    fetchAll,
    fetchOne,
    create,
    update,
    remove,
    refresh,
    reset
  }
}
```

### 2. Specific Resource Examples

Create `composables/useUsers.ts`:

```typescript
import type { User } from '~/types'

export const useUsers = () => {
  const resource = useResource<User>({
    baseUrl: '/users',
    transform: (user: any) => ({
      ...user,
      full_name: `${user.first_name} ${user.last_name}`,
      avatar_url: user.avatar ? `/storage/${user.avatar}` : '/default-avatar.png'
    })
  })
  
  // Custom methods
  const updateProfile = async (id: string | number, data: Partial<User>) => {
    return resource.update(id, data)
  }
  
  const uploadAvatar = async (id: string | number, file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    
    const { post } = useApi()
    return post(`/users/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  
  const changePassword = async (id: string | number, data: {
    current_password: string
    password: string
    password_confirmation: string
  }) => {
    const { post } = useApi()
    return post(`/users/${id}/password`, data)
  }
  
  return {
    ...resource,
    updateProfile,
    uploadAvatar,
    changePassword
  }
}
```

Create `composables/useProducts.ts`:

```typescript
import type { Product } from '~/types'

export const useProducts = () => {
  const resource = useResource<Product>({
    baseUrl: '/products',
    transform: (product: any) => ({
      ...product,
      price_formatted: `$${product.price.toFixed(2)}`,
      image_url: product.image ? `/storage/${product.image}` : '/placeholder.jpg'
    })
  })
  
  // Category-specific methods
  const fetchByCategory = async (categoryId: string | number) => {
    const { get } = useApi()
    return get<Product[]>(`/products/category/${categoryId}`)
  }
  
  const search = async (query: string, filters?: Record<string, any>) => {
    const { get } = useApi()
    return get<Product[]>('/products/search', {
      params: { q: query, ...filters }
    })
  }
  
  const getFeatured = async () => {
    const { get } = useApi()
    return get<Product[]>('/products/featured')
  }
  
  return {
    ...resource,
    fetchByCategory,
    search,
    getFeatured
  }
}
```

## 🔄 Real-time Updates

### 1. WebSocket Integration

Create `composables/useWebSocket.ts`:

```typescript
export const useWebSocket = () => {
  const socket = ref<WebSocket | null>(null)
  const isConnected = ref(false)
  const lastMessage = ref<any>(null)
  const config = useRuntimeConfig()
  
  const connect = () => {
    const wsUrl = config.public.wsUrl || 'ws://localhost:6001'
    socket.value = new WebSocket(wsUrl)
    
    socket.value.onopen = () => {
      isConnected.value = true
      console.log('WebSocket connected')
    }
    
    socket.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      lastMessage.value = data
      
      // Handle different message types
      switch (data.type) {
        case 'user.updated':
          // Handle user update
          break
        case 'product.created':
          // Handle product creation
          break
        case 'notification':
          // Handle notification
          const { $toast } = useNuxtApp()
          $toast.add({
            severity: data.severity || 'info',
            summary: data.title,
            detail: data.message,
            life: 5000
          })
          break
      }
    }
    
    socket.value.onclose = () => {
      isConnected.value = false
      console.log('WebSocket disconnected')
      
      // Reconnect after 5 seconds
      setTimeout(connect, 5000)
    }
    
    socket.value.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }
  
  const disconnect = () => {
    if (socket.value) {
      socket.value.close()
      socket.value = null
    }
  }
  
  const send = (data: any) => {
    if (socket.value && isConnected.value) {
      socket.value.send(JSON.stringify(data))
    }
  }
  
  // Auto-connect on mount
  onMounted(() => {
    connect()
  })
  
  // Auto-disconnect on unmount
  onUnmounted(() => {
    disconnect()
  })
  
  return {
    socket: readonly(socket),
    isConnected: readonly(isConnected),
    lastMessage: readonly(lastMessage),
    connect,
    disconnect,
    send
  }
}
```

### 2. Server-Sent Events

Create `composables/useSSE.ts`:

```typescript
export const useSSE = (endpoint: string) => {
  const eventSource = ref<EventSource | null>(null)
  const isConnected = ref(false)
  const lastEvent = ref<any>(null)
  const config = useRuntimeConfig()
  
  const connect = () => {
    const url = `${config.public.apiBase}${endpoint}`
    eventSource.value = new EventSource(url, {
      withCredentials: true
    })
    
    eventSource.value.onopen = () => {
      isConnected.value = true
      console.log('SSE connected')
    }
    
    eventSource.value.onmessage = (event) => {
      const data = JSON.parse(event.data)
      lastEvent.value = data
    }
    
    eventSource.value.onerror = (error) => {
      console.error('SSE error:', error)
      isConnected.value = false
    }
  }
  
  const disconnect = () => {
    if (eventSource.value) {
      eventSource.value.close()
      eventSource.value = null
      isConnected.value = false
    }
  }
  
  const addEventListener = (eventType: string, callback: (data: any) => void) => {
    if (eventSource.value) {
      eventSource.value.addEventListener(eventType, (event: any) => {
        const data = JSON.parse(event.data)
        callback(data)
      })
    }
  }
  
  onMounted(() => {
    connect()
  })
  
  onUnmounted(() => {
    disconnect()
  })
  
  return {
    eventSource: readonly(eventSource),
    isConnected: readonly(isConnected),
    lastEvent: readonly(lastEvent),
    connect,
    disconnect,
    addEventListener
  }
}
```

## 🔍 Data Caching

### 1. Simple Cache Implementation

Create `composables/useCache.ts`:

```typescript
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

export const useCache = () => {
  const cache = ref<Map<string, CacheEntry<any>>>(new Map())
  
  const set = <T>(key: string, data: T, ttl: number = 5 * 60 * 1000) => {
    cache.value.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }
  
  const get = <T>(key: string): T | null => {
    const entry = cache.value.get(key)
    
    if (!entry) return null
    
    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      cache.value.delete(key)
      return null
    }
    
    return entry.data
  }
  
  const has = (key: string): boolean => {
    return cache.value.has(key)
  }
  
  const remove = (key: string) => {
    cache.value.delete(key)
  }
  
  const clear = () => {
    cache.value.clear()
  }
  
  const invalidate = (pattern: string) => {
    const regex = new RegExp(pattern)
    for (const key of cache.value.keys()) {
      if (regex.test(key)) {
        cache.value.delete(key)
      }
    }
  }
  
  return {
    set,
    get,
    has,
    remove,
    clear,
    invalidate
  }
}
```

### 2. Cached API Calls

Create `composables/useCachedApi.ts`:

```typescript
export const useCachedApi = () => {
  const { get, post, put, patch, delete: del } = useApi()
  const cache = useCache()
  
  const cachedGet = async <T>(
    url: string,
    options?: any,
    ttl: number = 5 * 60 * 1000
  ): Promise<T> => {
    const cacheKey = `${url}:${JSON.stringify(options)}`
    
    // Check cache first
    const cached = cache.get<T>(cacheKey)
    if (cached) {
      return cached
    }
    
    // Fetch from API
    const response = await get<T>(url, options)
    
    // Cache the response
    cache.set(cacheKey, response, ttl)
    
    return response
  }
  
  const invalidateCache = (pattern: string) => {
    cache.invalidate(pattern)
  }
  
  return {
    cachedGet,
    invalidateCache,
    post,
    put,
    patch,
    delete: del
  }
}
```

## 🔧 Plugin Setup

Create `plugins/api.client.ts`:

```typescript
export default defineNuxtPlugin(async () => {
  const { init } = useAuth()
  
  // Initialize authentication state
  await init()
  
  // Setup global error handler
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
  })
})
```

## 🧪 Testing API Integration

Create `tests/composables/useApi.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useApi } from '~/composables/useApi'

// Mock ofetch
vi.mock('ofetch')

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  
  it('should make GET request', async () => {
    const { get } = useApi()
    
    const mockResponse = { data: { id: 1, name: 'Test' } }
    vi.mocked(ofetch).mockResolvedValue(mockResponse)
    
    const result = await get('/test')
    
    expect(result).toEqual(mockResponse)
    expect(ofetch).toHaveBeenCalledWith('/test', {
      method: 'GET'
    })
  })
  
  it('should make POST request with data', async () => {
    const { post } = useApi()
    
    const mockResponse = { data: { id: 1, name: 'Created' } }
    const postData = { name: 'Test' }
    
    vi.mocked(ofetch).mockResolvedValue(mockResponse)
    
    const result = await post('/test', postData)
    
    expect(result).toEqual(mockResponse)
    expect(ofetch).toHaveBeenCalledWith('/test', {
      method: 'POST',
      body: postData
    })
  })
  
  it('should handle API errors', async () => {
    const { get } = useApi()
    
    const mockError = new Error('API Error')
    vi.mocked(ofetch).mockRejectedValue(mockError)
    
    await expect(get('/test')).rejects.toThrow('API Error')
  })
})
```

## 🚀 Best Practices

### 1. Error Handling

- Always wrap API calls in try-catch blocks
- Provide meaningful error messages to users
- Log errors for debugging in development
- Use loading states for better UX

### 2. Performance

- Implement caching for frequently accessed data
- Use pagination for large data sets
- Debounce search inputs
- Implement optimistic updates where appropriate

### 3. Security

- Always validate data on both client and server
- Use HTTPS in production
- Implement proper CSRF protection
- Handle authentication tokens securely

### 4. Type Safety

- Define TypeScript interfaces for all API responses
- Use generic types for reusable functions
- Validate response data structure

## 🔗 Next Steps

1. [Authentication Setup](./authentication.md) - Complete auth implementation
2. [Form Handling](./form-handling.md) - API-integrated forms
3. [State Management](./state-management.md) - Manage API state
4. [Performance](./performance.md) - Optimize API calls

---

**API integration complete!** 🎉 Your application is now ready to communicate with your Laravel backend. 