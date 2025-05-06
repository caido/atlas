<script setup lang="ts">
import { ref } from 'vue'

// We'll implement the search functionality later
const searchQuery = ref('')
const activeFilter = ref('all')

const filters = [
  { id: 'labs', label: 'Labs', icon: 'fa-solid fa-flask' },
  { id: 'videos', label: 'Videos', icon: 'fa-solid fa-video' },
  { id: 'articles', label: 'Articles', icon: 'fa-solid fa-newspaper' }
]

const handleSearch = () => {
  const query: Record<string, string> = {}
  
  if (searchQuery.value) {
    query.q = searchQuery.value
  }
  if (activeFilter.value !== 'all') {
    query.format = activeFilter.value
  }

  navigateTo({
    path: '/explore',
    query
  })
}

const handleFilterClick = (filterId: string) => {
  activeFilter.value = filterId
  handleSearch()
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <div class="max-w-2xl w-full text-center">
      <!-- Header -->
      <div class="flex justify-center mb-4">
        <img src="/images/logo.color.webp" alt="Caido Logo" class="w-32 h-32" >
      </div>
      <h1 class="text-5xl font-bold mb-4">Atlas</h1>
      <p class="text-xl text-surface-400 mb-8">
        Your gateway to Caido's learning resources
      </p>

      <!-- Search Section -->
      <div class="mb-8">
        <div class="flex gap-2">
          <InputText
            v-model="searchQuery"
            placeholder="Search resources..."
            class="flex-1"
            @keyup.enter="handleSearch"
          />
          <Button
            class="flex items-center gap-2"
            label="Search"
            icon="fa-solid fa-search"
            @click="handleSearch"
          />
          <Button
            severity="contrast"
            class="flex items-center gap-2"
            icon="fa-solid fa-compass"
            label="Explore"
            @click="navigateTo('/explore')"
          />
        </div>
      </div>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center items-center gap-2">
        <span class="text-surface-400">Filter by:</span>
        <Button
          v-for="filter in filters"
          :key="filter.id"
          severity="contrast"
          text
          class="flex items-center gap-2"
          @click="handleFilterClick(filter.id)"
        >
          <i :class="filter.icon"/>
          <span>{{ filter.label }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>