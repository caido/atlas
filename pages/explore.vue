<script setup lang="ts">
import IconField from 'primevue/iconfield'
import { ref, computed, onMounted } from 'vue'
import FloatLabel from 'primevue/floatlabel'
import { useRoute } from 'vue-router'
import { queryCollection } from '#imports'
import ResourceCard from '~/components/ResourceCard.vue'

const searchQuery = ref('')
const selectedFormats = ref<string[]>([])
const selectedLanguages = ref<string[]>([])
const selectedPlatforms = ref<string[]>([])
const selectedTags = ref<string[]>([])

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

const filteredContent = computed(() => {
  if (!content.value) return []
  
  return content.value.filter(item => {
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

const clearFilters = () => {
  searchQuery.value = ''
  selectedFormats.value = []
  selectedLanguages.value = []
  selectedPlatforms.value = []
  selectedTags.value = []
}
</script>

<template>
  <div>
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
            <span class="text-surface-300">{{ format }}</span>
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
              :options="uniquePlatforms"
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
              :options="uniqueTags"
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
      <div class="mb-6">
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
        <ResourceCard v-for="item in filteredContent" :key="item.path" :item="item" />
      </div>
    </div>
  </div>
</template> 