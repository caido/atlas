<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="pending" class="text-center">
      <ProgressSpinner />
    </div>
    <div v-else-if="error" class="text-center text-red-400">
      {{ error.message }}
    </div>
    <div v-else-if="resource" class="max-w-3xl mx-auto">
      <header class="mb-8">
        <h1 class="text-4xl font-bold mb-4">{{ resource.title }}</h1>
        <p class="text-xl text-gray-400 mb-4">{{ resource.description }}</p>
        <div class="flex items-center gap-4 text-gray-400">
          <span>By {{ resource.author }}</span>
          <span v-if="resource.platform">on {{ resource.platform }}</span>
        </div>
      </header>

      <div class="flex flex-wrap gap-2 mb-8">
        <span v-for="tag in resource.tags" :key="tag" class="px-2 py-1 bg-gray-700 rounded text-sm">
          {{ tag }}
        </span>
      </div>

      <div v-if="resource.body" class="prose prose-invert max-w-none">
        <ContentDoc />
      </div>
      <div v-else class="text-center">
        <Button @click="navigateTo(resource.source)" label="View Resource" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: resource, pending, error } = await useAsyncData(`content-${route.path}`, () => {
  return queryContent(route.path).findOne()
})

// Redirect to source URL if no body content
onMounted(() => {
  if (resource.value && !resource.value.body && resource.value.source) {
    navigateTo(resource.value.source, { external: true })
  }
})
</script> 