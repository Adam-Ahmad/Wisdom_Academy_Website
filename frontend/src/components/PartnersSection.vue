<script setup>
const partners = ["URCS", "KCCA", "TPO", "OPM"];
</script>

<template>
  <section class="partners-section">
    <div class="container">
      <p class="partners-title">OUR GLOBAL PARTNERS</p>
      <div class="row">
        <div class="col-6 col-md-3" v-for="partner in partners" :key="partner">
          <div class="partner-logo">{{ partner }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
