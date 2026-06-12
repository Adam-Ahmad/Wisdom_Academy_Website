<script setup>
const results = [
  "LATEST RESULTS",
  "W.A.F 3-0 - TOTTENHAM",
  "W.A.F 1-1 - ARSENAL FC",
  "W.A.F 2-0 - SOUTH UNITED",
  "W.A.F 4-2 - PREMIER XI",
  "W.A.F 3-0 - TOTTENHAM", // Duplicated for infinite scroll illusion
  "W.A.F 1-1 - ARSENAL FC",
];
</script>

<template>
  <div class="results-ticker">
    <div class="ticker-wrapper">
      <div class="ticker-item" v-for="(result, index) in results" :key="index">
        <i class="fas fa-futbol me-2"></i>{{ result }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
