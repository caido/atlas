<script setup lang="ts">
import IconField from 'primevue/iconfield'
import { ref, computed, onMounted } from 'vue'
import MultiSelect from 'primevue/multiselect'
import { useRoute } from 'vue-router'
import { queryCollection } from '#imports'
import ResourceCard from '~/components/ResourceCard.vue'

interface FilterState {
  searchQuery: string
  formats: string[]
  languages: string[] | undefined
  platforms: string[] | undefined
  tags: string[] | undefined
}

const filterState = ref<FilterState>({
  searchQuery: '',
  formats: [],
  languages: undefined,
  platforms: undefined,
  tags: undefined
})

const availableFormats = ['video', 'article', 'lab'] as const
const availableLanguages = ['English', 'French', 'Spanish', 'German', 'Japanese']

// Parse query parameters and set initial values
const route = useRoute()
const formatMap = {
  'videos': 'video',
  'articles': 'article',
  'labs': 'lab'
}

// Fetch content using Nuxt Content
const { data: content } = await useAsyncData('community-content', () => {
  return queryCollection('community')
    .order('publishedAt', 'DESC')
    .all()
})

// Extract unique platforms and tags from content
const uniquePlatforms = computed(() => {
  if (!content.value) return []
  const platforms = new Set<string>()
  content.value.forEach(item => {
    if (item.platform) platforms.add(item.platform)
  })
  return Array.from(platforms)
})

const uniqueTags = computed(() => {
  if (!content.value) return []
  const tags = new Set<string>()
  content.value.forEach(item => {
    if (item.tags) {
      item.tags.forEach(tag => tags.add(tag))
    }
  })
  return Array.from(tags)
})

onMounted(() => {
  // Set search query if present
  if (route.query.q) {
    filterState.value.searchQuery = route.query.q as string
  }

  // Set format filter if present
  if (route.query.format) {
    const format = route.query.format as string
    const mappedFormat = formatMap[format as keyof typeof formatMap]
    if (mappedFormat) {
      filterState.value.formats = [mappedFormat]
    }
  }
})

const filteredContent = computed(() => {
  if (!content.value) return []
  
  return content.value.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(filterState.value.searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(filterState.value.searchQuery.toLowerCase())
    
    const matchesFormats = filterState.value.formats.length === 0 || 
                          item.format.some(format => filterState.value.formats.includes(format))
    
    const matchesPlatforms = !filterState.value.platforms?.length || 
                           (item.platform && filterState.value.platforms.includes(item.platform))
    
    const matchesTags = !filterState.value.tags?.length || 
                       item.tags?.some(tag => filterState.value.tags?.includes(tag))
    
    return matchesSearch && matchesFormats && matchesPlatforms && matchesTags
  })
})

const clearFilters = () => {
  filterState.value = {
    searchQuery: '',
    formats: [],
    languages: undefined,
    platforms: undefined,
    tags: undefined
  }
}
</script>

<template>
  <div>
    <!-- Search -->
    <div class="mb-6 sm:mb-8">
      <IconField>
        <InputIcon class="fas fa-magnifying-glass" />
        <InputText
          v-model="filterState.searchQuery"
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
              v-model="filterState.formats"
              :value="format"
              :binary="false"
              class="mr-2"
            />
            <span class="text-surface-300">{{ format }}</span>
          </div>
        </div>

        <!-- Language Filter -->
        <div class="w-full sm:w-48 relative">
          <label class="absolute -top-6 left-0 text-sm font-medium text-surface-400">Languages</label>
          <MultiSelect
            v-model="filterState.languages"
            filter
            :options="availableLanguages"
            placeholder="Select Languages"
            class="w-full"
            :max-selected-labels="2"
          />
        </div>

        <!-- Platform Filter -->
        <div class="w-full sm:w-48 relative">
          <label class="absolute -top-6 left-0 text-sm font-medium text-surface-400">Platforms</label>
          <MultiSelect
            v-model="filterState.platforms"
            filter
            placeholder="Select Platforms"
            :options="uniquePlatforms"
            class="w-full"
            :max-selected-labels="2"
          />
        </div>

        <!-- Tags Filter -->
        <div class="w-full sm:w-48 relative">
          <label class="absolute -top-6 left-0 text-sm font-medium text-surface-400">Tags</label>
          <MultiSelect
            v-model="filterState.tags"
            :options="uniqueTags"
            placeholder="Select Tags"
            class="w-full"
            filter
            :max-selected-labels="2"
          />
        </div>

        <Button
          v-if="filterState.searchQuery || filterState.formats.length > 0 || (filterState.languages && filterState.languages.length > 0) || (filterState.platforms && filterState.platforms.length > 0) || (filterState.tags && filterState.tags.length > 0)"
          severity="danger"
          text
          class="w-full sm:w-auto"
          @click="clearFilters"
        >
          <i class="fa-solid fa-rotate-left mr-2" />
          Clear all filters
        </Button>
      </div>

      <!-- Search Context -->
      <div class="mb-6">
        <div class="text-surface-400 text-sm sm:text-base">
          <span>Showing {{ filteredContent.length }} result{{ filteredContent.length === 1 ? '' : 's' }}</span>
          <span v-if="filterState.searchQuery"> for "{{ filterState.searchQuery }}"</span>
          <span v-if="filterState.formats.length > 0">
            {{ filterState.searchQuery ? ' and' : ' for' }} {{ filterState.formats.join(', ') }}
          </span>
          <span v-if="filterState.languages && filterState.languages.length > 0">
            {{ filterState.searchQuery || filterState.formats.length > 0 ? ' and' : ' for' }} {{ filterState.languages.join(', ') }}
          </span>
          <span v-if="filterState.platforms && filterState.platforms.length > 0">
            {{ filterState.searchQuery || filterState.formats.length > 0 || (filterState.languages && filterState.languages.length > 0) ? ' and' : ' for' }} {{ filterState.platforms.join(', ') }}
          </span>
          <span v-if="filterState.tags && filterState.tags.length > 0">
            {{ filterState.searchQuery || filterState.formats.length > 0 || (filterState.languages && filterState.languages.length > 0) || (filterState.platforms && filterState.platforms.length > 0) ? ' and' : ' for' }} {{ filterState.tags.join(', ') }}
          </span>
        </div>
      </div>

      <!-- Results -->
      <div v-if="filteredContent.length === 0" class="text-center text-surface-400 flex flex-col items-center gap-4">
        <img src="/images/undraw_searching.svg" alt="No results found" class="w-64 h-64 mt-8 grayscale invert contrast-[20%] opacity-50" >
        <p>No results found matching your criteria.</p>
        <Button text severity="danger" class="text-sm" @click="clearFilters">
          <i class="fa-solid fa-rotate-left mr-2" />
          Clear all filters
        </Button>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <ResourceCard v-for="item in filteredContent" :key="item.path" :item="item" />
      </div>
    </div>
  </div>
</template> 