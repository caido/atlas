<script setup lang="ts">
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

const isInternalLink = computed(() => props.item.extension === 'md')
</script>

<template>
  <NuxtLink
    :to="isInternalLink ? item.path : item.url"
    :external="!isInternalLink"
    :target="!isInternalLink ? '_blank' : undefined"
    class="block"
  >
    <Card class="h-full hover:bg-surface-400/20 transition-colors cursor-pointer" pt:caption:class="flex flex-col" pt:body:class="flex flex-col p-6 flex-1" pt:content:class="p-0 flex-1">
      <template #title>
        <div class="relative">
          <span class="text-lg font-medium pr-8">
            {{ item.title }}
          </span>
          <div class="absolute top-0 right-0 text-sm">
            <i v-if="!isInternalLink" class="fa-solid fa-arrow-up-right-from-square text-surface-400" />
          </div>
        </div>
      </template>
      <template #content>
        <div class="size-full flex flex-col">
          <p class="flex-1 text-surface-300 my-4">{{ item.description }}</p>
          <div class="flex items-center justify-between text-sm text-surface-400">
            <div class="flex items-center gap-2">
              <span v-if="item.author">By <span class="font-bold">{{ item.author }}</span></span>
              <span v-if="item.platform">on <span class="font-bold">{{ item.platform }}</span></span>
            </div>
            <div class="flex items-center gap-2">
              <span v-for="format in item.format" :key="format" class="text-surface-400 text-base">
                <i v-if="format === 'video'" v-tooltip.top="'Video'" class="fa-solid fa-video text-red-500"/>
                <i v-else-if="format === 'article'" v-tooltip.top="'Article'" class="fa-solid fa-newspaper text-blue-500"/>
                <i v-else-if="format === 'lab'" v-tooltip.top="'Lab'" class="fa-solid fa-flask text-green-500"/>
              </span>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </NuxtLink>
</template> 