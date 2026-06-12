<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["open-register"]);

const menuOpen = ref(false);
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const emitRegister = () => {
  closeMenu();
  emit("open-register");
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    class="navbar navbar-expand-lg fixed-top"
    :class="{ scrolled: isScrolled }"
  >
    <div class="container">
      <a class="navbar-brand" href="index.html"
        ><img
          src="/icons/favicon.ico"
          alt="W.A.F"
          width="40"
          height="40"
          class="me-2 rounded"
        />
        <span class="brand-acronym"> W A F</span>
      </a>
      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon" style="filter: invert(1)"></span>
      </button>
      <div class="collapse navbar-collapse" :class="{ show: menuOpen }">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <a class="nav-link" href="#home" @click="closeMenu">HOME</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#about" @click="closeMenu">ABOUT</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#news" @click="closeMenu">NEWS</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#news" @click="closeMenu">EVENTS</a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn-join" href="#" @click.prevent="emitRegister"
              >JOIN US</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
