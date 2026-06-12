<script setup>
const teams = [
  {
    name: "U10 WISDOM ELITE",
    desc: "Technical Mastery & Base",
    color: "#f59e0b",
    image: "/images/Team3.jpg",
  },
  {
    name: "U15 PRO PATH",
    desc: "Tactical Intelligence",
    color: "#3b82f6",
    image: "/images/Team2.jpeg",
  },
  {
    name: "+18 Senior W.A.F",
    desc: "Professional Readiness",
    color: "#10b981",
    image: "/images/seniorTeam.jpg",
  },
];
</script>

<template>
  <section class="section teams-section">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title">THE W.A.F ROSTER</h2>
        <p class="section-subtitle">
          Structured development tiers for every stage of a player's evolution
        </p>
      </div>
      <div class="row g-4">
        <div class="col-md-4" v-for="team in teams" :key="team.name">
          <div class="team-card">
            <div class="team-image-wrapper">
              <img :src="team.image" :alt="team.name" class="team-image" />
              <span class="team-badge" :style="{ background: team.color }">{{
                team.name
              }}</span>
            </div>
            <div class="team-content">
              <h3 class="team-title">{{ team.name }}</h3>
              <p class="team-description">
                <i class="fas fa-star text-warning me-2"></i>{{ team.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
