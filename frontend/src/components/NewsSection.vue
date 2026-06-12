<script setup>
const news = [
  {
    title: "NEW HIGH PERFORMANCE CENTER OPENED",
    category: "ACHIEVEMENT",
    gradient: "linear-gradient(135deg, #0a1628, #1e3a8a)",
  },
  {
    title: "FIVE W.A.F PLAYERS JOIN NATIONAL TEAM",
    category: "SELECTION",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  {
    title: "THE IMPORTANCE OF NUTRITIONAL WISDOM",
    category: "GUIDANCE",
    gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
  },
  {
    title: "W.A.F ANNOUNCES NEW GLOBAL SPONSOR",
    category: "PARTNERSHIP",
    gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
  },
];
</script>

<template>
  <section class="section" id="news">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title">WISDOM DISPATCH</h2>
        <p class="section-subtitle">Latest updates from around the academy</p>
      </div>
      <div class="row g-4">
        <div class="col-md-6 col-lg-3" v-for="item in news" :key="item.title">
          <div class="news-card">
            <div class="news-image" :style="{ background: item.gradient }">
              <span class="news-category">{{ item.category }}</span>
            </div>
            <div class="news-content">
              <h4 class="news-title">{{ item.title }}</h4>
              <a href="#" class="news-link"
                >READ MORE <i class="fas fa-arrow-right"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
