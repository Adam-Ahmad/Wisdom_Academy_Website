<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <router-link to="/" class="navbar-brand fw-bold">⚽ Football Academy</router-link>
      <div class="navbar-nav ms-auto">
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/register" class="nav-link btn btn-primary text-white ms-2">Join Academy</router-link>
      </div>
    </nav>
    <main class="flex-grow-1 container py-4"><slot /></main>
    <footer class="bg-light text-center py-3 border-top">© {{ new Date().getFullYear() }} Football Academy</footer>
  </div>
</template>