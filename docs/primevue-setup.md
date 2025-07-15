# PrimeVue Setup Guide

## 🎨 Overview

PrimeVue is a comprehensive UI component library offering 90+ production-ready components. This guide covers complete setup, theming, and advanced usage patterns.

## 📦 Installation & Configuration

### 1. Basic Setup

The boilerplate includes PrimeVue pre-configured, but here's how to set it up from scratch:

```bash
# Install PrimeVue and dependencies
npm install primevue @primevue/themes primeicons @primevue/nuxt-module
```

### 2. Nuxt Configuration

Update `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
    // ... other modules
  ],

  primevue: {
    options: {
      theme: {
        preset: 'Aura', // Available: Aura, Lara, Nora, Material, Bootstrap, Tailwind
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
      // Optional: Import specific components
      include: ['Button', 'InputText', 'DataTable', 'Dialog']
    }
  }
})
```

### 3. Global CSS Configuration

Add to `assets/css/main.css`:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* PrimeVue theme customization */
:root {
  /* Primary colors */
  --p-primary-50: #f0fdf4;
  --p-primary-100: #dcfce7;
  --p-primary-200: #bbf7d0;
  --p-primary-300: #86efac;
  --p-primary-400: #4ade80;
  --p-primary-500: #10b981;
  --p-primary-600: #059669;
  --p-primary-700: #047857;
  --p-primary-800: #065f46;
  --p-primary-900: #064e3b;
  --p-primary-950: #022c22;
  
  /* Surface colors */
  --p-surface-0: #ffffff;
  --p-surface-50: #f8fafc;
  --p-surface-100: #f1f5f9;
  --p-surface-200: #e2e8f0;
  --p-surface-300: #cbd5e1;
  --p-surface-400: #94a3b8;
  --p-surface-500: #64748b;
  --p-surface-600: #475569;
  --p-surface-700: #334155;
  --p-surface-800: #1e293b;
  --p-surface-900: #0f172a;
  --p-surface-950: #020617;
  
  /* Content colors */
  --p-content-primary: #0f172a;
  --p-content-secondary: #475569;
  --p-content-disabled: #cbd5e1;
  
  /* Border colors */
  --p-border-color: #e2e8f0;
  --p-border-hover: #cbd5e1;
  --p-border-focus: #10b981;
}

/* Dark mode theme */
.dark {
  --p-surface-0: #0f172a;
  --p-surface-50: #1e293b;
  --p-surface-100: #334155;
  --p-surface-200: #475569;
  --p-surface-300: #64748b;
  --p-surface-400: #94a3b8;
  --p-surface-500: #cbd5e1;
  --p-surface-600: #e2e8f0;
  --p-surface-700: #f1f5f9;
  --p-surface-800: #f8fafc;
  --p-surface-900: #ffffff;
  --p-surface-950: #ffffff;
  
  --p-content-primary: #f8fafc;
  --p-content-secondary: #cbd5e1;
  --p-content-disabled: #64748b;
  
  --p-border-color: #475569;
  --p-border-hover: #64748b;
  --p-border-focus: #10b981;
}

/* Custom component styles */
.p-button {
  @apply font-medium transition-all duration-200;
}

.p-button:hover {
  @apply shadow-lg;
}

.p-inputtext {
  @apply border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500;
}

.p-datatable {
  @apply border-gray-200 dark:border-gray-700;
}

.p-datatable .p-datatable-thead > tr > th {
  @apply bg-gray-50 dark:bg-gray-800;
}
```

## 🎯 Core Components Usage

### 1. Basic Form Components

```vue
<template>
  <div class="space-y-6">
    <!-- Input Field -->
    <div class="space-y-2">
      <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Email Address
      </label>
      <InputText 
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter your email"
        :class="{ 'p-invalid': errors.email }"
        class="w-full"
      />
      <small class="text-red-500">{{ errors.email }}</small>
    </div>

    <!-- Password Field -->
    <div class="space-y-2">
      <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Password
      </label>
      <Password 
        id="password"
        v-model="password"
        placeholder="Enter your password"
        :toggle-mask="true"
        :feedback="false"
        class="w-full"
      />
    </div>

    <!-- Dropdown -->
    <div class="space-y-2">
      <label for="country" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Country
      </label>
      <Dropdown 
        id="country"
        v-model="selectedCountry"
        :options="countries"
        option-label="name"
        option-value="code"
        placeholder="Select a country"
        class="w-full"
      />
    </div>

    <!-- Multi-Select -->
    <div class="space-y-2">
      <label for="skills" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Skills
      </label>
      <MultiSelect 
        id="skills"
        v-model="selectedSkills"
        :options="skills"
        option-label="name"
        option-value="id"
        placeholder="Select skills"
        class="w-full"
      />
    </div>

    <!-- Calendar -->
    <div class="space-y-2">
      <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Date of Birth
      </label>
      <Calendar 
        id="date"
        v-model="dateOfBirth"
        date-format="dd/mm/yy"
        :show-icon="true"
        placeholder="Select date"
        class="w-full"
      />
    </div>

    <!-- Checkbox -->
    <div class="flex items-center space-x-2">
      <Checkbox 
        id="terms"
        v-model="acceptTerms"
        :binary="true"
      />
      <label for="terms" class="text-sm text-gray-700 dark:text-gray-300">
        I accept the terms and conditions
      </label>
    </div>

    <!-- Radio Buttons -->
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Gender
      </label>
      <div class="flex space-x-4">
        <div class="flex items-center space-x-2">
          <RadioButton 
            id="male"
            v-model="gender"
            value="male"
          />
          <label for="male" class="text-sm">Male</label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioButton 
            id="female"
            v-model="gender"
            value="female"
          />
          <label for="female" class="text-sm">Female</label>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex space-x-4">
      <Button 
        label="Submit" 
        icon="pi pi-check"
        @click="handleSubmit"
        :loading="isLoading"
      />
      <Button 
        label="Reset" 
        icon="pi pi-refresh"
        severity="secondary"
        @click="resetForm"
      />
      <Button 
        label="Cancel" 
        icon="pi pi-times"
        severity="secondary"
        outlined
        @click="handleCancel"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form data
const email = ref('')
const password = ref('')
const selectedCountry = ref('')
const selectedSkills = ref([])
const dateOfBirth = ref('')
const acceptTerms = ref(false)
const gender = ref('')
const isLoading = ref(false)

// Form errors
const errors = reactive({
  email: '',
  password: ''
})

// Options
const countries = ref([
  { name: 'Turkey', code: 'TR' },
  { name: 'United States', code: 'US' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' }
])

const skills = ref([
  { id: 1, name: 'Vue.js' },
  { id: 2, name: 'React' },
  { id: 3, name: 'Angular' },
  { id: 4, name: 'Node.js' },
  { id: 5, name: 'Laravel' }
])

// Methods
const handleSubmit = async () => {
  isLoading.value = true
  // Validation and submission logic
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
}

const resetForm = () => {
  email.value = ''
  password.value = ''
  selectedCountry.value = ''
  selectedSkills.value = []
  dateOfBirth.value = ''
  acceptTerms.value = false
  gender.value = ''
}

const handleCancel = () => {
  navigateTo('/')
}
</script>
```

### 2. Data Display Components

```vue
<template>
  <div class="space-y-8">
    <!-- Data Table -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Users</h2>
      <DataTable 
        :value="users"
        :paginator="true"
        :rows="10"
        :loading="loading"
        data-key="id"
        :global-filter-fields="['name', 'email', 'country']"
        class="p-datatable-sm"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <h5>Manage Users</h5>
            <div class="flex space-x-2">
              <InputText 
                v-model="filters.global.value"
                placeholder="Search..."
                class="w-64"
              />
              <Button 
                label="Add User"
                icon="pi pi-plus"
                @click="openDialog"
              />
            </div>
          </div>
        </template>

        <Column field="name" header="Name" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="country" header="Country" sortable></Column>
        <Column field="status" header="Status" sortable>
          <template #body="slotProps">
            <Tag 
              :value="slotProps.data.status"
              :severity="getStatusSeverity(slotProps.data.status)"
            />
          </template>
        </Column>
        <Column field="actions" header="Actions">
          <template #body="slotProps">
            <div class="flex space-x-2">
              <Button 
                icon="pi pi-pencil"
                size="small"
                @click="editUser(slotProps.data)"
              />
              <Button 
                icon="pi pi-trash"
                size="small"
                severity="danger"
                @click="deleteUser(slotProps.data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Cards -->
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
          <p class="text-gray-600 dark:text-gray-400">
            {{ product.description }}
          </p>
          <div class="mt-4 flex items-center justify-between">
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

    <!-- Timeline -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Activity Timeline</h2>
      <Timeline :value="timeline" align="alternate" class="w-full">
        <template #marker="slotProps">
          <span 
            class="flex w-8 h-8 items-center justify-center text-white rounded-full shadow-lg"
            :class="getTimelineColor(slotProps.item.status)"
          >
            <i :class="slotProps.item.icon"></i>
          </span>
        </template>
        <template #content="slotProps">
          <Card class="mt-4">
            <template #title>
              {{ slotProps.item.title }}
            </template>
            <template #subtitle>
              {{ slotProps.item.date }}
            </template>
            <template #content>
              {{ slotProps.item.description }}
            </template>
          </Card>
        </template>
      </Timeline>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'

// Data
const loading = ref(true)
const users = ref([])
const products = ref([])
const timeline = ref([])

// Filters
const filters = reactive({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})

// Methods
const getStatusSeverity = (status) => {
  switch (status) {
    case 'active': return 'success'
    case 'inactive': return 'danger'
    case 'pending': return 'warning'
    default: return 'info'
  }
}

const getTimelineColor = (status) => {
  switch (status) {
    case 'success': return 'bg-green-500'
    case 'error': return 'bg-red-500'
    case 'warning': return 'bg-yellow-500'
    default: return 'bg-blue-500'
  }
}

const openDialog = () => {
  // Open user dialog
}

const editUser = (user) => {
  // Edit user logic
}

const deleteUser = (user) => {
  // Delete user logic
}

const addToCart = (product) => {
  // Add to cart logic
}

const addToWishlist = (product) => {
  // Add to wishlist logic
}

// Load data
onMounted(async () => {
  // Simulate API calls
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  users.value = [
    { id: 1, name: 'John Doe', email: 'john@example.com', country: 'USA', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', country: 'Canada', status: 'inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', country: 'UK', status: 'pending' }
  ]
  
  products.value = [
    { id: 1, name: 'Product 1', category: 'Electronics', price: 99.99, rating: 4, image: '/api/placeholder/300/200', description: 'Great product description' },
    { id: 2, name: 'Product 2', category: 'Clothing', price: 49.99, rating: 5, image: '/api/placeholder/300/200', description: 'Another great product' },
    { id: 3, name: 'Product 3', category: 'Home', price: 79.99, rating: 3, image: '/api/placeholder/300/200', description: 'Useful home product' }
  ]
  
  timeline.value = [
    { title: 'Order Placed', date: '2024-01-15', description: 'Your order has been placed successfully', status: 'success', icon: 'pi pi-check' },
    { title: 'Payment Confirmed', date: '2024-01-16', description: 'Payment has been processed', status: 'success', icon: 'pi pi-credit-card' },
    { title: 'Shipped', date: '2024-01-17', description: 'Your order has been shipped', status: 'warning', icon: 'pi pi-truck' },
    { title: 'Delivered', date: '2024-01-18', description: 'Order delivered successfully', status: 'success', icon: 'pi pi-home' }
  ]
  
  loading.value = false
})
</script>
```

### 3. Navigation Components

```vue
<template>
  <div>
    <!-- Menubar -->
    <Menubar :model="menuItems" class="mb-8">
      <template #start>
        <div class="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" class="h-8 w-8">
          <span class="text-xl font-bold">Brand</span>
        </div>
      </template>
      <template #end>
        <div class="flex items-center space-x-2">
          <Button 
            icon="pi pi-bell"
            severity="secondary"
            text
            @click="toggleNotifications"
          />
          <Button 
            icon="pi pi-user"
            severity="secondary"
            text
            @click="toggleProfile"
          />
        </div>
      </template>
    </Menubar>

    <!-- Breadcrumb -->
    <Breadcrumb :model="breadcrumbItems" class="mb-6">
      <template #item="{ item }">
        <router-link 
          v-if="item.route" 
          :to="item.route"
          class="text-primary-600 hover:text-primary-700"
        >
          <i v-if="item.icon" :class="item.icon" class="mr-2"></i>
          {{ item.label }}
        </router-link>
        <span v-else>
          <i v-if="item.icon" :class="item.icon" class="mr-2"></i>
          {{ item.label }}
        </span>
      </template>
    </Breadcrumb>

    <!-- Steps -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">Checkout Process</h3>
      <Steps :model="stepItems" :active-step="currentStep" class="mb-6" />
      
      <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div v-if="currentStep === 0">
          <h4 class="text-lg font-medium mb-4">Step 1: Personal Information</h4>
          <!-- Step 1 content -->
        </div>
        <div v-else-if="currentStep === 1">
          <h4 class="text-lg font-medium mb-4">Step 2: Shipping Address</h4>
          <!-- Step 2 content -->
        </div>
        <div v-else-if="currentStep === 2">
          <h4 class="text-lg font-medium mb-4">Step 3: Payment</h4>
          <!-- Step 3 content -->
        </div>
        <div v-else>
          <h4 class="text-lg font-medium mb-4">Step 4: Confirmation</h4>
          <!-- Step 4 content -->
        </div>
        
        <div class="mt-6 flex justify-between">
          <Button 
            label="Previous"
            icon="pi pi-chevron-left"
            severity="secondary"
            :disabled="currentStep === 0"
            @click="currentStep--"
          />
          <Button 
            :label="currentStep === 3 ? 'Complete' : 'Next'"
            :icon="currentStep === 3 ? 'pi pi-check' : 'pi pi-chevron-right'"
            icon-pos="right"
            @click="currentStep < 3 ? currentStep++ : completeProcess()"
          />
        </div>
      </div>
    </div>

    <!-- TabView -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">Product Details</h3>
      <TabView>
        <TabPanel header="Description">
          <div class="p-4">
            <p>Product description content goes here...</p>
          </div>
        </TabPanel>
        <TabPanel header="Specifications">
          <div class="p-4">
            <DataTable :value="specifications" class="p-datatable-sm">
              <Column field="property" header="Property"></Column>
              <Column field="value" header="Value"></Column>
            </DataTable>
          </div>
        </TabPanel>
        <TabPanel header="Reviews">
          <div class="p-4">
            <div v-for="review in reviews" :key="review.id" class="mb-4 p-4 border rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center space-x-2">
                  <Avatar :label="review.author.charAt(0)" shape="circle" />
                  <span class="font-medium">{{ review.author }}</span>
                </div>
                <Rating v-model="review.rating" :readonly="true" :cancel="false" />
              </div>
              <p class="text-gray-600 dark:text-gray-400">{{ review.comment }}</p>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Navigation data
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
      { label: 'Electronics', route: '/products/electronics' },
      { label: 'Clothing', route: '/products/clothing' },
      { label: 'Home & Garden', route: '/products/home' }
    ]
  },
  {
    label: 'Services',
    icon: 'pi pi-cog',
    items: [
      { label: 'Support', route: '/support' },
      { label: 'Consultation', route: '/consultation' }
    ]
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    route: '/about'
  }
])

const breadcrumbItems = ref([
  { label: 'Home', icon: 'pi pi-home', route: '/' },
  { label: 'Products', route: '/products' },
  { label: 'Electronics', route: '/products/electronics' },
  { label: 'Smartphones' }
])

const stepItems = ref([
  { label: 'Personal Info' },
  { label: 'Shipping' },
  { label: 'Payment' },
  { label: 'Confirmation' }
])

const currentStep = ref(0)

const specifications = ref([
  { property: 'Brand', value: 'TechCorp' },
  { property: 'Model', value: 'X-2024' },
  { property: 'Weight', value: '150g' },
  { property: 'Dimensions', value: '15 x 7 x 0.8 cm' }
])

const reviews = ref([
  { id: 1, author: 'John Doe', rating: 5, comment: 'Excellent product, highly recommended!' },
  { id: 2, author: 'Jane Smith', rating: 4, comment: 'Good quality, fast delivery.' },
  { id: 3, author: 'Bob Johnson', rating: 5, comment: 'Perfect for my needs.' }
])

// Methods
const toggleNotifications = () => {
  // Toggle notifications
}

const toggleProfile = () => {
  // Toggle profile menu
}

const completeProcess = () => {
  // Complete the checkout process
}
</script>
```

## 🎨 Advanced Theming

### 1. Custom Theme Creation

Create `assets/theme/custom.css`:

```css
/* Custom PrimeVue theme */
:root {
  /* Brand Colors */
  --p-primary-color: #10b981;
  --p-primary-contrast-color: #ffffff;
  --p-primary-hover-color: #059669;
  --p-primary-active-color: #047857;
  
  /* Success Colors */
  --p-success-color: #22c55e;
  --p-success-contrast-color: #ffffff;
  --p-success-hover-color: #16a34a;
  --p-success-active-color: #15803d;
  
  /* Info Colors */
  --p-info-color: #3b82f6;
  --p-info-contrast-color: #ffffff;
  --p-info-hover-color: #2563eb;
  --p-info-active-color: #1d4ed8;
  
  /* Warning Colors */
  --p-warning-color: #f59e0b;
  --p-warning-contrast-color: #ffffff;
  --p-warning-hover-color: #d97706;
  --p-warning-active-color: #b45309;
  
  /* Danger Colors */
  --p-danger-color: #ef4444;
  --p-danger-contrast-color: #ffffff;
  --p-danger-hover-color: #dc2626;
  --p-danger-active-color: #b91c1c;
  
  /* Component Specific */
  --p-button-border-radius: 0.5rem;
  --p-inputtext-border-radius: 0.5rem;
  --p-card-border-radius: 0.75rem;
  --p-overlay-border-radius: 0.5rem;
  
  /* Shadows */
  --p-shadow-1: 0 1px 3px rgba(0, 0, 0, 0.1);
  --p-shadow-2: 0 4px 6px rgba(0, 0, 0, 0.1);
  --p-shadow-3: 0 10px 15px rgba(0, 0, 0, 0.1);
  --p-shadow-4: 0 20px 25px rgba(0, 0, 0, 0.1);
  --p-shadow-5: 0 25px 50px rgba(0, 0, 0, 0.25);
}

/* Component customizations */
.p-button {
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.p-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--p-shadow-3);
}

.p-button:active {
  transform: translateY(0);
}

.p-inputtext:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  border-color: var(--p-primary-color);
}

.p-card {
  box-shadow: var(--p-shadow-2);
  transition: all 0.2s ease-in-out;
}

.p-card:hover {
  box-shadow: var(--p-shadow-3);
  transform: translateY(-2px);
}

.p-datatable {
  box-shadow: var(--p-shadow-1);
}

.p-datatable .p-datatable-thead > tr > th {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

.p-dialog {
  box-shadow: var(--p-shadow-5);
}

.p-toast {
  box-shadow: var(--p-shadow-3);
}

/* Custom animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.p-overlay-enter-active {
  animation: fadeIn 0.3s ease-out;
}

.p-sidebar-enter-active {
  animation: slideIn 0.3s ease-out;
}
```

### 2. Theme Switching

Create `composables/useTheme.ts`:

```typescript
export const useTheme = () => {
  const currentTheme = ref('aura')
  const isDark = ref(false)

  const themes = {
    aura: 'Aura',
    lara: 'Lara',
    nora: 'Nora',
    material: 'Material',
    bootstrap: 'Bootstrap',
    tailwind: 'Tailwind'
  }

  const switchTheme = (theme: string) => {
    currentTheme.value = theme
    
    // Update PrimeVue theme
    const config = usePrimeVueConfig()
    config.theme.preset = theme
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
    
    // Store in localStorage
    localStorage.setItem('primevue-theme', theme)
  }

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    localStorage.setItem('dark-mode', isDark.value.toString())
  }

  // Initialize theme on mount
  onMounted(() => {
    const savedTheme = localStorage.getItem('primevue-theme')
    const savedDarkMode = localStorage.getItem('dark-mode')
    
    if (savedTheme) {
      switchTheme(savedTheme)
    }
    
    if (savedDarkMode === 'true') {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }
  })

  return {
    currentTheme: readonly(currentTheme),
    isDark: readonly(isDark),
    themes,
    switchTheme,
    toggleDarkMode
  }
}
```

## 🔧 Performance Optimization

### 1. Lazy Loading Components

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  primevue: {
    components: {
      // Only import components you use
      include: [
        'Button',
        'InputText',
        'DataTable',
        'Dialog',
        'Toast',
        'ConfirmDialog'
      ],
      // Exclude heavy components
      exclude: [
        'Chart',
        'FullCalendar',
        'Editor'
      ]
    }
  }
})
```

### 2. Custom Component Wrapper

Create `components/ui/BaseButton.vue`:

```vue
<template>
  <Button
    :label="label"
    :icon="icon"
    :loading="loading"
    :disabled="disabled"
    :severity="severity"
    :size="size"
    :outlined="outlined"
    :text="text"
    :raised="raised"
    :rounded="rounded"
    :class="buttonClass"
    @click="handleClick"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Button>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  icon?: string
  loading?: boolean
  disabled?: boolean
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
  size?: 'small' | 'large'
  outlined?: boolean
  text?: boolean
  raised?: boolean
  rounded?: boolean
  variant?: 'solid' | 'outline' | 'ghost'
}

const props = withDefaults(defineProps<Props>(), {
  severity: 'primary',
  variant: 'solid'
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const buttonClass = computed(() => {
  const classes = ['transition-all', 'duration-200']
  
  if (props.variant === 'ghost') {
    classes.push('hover:bg-gray-100', 'dark:hover:bg-gray-800')
  }
  
  return classes.join(' ')
})

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
```

## 🧪 Testing Components

Create `tests/components/BaseButton.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '~/components/ui/BaseButton.vue'

describe('BaseButton', () => {
  it('renders with label', () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Test Button' }
    })
    
    expect(wrapper.text()).toContain('Test Button')
  })

  it('emits click event', async () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Click me' }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Disabled', disabled: true }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted().click).toBeFalsy()
  })
})
```

## 📝 Best Practices

### 1. Component Organization

```
components/
├── ui/           # Base UI components
│   ├── BaseButton.vue
│   ├── BaseInput.vue
│   └── BaseCard.vue
├── forms/        # Form-specific components
│   ├── ContactForm.vue
│   └── LoginForm.vue
├── layout/       # Layout components
│   ├── AppHeader.vue
│   └── AppFooter.vue
└── features/     # Feature-specific components
    ├── UserProfile.vue
    └── ProductList.vue
```

### 2. Composables for Complex Logic

```typescript
// composables/useDataTable.ts
export const useDataTable = () => {
  const loading = ref(false)
  const data = ref([])
  const filters = ref({})
  const selectedRows = ref([])
  
  const loadData = async (params?: any) => {
    loading.value = true
    try {
      const response = await $fetch('/api/data', { params })
      data.value = response.data
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      loading.value = false
    }
  }
  
  const exportData = () => {
    // Export logic
  }
  
  return {
    loading: readonly(loading),
    data: readonly(data),
    filters,
    selectedRows,
    loadData,
    exportData
  }
}
```

### 3. Error Handling

```vue
<template>
  <div>
    <Toast />
    <ConfirmDialog />
    
    <!-- Your components -->
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const toast = useToast()
const confirm = useConfirm()

// Error handling
const handleError = (error: any) => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: error.message || 'An unexpected error occurred',
    life: 5000
  })
}

// Success feedback
const showSuccess = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: 3000
  })
}

// Confirmation dialog
const confirmAction = (callback: () => void) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: callback
  })
}
</script>
```

## 🚀 Next Steps

1. [API Integration](./api-integration.md) - Connect components to Laravel API
2. [Form Handling](./form-handling.md) - Advanced form patterns
3. [State Management](./state-management.md) - Manage component state
4. [Performance](./performance.md) - Optimize component performance

---

**PrimeVue setup complete!** 🎉 You now have a fully configured UI component library ready for development. 