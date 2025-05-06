<script setup lang="ts">
import Tag from 'primevue/tag'
import { NuxtLink } from '#components'
import { computed } from 'vue'

interface Resource {
  path: string
  url: string
  title: string
  format: string[]
  author?: string
  platform?: string
  description: string
  tags: string[]
  extension: string
}

const props = defineProps<{
  item: Resource
}>()

const isInternalLink = computed(() => props.item.extension === '.md')
</script>

<template>
  <NuxtLink
    :to="isInternalLink ? item.path : item.url"
    :external="!isInternalLink"
    :target="!isInternalLink ? '_blank' : undefined"
    class="block"
  >
    <Card class="h-full hover:bg-surface-400/20 transition-colors cursor-pointer" pt:caption:class="flex flex-col">
      <template #title>
        <div class="flex items-center justify-between">
          <span class="text-lg font-medium">
            {{ item.title }}
          </span>
          <div class="flex items-center gap-2">
            <span v-for="format in item.format" :key="format" class="text-surface-400 text-base">
              <i v-if="format === 'video'" v-tooltip.top="'Video'" class="fa-solid fa-video text-red-500"/>
              <i v-else-if="format === 'article'" v-tooltip.top="'Article'" class="fa-solid fa-newspaper text-blue-500"/>
              <i v-else-if="format === 'lab'" v-tooltip.top="'Lab'" class="fa-solid fa-flask text-green-500"/>
            </span>
          </div>
        </div>
      </template>
      <template #subtitle>
        <div class="flex items-center gap-2 text-sm text-surface-400">
          <span v-if="item.author">By <span class="font-bold">{{ item.author }}</span></span>
          <span v-if="item.platform">on <span class="font-bold">{{ item.platform }}</span></span>
        </div>
      </template>
      <template #content>
        <p class="text-surface-200 my-4">{{ item.description }}</p>
        <div class="flex flex-wrap gap-2">
          <Tag v-for="tag in item.tags" :key="tag" severity="info" :value="tag" />
        </div>
      </template>
    </Card>
  </NuxtLink>
</template> 