<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = computed(() => {
  const name = route.meta.layout || 'public'
  return defineAsyncComponent(() => import(`./components/layout/${name.charAt(0).toUpperCase() + name.slice(1)}Layout.vue`))
})
</script>