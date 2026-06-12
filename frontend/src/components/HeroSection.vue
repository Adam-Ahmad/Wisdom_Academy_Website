<script setup>
const emit = defineEmits(["open-register"]);

const emitRegister = () => {
  emit("open-register");
};
</script>

<template>
  <section class="hero" id="home">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 hero-content">
          <div class="hero-badge">
            <i class="fas fa-trophy me-2"></i>Excellence Through Discipline and
            Teamwork
          </div>
          <h1>
            DEVELOPING THE NEXT YEAR GENERATION OF <br />
            <span>WISDOM ACADEMY FOOTBALL</span>
          </h1>
          <p class="hero-subtitle">BUILDING CHAMPIONS ON AND OFF THE FIELD</p>
          <div class="hero-buttons">
            <a
              href="#"
              @click.prevent="emitRegister"
              class="btn btn-hero-primary"
            >
              <i class="fas fa-user-plus me-2"></i>REGISTER NOW
            </a>
            <a href="#news" class="btn btn-hero-outline">
              <i class="fas fa-play-circle me-2"></i>EXPLORE PROGRAMS
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
