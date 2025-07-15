# Component Examples

## 🎯 Overview

This document provides practical examples of how to use the components in this Nuxt 3 boilerplate. Each example includes complete code snippets that you can copy and use in your application.

## 🔘 Basic UI Components

### 1. Buttons

```vue
<template>
  <div class="space-y-6">
    <!-- Primary Buttons -->
    <div class="space-x-4">
      <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warning" severity="warning" />
      <Button label="Danger" severity="danger" />
    </div>

    <!-- Button Variants -->
    <div class="space-x-4">
      <Button label="Outlined" outlined />
      <Button label="Text" text />
      <Button label="Raised" raised />
      <Button label="Rounded" rounded />
    </div>

    <!-- Button with Icons -->
    <div class="space-x-4">
      <Button label="Save" icon="pi pi-save" />
      <Button label="Delete" icon="pi pi-trash" severity="danger" />
      <Button 
        label="Download" 
        icon="pi pi-download" 
        icon-pos="right"
        @click="downloadFile"
      />
    </div>

    <!-- Loading States -->
    <div class="space-x-4">
      <Button 
        label="Loading..." 
        :loading="isLoading"
        @click="simulateLoading"
      />
      <Button 
        label="Submit" 
        :loading="submitting"
        :disabled="!isValid"
        @click="handleSubmit"
      />
    </div>

    <!-- Icon Only Buttons -->
    <div class="space-x-4">
      <Button icon="pi pi-search" rounded />
      <Button icon="pi pi-heart" severity="danger" rounded />
      <Button icon="pi pi-share-alt" severity="info" rounded />
    </div>
  </div>
</template>

<script setup>
const isLoading = ref(false)
const submitting = ref(false)
const isValid = ref(true)

const downloadFile = () => {
  console.log('Downloading file...')
}

const simulateLoading = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
}

const handleSubmit = async () => {
  submitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  submitting.value = false
}
</script>
```

### 2. Form Components

```vue
<template>
  <div class="max-w-2xl mx-auto p-6">
    <Card>
      <template #header>
        <h2 class="text-2xl font-bold">Contact Form</h2>
      </template>
      
      <template #content>
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Text Input -->
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium">
              Full Name *
            </label>
            <InputText
              id="name"
              v-model="form.name"
              placeholder="Enter your full name"
              :class="{ 'p-invalid': errors.name }"
            />
            <small v-if="errors.name" class="text-red-500">
              {{ errors.name }}
            </small>
          </div>

          <!-- Email Input -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium">
              Email Address *
            </label>
            <InputText
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Enter your email"
              :class="{ 'p-invalid': errors.email }"
            />
            <small v-if="errors.email" class="text-red-500">
              {{ errors.email }}
            </small>
          </div>

          <!-- Phone Input -->
          <div class="space-y-2">
            <label for="phone" class="block text-sm font-medium">
              Phone Number
            </label>
            <InputText
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          <!-- Dropdown -->
          <div class="space-y-2">
            <label for="country" class="block text-sm font-medium">
              Country *
            </label>
            <Dropdown
              id="country"
              v-model="form.country"
              :options="countries"
              option-label="name"
              option-value="code"
              placeholder="Select your country"
              :class="{ 'p-invalid': errors.country }"
            />
            <small v-if="errors.country" class="text-red-500">
              {{ errors.country }}
            </small>
          </div>

          <!-- Textarea -->
          <div class="space-y-2">
            <label for="message" class="block text-sm font-medium">
              Message *
            </label>
            <Textarea
              id="message"
              v-model="form.message"
              rows="4"
              placeholder="Enter your message"
              :class="{ 'p-invalid': errors.message }"
            />
            <small v-if="errors.message" class="text-red-500">
              {{ errors.message }}
            </small>
          </div>

          <!-- Multi-select -->
          <div class="space-y-2">
            <label for="interests" class="block text-sm font-medium">
              Areas of Interest
            </label>
            <MultiSelect
              id="interests"
              v-model="form.interests"
              :options="interests"
              option-label="label"
              option-value="value"
              placeholder="Select your interests"
              display="chip"
            />
          </div>

          <!-- Checkbox -->
          <div class="flex items-center space-x-2">
            <Checkbox
              id="subscribe"
              v-model="form.subscribe"
              :binary="true"
            />
            <label for="subscribe" class="text-sm">
              Subscribe to newsletter
            </label>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end space-x-4">
            <Button
              label="Reset"
              severity="secondary"
              outlined
              @click="resetForm"
            />
            <Button
              label="Submit"
              type="submit"
              :loading="submitting"
              :disabled="!isFormValid"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// Form data
const form = reactive({
  name: '',
  email: '',
  phone: '',
  country: '',
  message: '',
  interests: [],
  subscribe: false
})

// Form validation
const errors = reactive({
  name: '',
  email: '',
  country: '',
  message: ''
})

// Form state
const submitting = ref(false)

// Options
const countries = ref([
  { name: 'United States', code: 'US' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'United Kingdom', code: 'GB' }
])

const interests = ref([
  { label: 'Technology', value: 'tech' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Development', value: 'development' },
  { label: 'Business', value: 'business' }
])

// Computed
const isFormValid = computed(() => {
  return form.name && form.email && form.country && form.message
})

// Methods
const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  // Validate required fields
  if (!form.name) errors.name = 'Name is required'
  if (!form.email) errors.email = 'Email is required'
  if (!form.country) errors.country = 'Country is required'
  if (!form.message) errors.message = 'Message is required'

  // Validate email format
  if (form.email && !isValidEmail(form.email)) {
    errors.email = 'Please enter a valid email address'
  }

  return Object.values(errors).every(error => !error)
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const submitForm = async () => {
  if (!validateForm()) return

  submitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Form submitted successfully!',
      life: 3000
    })

    resetForm()
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to submit form. Please try again.',
      life: 5000
    })
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  Object.assign(form, {
    name: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    interests: [],
    subscribe: false
  })
  
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
}
</script>
```

### 3. Data Display Components

```vue
<template>
  <div class="space-y-8">
    <!-- Data Table -->
    <Card>
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Users</h3>
          <div class="flex space-x-2">
            <InputText
              v-model="filters.global.value"
              placeholder="Search users..."
              class="w-64"
            />
            <Button
              label="Add User"
              icon="pi pi-plus"
              @click="showAddUserDialog = true"
            />
          </div>
        </div>
      </template>

      <template #content>
        <DataTable
          :value="users"
          :paginator="true"
          :rows="10"
          :loading="loading"
          :filters="filters"
          data-key="id"
          :global-filter-fields="['name', 'email', 'role']"
          class="p-datatable-sm"
        >
          <Column field="id" header="ID" sortable style="width: 80px" />
          
          <Column field="name" header="Name" sortable>
            <template #body="slotProps">
              <div class="flex items-center space-x-3">
                <Avatar
                  :image="slotProps.data.avatar"
                  :label="slotProps.data.name.charAt(0)"
                  shape="circle"
                />
                <div>
                  <div class="font-medium">{{ slotProps.data.name }}</div>
                  <div class="text-sm text-gray-500">{{ slotProps.data.email }}</div>
                </div>
              </div>
            </template>
          </Column>

          <Column field="role" header="Role" sortable>
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.role"
                :severity="getRoleSeverity(slotProps.data.role)"
              />
            </template>
          </Column>

          <Column field="status" header="Status" sortable>
            <template #body="slotProps">
              <Tag
                :value="slotProps.data.status"
                :severity="getStatusSeverity(slotProps.data.status)"
              />
            </template>
          </Column>

          <Column field="created_at" header="Created" sortable>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.created_at) }}
            </template>
          </Column>

          <Column header="Actions" style="width: 120px">
            <template #body="slotProps">
              <div class="flex space-x-2">
                <Button
                  icon="pi pi-eye"
                  size="small"
                  severity="info"
                  @click="viewUser(slotProps.data)"
                />
                <Button
                  icon="pi pi-pencil"
                  size="small"
                  @click="editUser(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  size="small"
                  severity="danger"
                  @click="confirmDelete(slotProps.data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="product in products" :key="product.id" class="overflow-hidden">
        <template #header>
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-48 object-cover"
          />
        </template>

        <template #title>
          {{ product.name }}
        </template>

        <template #subtitle>
          {{ product.category }}
        </template>

        <template #content>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ product.description }}
          </p>

          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-primary-600">
              ${{ product.price }}
            </span>
            <Rating
              v-model="product.rating"
              :readonly="true"
              :cancel="false"
            />
          </div>
        </template>

        <template #footer>
          <div class="flex space-x-2">
            <Button
              label="Add to Cart"
              icon="pi pi-shopping-cart"
              class="flex-1"
              @click="addToCart(product)"
            />
            <Button
              icon="pi pi-heart"
              severity="secondary"
              outlined
              @click="addToWishlist(product)"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card v-for="stat in stats" :key="stat.title" class="text-center">
        <template #content>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-primary-600">
              {{ stat.value }}
            </div>
            <div class="text-sm text-gray-500">
              {{ stat.title }}
            </div>
            <div class="flex items-center justify-center space-x-1">
              <i
                :class="[stat.trend === 'up' ? 'pi-arrow-up text-green-500' : 'pi-arrow-down text-red-500']"
                class="pi text-xs"
              />
              <span
                :class="[stat.trend === 'up' ? 'text-green-500' : 'text-red-500']"
                class="text-xs"
              >
                {{ stat.change }}%
              </span>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Add User Dialog -->
    <Dialog
      v-model:visible="showAddUserDialog"
      modal
      header="Add New User"
      style="width: 450px"
    >
      <div class="space-y-4">
        <div>
          <label for="userName" class="block text-sm font-medium mb-2">
            Name
          </label>
          <InputText
            id="userName"
            v-model="newUser.name"
            placeholder="Enter user name"
            class="w-full"
          />
        </div>

        <div>
          <label for="userEmail" class="block text-sm font-medium mb-2">
            Email
          </label>
          <InputText
            id="userEmail"
            v-model="newUser.email"
            type="email"
            placeholder="Enter user email"
            class="w-full"
          />
        </div>

        <div>
          <label for="userRole" class="block text-sm font-medium mb-2">
            Role
          </label>
          <Dropdown
            id="userRole"
            v-model="newUser.role"
            :options="roles"
            option-label="label"
            option-value="value"
            placeholder="Select role"
            class="w-full"
          />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button
            label="Cancel"
            severity="secondary"
            outlined
            @click="showAddUserDialog = false"
          />
          <Button
            label="Save"
            @click="saveUser"
            :loading="savingUser"
          />
        </div>
      </template>
    </Dialog>

    <!-- Confirmation Dialog -->
    <ConfirmDialog />
    
    <!-- Toast -->
    <Toast />
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { FilterMatchMode } from 'primevue/api'

const toast = useToast()
const confirm = useConfirm()

// Data
const loading = ref(false)
const showAddUserDialog = ref(false)
const savingUser = ref(false)

// Filters
const filters = reactive({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

// Users data
const users = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    avatar: '/api/placeholder/32/32',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'inactive',
    avatar: '/api/placeholder/32/32',
    created_at: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'editor',
    status: 'active',
    avatar: '/api/placeholder/32/32',
    created_at: '2024-01-13T09:15:00Z'
  }
])

// Products data
const products = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 99.99,
    rating: 4,
    image: '/api/placeholder/300/200',
    description: 'High-quality wireless headphones with noise cancellation.'
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Electronics',
    price: 199.99,
    rating: 5,
    image: '/api/placeholder/300/200',
    description: 'Feature-rich smartwatch with health monitoring.'
  },
  {
    id: 3,
    name: 'Coffee Maker',
    category: 'Home',
    price: 79.99,
    rating: 4,
    image: '/api/placeholder/300/200',
    description: 'Programmable coffee maker with timer function.'
  }
])

// Statistics data
const stats = ref([
  { title: 'Total Users', value: '1,234', change: 12, trend: 'up' },
  { title: 'Active Orders', value: '567', change: 8, trend: 'up' },
  { title: 'Revenue', value: '$12,345', change: 5, trend: 'down' },
  { title: 'Conversion Rate', value: '3.45%', change: 15, trend: 'up' }
])

// New user form
const newUser = reactive({
  name: '',
  email: '',
  role: ''
})

// Role options
const roles = ref([
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'User', value: 'user' }
])

// Methods
const getRoleSeverity = (role) => {
  switch (role) {
    case 'admin': return 'danger'
    case 'editor': return 'warning'
    case 'user': return 'info'
    default: return 'secondary'
  }
}

const getStatusSeverity = (status) => {
  switch (status) {
    case 'active': return 'success'
    case 'inactive': return 'secondary'
    case 'pending': return 'warning'
    default: return 'info'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const viewUser = (user) => {
  toast.add({
    severity: 'info',
    summary: 'User Details',
    detail: `Viewing ${user.name}`,
    life: 3000
  })
}

const editUser = (user) => {
  toast.add({
    severity: 'info',
    summary: 'Edit User',
    detail: `Editing ${user.name}`,
    life: 3000
  })
}

const confirmDelete = (user) => {
  confirm.require({
    message: `Are you sure you want to delete ${user.name}?`,
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => {
      // Delete user logic
      toast.add({
        severity: 'success',
        summary: 'Deleted',
        detail: `${user.name} has been deleted`,
        life: 3000
      })
    }
  })
}

const addToCart = (product) => {
  toast.add({
    severity: 'success',
    summary: 'Added to Cart',
    detail: `${product.name} added to cart`,
    life: 3000
  })
}

const addToWishlist = (product) => {
  toast.add({
    severity: 'info',
    summary: 'Added to Wishlist',
    detail: `${product.name} added to wishlist`,
    life: 3000
  })
}

const saveUser = async () => {
  if (!newUser.name || !newUser.email || !newUser.role) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields',
      life: 3000
    })
    return
  }

  savingUser.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Add user to list
    users.value.push({
      id: users.value.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      avatar: '/api/placeholder/32/32',
      created_at: new Date().toISOString()
    })

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'User created successfully',
      life: 3000
    })

    // Reset form
    Object.assign(newUser, {
      name: '',
      email: '',
      role: ''
    })

    showAddUserDialog.value = false
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to create user',
      life: 3000
    })
  } finally {
    savingUser.value = false
  }
}
</script>
```

## 🔗 Navigation Components

### 1. Header with Navigation

```vue
<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b">
    <div class="container mx-auto px-4">
      <Menubar :model="menuItems" class="border-none bg-transparent">
        <template #start>
          <NuxtLink to="/" class="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" class="h-8 w-8">
            <span class="text-xl font-bold text-primary-600">
              {{ $runtimeConfig.public.appName }}
            </span>
          </NuxtLink>
        </template>

        <template #end>
          <div class="flex items-center space-x-4">
            <!-- Language Selector -->
            <Dropdown
              v-model="currentLocale"
              :options="availableLocales"
              option-label="name"
              option-value="code"
              class="w-32"
              @change="changeLocale"
            />

            <!-- Theme Toggle -->
            <Button
              :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
              severity="secondary"
              text
              @click="toggleTheme"
            />

            <!-- Notifications -->
            <Button
              icon="pi pi-bell"
              severity="secondary"
              text
              @click="toggleNotifications"
            />
            
            <!-- User Menu -->
            <div v-if="isAuthenticated">
              <Button
                :label="user.name"
                icon="pi pi-user"
                severity="secondary"
                text
                @click="toggleUserMenu"
              />
              
              <Menu
                ref="userMenu"
                :model="userMenuItems"
                :popup="true"
              />
            </div>
            
            <!-- Login Button -->
            <Button
              v-else
              label="Login"
              @click="$router.push('/auth/login')"
            />
          </div>
        </template>
      </Menubar>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { useThemeStore } from '~/stores/theme'

const { locale, locales } = useI18n()
const authStore = useAuthStore()
const themeStore = useThemeStore()

// Reactive data
const userMenu = ref()
const currentLocale = ref(locale.value)

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const isDark = computed(() => themeStore.isDark)
const availableLocales = computed(() => 
  locales.value.map(locale => ({
    code: locale.code,
    name: locale.name
  }))
)

// Menu items
const menuItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    route: '/'
  },
  {
    label: 'Products',
    icon: 'pi pi-shopping-bag',
    items: [
      {
        label: 'All Products',
        route: '/products'
      },
      {
        label: 'Categories',
        route: '/categories'
      },
      {
        label: 'Brands',
        route: '/brands'
      }
    ]
  },
  {
    label: 'Services',
    icon: 'pi pi-cog',
    items: [
      {
        label: 'Consulting',
        route: '/services/consulting'
      },
      {
        label: 'Support',
        route: '/services/support'
      }
    ]
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    route: '/about'
  },
  {
    label: 'Contact',
    icon: 'pi pi-envelope',
    route: '/contact'
  }
])

const userMenuItems = ref([
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: () => navigateTo('/profile')
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    command: () => navigateTo('/settings')
  },
  {
    label: 'Orders',
    icon: 'pi pi-shopping-cart',
    command: () => navigateTo('/orders')
  },
  {
    separator: true
  },
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => authStore.logout()
  }
])

// Methods
const changeLocale = (event) => {
  const newLocale = event.value
  const router = useRouter()
  
  router.push({
    path: router.currentRoute.value.path,
    query: { ...router.currentRoute.value.query, locale: newLocale }
  })
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const toggleNotifications = () => {
  // Handle notifications
}

const toggleUserMenu = (event) => {
  userMenu.value.toggle(event)
}
</script>
```

### 2. Sidebar Navigation

```vue
<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between p-4 border-b">
        <div class="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" class="h-8 w-8">
          <span class="text-lg font-semibold">Dashboard</span>
        </div>
        <Button
          icon="pi pi-times"
          severity="secondary"
          text
          @click="sidebarOpen = false"
        />
      </div>

      <!-- Navigation Menu -->
      <nav class="p-4">
        <div class="space-y-2">
          <div v-for="item in navigationItems" :key="item.label">
            <!-- Single Menu Item -->
            <NuxtLink
              v-if="!item.items"
              :to="item.route"
              class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :class="{ 'bg-primary-50 text-primary-600 dark:bg-primary-900': isActiveRoute(item.route) }"
            >
              <i :class="item.icon" class="text-lg" />
              <span>{{ item.label }}</span>
            </NuxtLink>

            <!-- Menu Item with Submenu -->
            <div v-else>
              <button
                @click="toggleSubmenu(item.label)"
                class="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <i :class="item.icon" class="text-lg" />
                  <span>{{ item.label }}</span>
                </div>
                <i 
                  :class="[
                    'pi pi-chevron-down transition-transform',
                    openSubmenus.includes(item.label) ? 'rotate-180' : ''
                  ]"
                />
              </button>

              <!-- Submenu -->
              <div
                v-show="openSubmenus.includes(item.label)"
                class="ml-6 mt-2 space-y-1"
              >
                <NuxtLink
                  v-for="subItem in item.items"
                  :key="subItem.label"
                  :to="subItem.route"
                  class="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  :class="{ 'bg-primary-50 text-primary-600 dark:bg-primary-900': isActiveRoute(subItem.route) }"
                >
                  <i :class="subItem.icon" class="text-sm" />
                  <span class="text-sm">{{ subItem.label }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div class="flex items-center space-x-3">
          <Avatar
            :image="user?.avatar"
            :label="user?.name?.charAt(0)"
            shape="circle"
          />
          <div class="flex-1">
            <div class="text-sm font-medium">{{ user?.name }}</div>
            <div class="text-xs text-gray-500">{{ user?.email }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      <!-- Top Bar -->
      <header class="bg-white dark:bg-gray-800 shadow-sm border-b p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <Button
              icon="pi pi-bars"
              severity="secondary"
              text
              @click="sidebarOpen = !sidebarOpen"
            />
            
            <Breadcrumb :model="breadcrumbItems" />
          </div>

          <div class="flex items-center space-x-4">
            <InputText
              v-model="searchQuery"
              placeholder="Search..."
              class="w-64"
            />
            
            <Button
              icon="pi pi-bell"
              severity="secondary"
              text
              @click="showNotifications"
            />
            
            <Button
              icon="pi pi-cog"
              severity="secondary"
              text
              @click="showSettings"
            />
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="sidebarOpen = false"
    />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const route = useRoute()

// Reactive data
const sidebarOpen = ref(false)
const searchQuery = ref('')
const openSubmenus = ref(['Dashboard'])

// Computed
const user = computed(() => authStore.user)
const breadcrumbItems = computed(() => {
  const items = [
    { label: 'Dashboard', route: '/dashboard' }
  ]
  
  // Add current route breadcrumbs
  const pathSegments = route.path.split('/').filter(Boolean)
  pathSegments.forEach((segment, index) => {
    if (index > 0) {
      items.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        route: '/' + pathSegments.slice(0, index + 1).join('/')
      })
    }
  })
  
  return items
})

// Navigation items
const navigationItems = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/dashboard'
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    items: [
      {
        label: 'All Users',
        icon: 'pi pi-list',
        route: '/dashboard/users'
      },
      {
        label: 'Add User',
        icon: 'pi pi-plus',
        route: '/dashboard/users/create'
      },
      {
        label: 'User Roles',
        icon: 'pi pi-shield',
        route: '/dashboard/users/roles'
      }
    ]
  },
  {
    label: 'Products',
    icon: 'pi pi-shopping-bag',
    items: [
      {
        label: 'All Products',
        icon: 'pi pi-list',
        route: '/dashboard/products'
      },
      {
        label: 'Add Product',
        icon: 'pi pi-plus',
        route: '/dashboard/products/create'
      },
      {
        label: 'Categories',
        icon: 'pi pi-tags',
        route: '/dashboard/products/categories'
      }
    ]
  },
  {
    label: 'Orders',
    icon: 'pi pi-shopping-cart',
    route: '/dashboard/orders'
  },
  {
    label: 'Analytics',
    icon: 'pi pi-chart-bar',
    items: [
      {
        label: 'Overview',
        icon: 'pi pi-eye',
        route: '/dashboard/analytics'
      },
      {
        label: 'Sales',
        icon: 'pi pi-dollar',
        route: '/dashboard/analytics/sales'
      },
      {
        label: 'Traffic',
        icon: 'pi pi-users',
        route: '/dashboard/analytics/traffic'
      }
    ]
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    items: [
      {
        label: 'General',
        icon: 'pi pi-sliders-h',
        route: '/dashboard/settings'
      },
      {
        label: 'Security',
        icon: 'pi pi-shield',
        route: '/dashboard/settings/security'
      },
      {
        label: 'Notifications',
        icon: 'pi pi-bell',
        route: '/dashboard/settings/notifications'
      }
    ]
  }
])

// Methods
const isActiveRoute = (routePath) => {
  return route.path === routePath
}

const toggleSubmenu = (label) => {
  const index = openSubmenus.value.indexOf(label)
  if (index > -1) {
    openSubmenus.value.splice(index, 1)
  } else {
    openSubmenus.value.push(label)
  }
}

const showNotifications = () => {
  // Handle notifications
}

const showSettings = () => {
  navigateTo('/dashboard/settings')
}

// Handle responsive behavior
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      sidebarOpen.value = true
    } else {
      sidebarOpen.value = false
    }
  }

  window.addEventListener('resize', handleResize)
  handleResize()

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>
```

## 🎨 Layout Examples

### 1. Dashboard Layout

```vue
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Dashboard Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ pageTitle }}
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              {{ pageDescription }}
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <Button
              label="Export"
              icon="pi pi-download"
              severity="secondary"
              outlined
              @click="exportData"
            />
            
            <Button
              label="New Item"
              icon="pi pi-plus"
              @click="createNew"
            />
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <Card class="sticky top-6">
            <template #header>
              <h3 class="text-lg font-semibold p-4 pb-0">Quick Actions</h3>
            </template>
            
            <template #content>
              <div class="space-y-2">
                <Button
                  label="Create User"
                  icon="pi pi-user-plus"
                  text
                  class="w-full justify-start"
                  @click="createUser"
                />
                <Button
                  label="Import Data"
                  icon="pi pi-upload"
                  text
                  class="w-full justify-start"
                  @click="importData"
                />
                <Button
                  label="Generate Report"
                  icon="pi pi-file-pdf"
                  text
                  class="w-full justify-start"
                  @click="generateReport"
                />
                <Button
                  label="Settings"
                  icon="pi pi-cog"
                  text
                  class="w-full justify-start"
                  @click="openSettings"
                />
              </div>
            </template>
          </Card>
        </aside>

        <!-- Main Content Area -->
        <div class="lg:col-span-3">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// Props
interface Props {
  pageTitle?: string
  pageDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  pageTitle: 'Dashboard',
  pageDescription: 'Manage your application'
})

// Methods
const exportData = () => {
  toast.add({
    severity: 'info',
    summary: 'Export Started',
    detail: 'Data export is being prepared',
    life: 3000
  })
}

const createNew = () => {
  // Handle create new item
}

const createUser = () => {
  navigateTo('/dashboard/users/create')
}

const importData = () => {
  // Handle data import
}

const generateReport = () => {
  // Handle report generation
}

const openSettings = () => {
  navigateTo('/dashboard/settings')
}
</script>
```

### 2. Authentication Layout

```vue
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="/logo.png" alt="Logo" class="mx-auto h-16 w-16 mb-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ $runtimeConfig.public.appName }}
        </h1>
      </div>

      <!-- Auth Card -->
      <Card class="shadow-lg">
        <template #content>
          <slot />
        </template>
        
        <template #footer>
          <div class="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              By continuing, you agree to our 
              <NuxtLink to="/terms" class="text-primary-600 hover:text-primary-700">
                Terms of Service
              </NuxtLink>
              and 
              <NuxtLink to="/privacy" class="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </NuxtLink>
            </p>
          </div>
        </template>
      </Card>

      <!-- Additional Links -->
      <div class="mt-6 text-center">
        <slot name="links" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Layout for authentication pages
useHead({
  title: 'Authentication',
  meta: [
    {
      name: 'description',
      content: 'Sign in to your account'
    }
  ]
})
</script>
```

## 📱 Responsive Design

### 1. Mobile-First Components

```vue
<template>
  <div class="responsive-card">
    <!-- Mobile View -->
    <div class="block md:hidden">
      <Card v-for="item in items" :key="item.id" class="mb-4">
        <template #content>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">{{ item.title }}</h3>
              <Tag :value="item.status" :severity="getStatusSeverity(item.status)" />
            </div>
            
            <p class="text-sm text-gray-600">{{ item.description }}</p>
            
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">
                {{ formatDate(item.created_at) }}
              </span>
              
              <div class="flex space-x-2">
                <Button icon="pi pi-eye" size="small" @click="view(item)" />
                <Button icon="pi pi-pencil" size="small" @click="edit(item)" />
                <Button icon="pi pi-trash" size="small" severity="danger" @click="remove(item)" />
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <!-- Desktop View -->
    <div class="hidden md:block">
      <DataTable
        :value="items"
        :paginator="true"
        :rows="10"
        :responsive-layout="scroll"
        class="p-datatable-sm"
      >
        <Column field="title" header="Title" sortable />
        <Column field="description" header="Description" />
        <Column field="status" header="Status" sortable>
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.status"
              :severity="getStatusSeverity(slotProps.data.status)"
            />
          </template>
        </Column>
        <Column field="created_at" header="Created" sortable>
          <template #body="slotProps">
            {{ formatDate(slotProps.data.created_at) }}
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <div class="flex space-x-2">
              <Button icon="pi pi-eye" size="small" @click="view(slotProps.data)" />
              <Button icon="pi pi-pencil" size="small" @click="edit(slotProps.data)" />
              <Button icon="pi pi-trash" size="small" severity="danger" @click="remove(slotProps.data)" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

// Methods
const getStatusSeverity = (status) => {
  switch (status) {
    case 'active': return 'success'
    case 'inactive': return 'secondary'
    case 'pending': return 'warning'
    default: return 'info'
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const view = (item) => {
  // Handle view
}

const edit = (item) => {
  // Handle edit
}

const remove = (item) => {
  // Handle remove
}
</script>

<style scoped>
.responsive-card {
  @apply w-full;
}

@screen md {
  .responsive-card {
    @apply max-w-none;
  }
}
</style>
```

These examples demonstrate:

1. **Basic UI Components**: Buttons, forms, inputs with proper styling and functionality
2. **Data Display**: Tables, cards, statistics with real-world data patterns
3. **Navigation**: Headers, sidebars, breadcrumbs with responsive design
4. **Layouts**: Dashboard and authentication layouts with proper structure
5. **Responsive Design**: Mobile-first approach with adaptive components

Each example includes:
- Complete Vue 3 Composition API syntax
- PrimeVue component integration
- Tailwind CSS styling
- TypeScript support
- Proper error handling
- Accessibility considerations
- Responsive design patterns

Copy and paste these examples into your project to get started quickly!

## 🔗 Next Steps

1. [Form Handling](../form-handling.md) - Advanced form patterns
2. [API Integration](../api-integration.md) - Connect to backend
3. [State Management](../state-management.md) - Manage application state
4. [Authentication](../authentication.md) - User authentication flow

---

**Component examples ready!** 🎉 Use these patterns to build consistent, professional components throughout your application. 