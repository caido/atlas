<script setup lang="ts">
import '@/assets/css/index.css';

useHead({
  script: [{
    src: 'https://atlas.caido.io/stats/script.js',
    defer: true,
    'data-api': 'https://atlas.caido.io/stats/event',
    'data-domain': 'atlas.caido.io'
  }]
});
</script>

<template>
  <div class="min-h-screen bg-surface-900 text-gray-100">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>