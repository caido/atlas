<script setup lang="ts">
import { useRoute } from 'vue-router'
import Tag from 'primevue/tag'
import { useAsyncData } from '#app'
import { queryCollection } from '#imports'

const route = useRoute()

// Fetch the content using Nuxt Content
const { data: content } = await useAsyncData(`content-${route.params.slug}`, () => {
  return queryCollection('community').path(route.path).first()
})

// Handle external content
const handleExternalContent = () => {
  if (content.value?.url) {
    window.open(content.value.url, '_blank')
  }
}
</script>

<template>
  <div>
    <!-- Content -->
    <div v-if="content" class="max-w-4xl mx-auto">
      <!-- Title and Metadata -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4">{{ content.title }}</h1>
        <div class="flex flex-wrap items-center gap-4 text-surface-400">
          <div class="flex items-center gap-2">
            <span v-if="content.author">By <span class="font-bold text-surface-200">{{ content.author }}</span></span>
            <span v-if="content.platform">on <span class="font-bold text-surface-200">{{ content.platform }}</span></span>
          </div>
          <div class="flex items-center gap-2">
            <span v-for="format in content.format" :key="format" class="text-base">
              <i v-if="format === 'video'" v-tooltip.top="'Video'" class="fa-solid fa-video text-red-500"/>
              <i v-else-if="format === 'article'" v-tooltip.top="'Article'" class="fa-solid fa-newspaper text-blue-500"/>
              <i v-else-if="format === 'lab'" v-tooltip.top="'Lab'" class="fa-solid fa-flask text-green-500"/>
            </span>
          </div>
        </div>
      </div>

      <!-- Description -->
      <p class="text-xl text-surface-300 mb-8">{{ content.description }}</p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-8">
        <Tag v-for="tag in content.tags" :key="tag" severity="info" :value="tag" />
      </div>

      <!-- Content or External Link -->
      <div v-if="content.url" class="text-center">
        <Button
          label="View Content"
          icon="fa-solid fa-external-link"
          class="text-lg px-6 py-3"
          @click="handleExternalContent"
        />
      </div>
      <div v-else class="prose prose-invert max-w-none">
        <ContentRenderer :value="content" />
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center text-surface-400">
      <p>Loading content...</p>
    </div>
  </div>
</template>

<style>
.prose {
  @apply text-surface-200;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-surface-100 font-bold;
}

.prose a {
  @apply text-primary-400 hover:text-primary-300;
}

.prose code {
  @apply bg-surface-800 text-surface-200 px-1 py-0.5 rounded;
}

.prose pre {
  @apply bg-surface-800 text-surface-200 p-4 rounded-lg overflow-x-auto;
}

.prose blockquote {
  @apply border-l-4 border-surface-600 pl-4 italic;
}

.prose ul,
.prose ol {
  @apply list-inside;
}

.prose ul {
  @apply list-disc;
}

.prose ol {
  @apply list-decimal;
}
</style> 