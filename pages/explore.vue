<script setup lang="ts">
import Tag from 'primevue/tag'
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedFormats = ref<string[]>([])
const selectedLanguages = ref<string[]>([])
const selectedPlatforms = ref<string[]>([])
const selectedTags = ref<string[]>([])

const availableFormats = ['Video', 'Article', 'Lab'] as const
const availableLanguages = ['English', 'French', 'Spanish', 'German', 'Japanese']
const availablePlatforms = ['Security Academy', 'Cloud University', 'Tech Institute', 'Online Learning']

const mockContent = [
  {
    path: '/resources/security-basics',
    title: 'Security Fundamentals',
    author: 'John Doe',
    platform: 'Security Academy',
    description: 'A comprehensive guide to understanding basic security concepts and best practices.',
    format: ['PDF', 'Video'],
    tags: ['Security', 'Development']
  },
  {
    path: '/resources/cloud-architecture',
    title: 'Cloud Architecture Patterns',
    author: 'Jane Smith',
    platform: 'Cloud University',
    description: 'Learn about modern cloud architecture patterns and their implementation.',
    format: ['Article', 'Course'],
    tags: ['Cloud', 'DevOps']
  },
  {
    path: '/resources/ai-ml',
    title: 'AI and Machine Learning Basics',
    author: 'Alex Johnson',
    description: 'Introduction to artificial intelligence and machine learning concepts.',
    format: ['Book', 'Video'],
    tags: ['AI', 'Development']
  }
]

const filteredContent = computed(() => {
  return mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesFormats = selectedFormats.value.length === 0 || 
                          item.format.some(format => selectedFormats.value.includes(format))
    
    const matchesPlatforms = selectedPlatforms.value.length === 0 || 
                           (item.platform && selectedPlatforms.value.includes(item.platform))
    
    const matchesTags = selectedTags.value.length === 0 || 
                       item.tags.some(tag => selectedTags.value.includes(tag))
    
    return matchesSearch && matchesFormats && matchesPlatforms && matchesTags
  })
})

const topTags = computed(() => {
  const tagCounts = new Map<string, number>()
  mockContent.forEach(item => {
    item.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })
  return Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag)
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedFormats.value = []
  selectedLanguages.value = []
  selectedPlatforms.value = []
  selectedTags.value = []
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Search -->
    <div class="mb-8">
      <InputText
        v-model="searchQuery"
        placeholder="Search resources..."
        class="w-full"
      />
    </div>

    <!-- Filters -->
    <div class="mb-8">
      <h3 class="text-lg font-medium mb-4">Filter by:</h3>
      
      <div class="flex items-center gap-6 mb-6">
        <!-- Format Filter -->
        <div class="flex items-center gap-4">
          <div v-for="format in availableFormats" :key="format" class="flex items-center">
            <Checkbox
              v-model="selectedFormats"
              :value="format"
              :binary="false"
              class="mr-2"
            />
            <span>{{ format }}</span>
          </div>
        </div>

        <!-- Language Filter -->
        <div class="w-48">
          <Dropdown
            v-model="selectedLanguages"
            :options="availableLanguages"
            placeholder="Select Language"
            class="w-full"
            :multiple="true"
          />
        </div>

        <!-- Platform Filter -->
        <div class="w-48">
          <Dropdown
            v-model="selectedPlatforms"
            :options="availablePlatforms"
            placeholder="Select Platform"
            class="w-full"
            :multiple="true"
          />
        </div>

        <!-- Tags Filter -->
        <div class="w-48">
          <Dropdown
            v-model="selectedTags"
            :options="topTags"
            placeholder="Select Tags"
            class="w-full"
            :multiple="true"
          />
        </div>
      </div>

      <!-- Search Context -->
      <div v-if="filteredContent.length > 0" class="mb-6 flex items-center justify-between">
        <div class="text-surface-400">
          <span>Showing {{ filteredContent.length }} result{{ filteredContent.length === 1 ? '' : 's' }}</span>
          <span v-if="searchQuery"> for "{{ searchQuery }}"</span>
          <span v-if="selectedFormats.length > 0">
            {{ searchQuery ? ' and' : ' for' }} {{ selectedFormats.join(', ') }}
          </span>
          <span v-if="selectedLanguages.length > 0">
            {{ searchQuery || selectedFormats.length > 0 ? ' and' : ' for' }} {{ selectedLanguages.join(', ') }}
          </span>
          <span v-if="selectedPlatforms.length > 0">
            {{ searchQuery || selectedFormats.length > 0 || selectedLanguages.length > 0 ? ' and' : ' for' }} {{ selectedPlatforms.join(', ') }}
          </span>
          <span v-if="selectedTags.length > 0">
            {{ searchQuery || selectedFormats.length > 0 || selectedLanguages.length > 0 || selectedPlatforms.length > 0 ? ' and' : ' for' }} {{ selectedTags.join(', ') }}
          </span>
        </div>
        <Button
          v-if="searchQuery || selectedFormats.length > 0 || selectedLanguages.length > 0 || selectedPlatforms.length > 0 || selectedTags.length > 0"
          text
          severity="secondary"
          @click="clearFilters"
        >
          <i class="fa-solid fa-xmark mr-2" />
          Clear all filters
        </Button>
      </div>

      <!-- Results -->
      <div v-if="filteredContent.length === 0" class="text-center text-surface-400">
        No resources found matching your criteria.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="item in filteredContent" :key="item.path" class="h-full">
          <template #header>
            <div class="flex items-center gap-2 p-4">
              <span v-for="format in item.format" :key="format" class="text-surface-400">
                {{ format }}
              </span>
            </div>
          </template>
          <template #title>
            <NuxtLink :to="item.path" class="hover:text-primary-400 transition-colors">
              {{ item.title }}
            </NuxtLink>
          </template>
          <template #subtitle>
            <div class="flex items-center gap-2 text-sm text-surface-400">
              <span>By {{ item.author }}</span>
              <span v-if="item.platform">on {{ item.platform }}</span>
            </div>
          </template>
          <template #content>
            <p class="text-surface-400 mb-4">{{ item.description }}</p>
            <div class="flex flex-wrap gap-2">
              <Tag v-for="tag in item.tags" :key="tag" severity="info" :value="tag" />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template> 