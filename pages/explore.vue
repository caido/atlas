<script setup lang="ts">
import IconField from 'primevue/iconfield'
import Tag from 'primevue/tag'
import { ref, computed, onMounted } from 'vue'
import FloatLabel from 'primevue/floatlabel'
import { useRoute } from 'vue-router'
import { NuxtLink } from '#components'

const searchQuery = ref('')
const selectedFormats = ref<string[]>([])
const selectedLanguages = ref<string[]>([])
const selectedPlatforms = ref<string[]>([])
const selectedTags = ref<string[]>([])

const availableFormats = ['Video', 'Article', 'Lab'] as const
const availableLanguages = ['English', 'French', 'Spanish', 'German', 'Japanese']
const availablePlatforms = ['Security Academy', 'Cloud University', 'Tech Institute', 'Online Learning']

// Parse query parameters and set initial values
const route = useRoute()
const formatMap = {
  'videos': 'Video',
  'articles': 'Article',
  'labs': 'Lab'
}

onMounted(() => {
  // Set search query if present
  if (route.query.q) {
    searchQuery.value = route.query.q as string
  }

  // Set format filter if present
  if (route.query.format) {
    const format = route.query.format as string
    const mappedFormat = formatMap[format as keyof typeof formatMap]
    if (mappedFormat) {
      selectedFormats.value = [mappedFormat]
    }
  }
})

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

const openGithub = () => {
  window.open('https://github.com/caido/atlas', '_blank')
}
</script>

<template>
  <div class="container mx-auto px-4 py-4 sm:py-8">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
      <NuxtLink to="/" class="flex items-center gap-4 hover:opacity-80 transition-opacity">
        <img src="/images/name.color.webp" alt="Logo" class="h-8" >
        <span class="text-2xl relative top-0.5 text-surface-200">Atlas</span>
      </NuxtLink>
      <div class="flex flex-col-reverse sm:flex-row sm:items-center gap-4 sm:gap-6">
        <Button 
          icon="fa-solid fa-external-link" 
          label="Submit a Resource" 
          class="w-full sm:w-auto"
          @click="openGithub"
        />
        <div class="flex flex-wrap gap-4 sm:gap-6">
          <a href="https://docs.caido.io/" target="_blank" class="text-surface-400 hover:text-surface-200 transition-colors">Docs</a>
          <a href="https://developer.caido.io/" target="_blank" class="text-surface-400 hover:text-surface-200 transition-colors">Developer</a>
          <a href="https://caido.io/plugins" target="_blank" class="text-surface-400 hover:text-surface-200 transition-colors">Plugins</a>
          <a href="https://caido.io/download" target="_blank" class="text-surface-400 hover:text-surface-200 transition-colors">Download</a>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="mb-6 sm:mb-8">
      <IconField>
        <InputIcon class="fas fa-magnifying-glass" />
        <InputText
          v-model="searchQuery"
          placeholder="Search resources..."
          class="w-full"
        />
      </IconField>
    </div>

    <!-- Filters -->
    <div class="mb-6 sm:mb-8">
      <h3 class="font-medium text-surface-400 mb-4">Filter by:</h3>
      
      <div class="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-6 mb-6">
        <!-- Format Filter -->
        <div class="flex flex-wrap items-center gap-4">
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
        <div class="w-full sm:w-48">
          <FloatLabel class="[&_label]:!left-0">
            <MultiSelect
              v-model="selectedLanguages"
              filter
              :options="availableLanguages"
              class="w-full"
              :max-selected-labels="2"
            />
            <label>Language</label>
          </FloatLabel>
        </div>

        <!-- Platform Filter -->
        <div class="w-full sm:w-48">
          <FloatLabel class="[&_label]:!left-0">
            <MultiSelect
              v-model="selectedPlatforms"
              filter
              :options="availablePlatforms"
              class="w-full"
              :max-selected-labels="2"
            />
            <label>Platform</label>
          </FloatLabel>
        </div>

        <!-- Tags Filter -->
        <div class="w-full sm:w-48">
          <FloatLabel class="[&_label]:!left-0">
            <MultiSelect
              v-model="selectedTags"
              :options="topTags"
              class="w-full"
              filter
              :max-selected-labels="2"
            />
            <label>Tags</label>
          </FloatLabel>
        </div>

        <Button
          v-if="searchQuery || selectedFormats.length > 0 || selectedLanguages.length > 0 || selectedPlatforms.length > 0 || selectedTags.length > 0"
          severity="danger"
          text
          class="w-full sm:w-auto"
          @click="clearFilters"
        >
          <i class="fa-solid fa-xmark mr-2" />
          Clear all filters
        </Button>
      </div>

      <!-- Search Context -->
      <div  class="mb-6">
        <div class="text-surface-400 text-sm sm:text-base">
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
      </div>

      <!-- Results -->
      <div v-if="filteredContent.length === 0" class="text-center text-surface-400 flex flex-col items-center gap-4">
        <img src="/images/undraw_searching.svg" alt="No results found" class="w-64 h-64 mt-8 grayscale invert contrast-[20%] opacity-50" >
        <p>No resources found matching your criteria.</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <NuxtLink v-for="item in filteredContent" :key="item.path" :to="item.path" class="block">
          <Card class="h-full hover:bg-surface-400/20 transition-colors cursor-pointer">
            <template #title>
              <div class="flex items-center justify-between gap-2">
                <span class="text-lg font-medium">
                  {{ item.title }}
                </span>
                <div class="flex items-center gap-2">
                  <span v-for="format in item.format" :key="format" class="text-surface-400 text-base">
                    <i v-if="format === 'Video'" v-tooltip.top="'Video'" class="fa-solid fa-video"/>
                    <i v-else-if="format === 'Article'" v-tooltip.top="'Article'" class="fa-solid fa-newspaper"/>
                    <i v-else-if="format === 'Lab'" v-tooltip.top="'Lab'" class="fa-solid fa-flask"/>
                  </span>
                </div>
              </div>
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
        </NuxtLink>
      </div>
    </div>
  </div>
</template> 