<script setup lang="ts">
import { NuxtLink } from '#components'

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

    <!-- Page Content -->
    <slot />
  </div>
</template> 