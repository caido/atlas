<template>
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-4xl font-bold mb-4">Caido Atlas</h1>
      <p class="text-xl text-gray-400">A curated directory of learning resources for Caido</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="resource in resources" :key="resource._path" class="bg-gray-800 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-2">{{ resource.title }}</h2>
        <p class="text-gray-400 mb-4">{{ resource.description }}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="tag in resource.tags" :key="tag" class="px-2 py-1 bg-gray-700 rounded text-sm">
            {{ tag }}
          </span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-400">By {{ resource.author }}</span>
          <NuxtLink :to="resource._path" class="text-blue-400 hover:text-blue-300">
            View Resource
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: resources } = await useAsyncData('resources', () => {
  return queryContent().find()
})
</script> 