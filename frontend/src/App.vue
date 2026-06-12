<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Navbar from "./components/Navbar.vue";
import HeroSection from "./components/HeroSection.vue";
import ResultsTicker from "./components/ResultsTicker.vue";
import AboutSection from "./components/AboutSection.vue";
import TeamsSection from "./components/TeamsSection.vue";
import NewsSection from "./components/NewsSection.vue";
import PartnersSection from "./components/PartnersSection.vue";
import ContactSection from "./components/ContactSection.vue";
import RegistrationForm from "./components/RegistrationForm.vue";

const email = ref("");
const showScrollTop = ref(false);
const showRegistration = ref(false);
const newsletterSuccess = ref(false);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const subscribeNewsletter = () => {
  if (email.value.trim()) {
    newsletterSuccess.value = true;
    email.value = "";
    setTimeout(() => {
      newsletterSuccess.value = false;
    }, 4000);
  }
};

const openRegistration = () => {
  showRegistration.value = true;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div id="app">
    <Navbar @open-register="openRegistration" />
    <HeroSection id="home" @open-register="openRegistration" />
    <ResultsTicker />
    <AboutSection id="about" />
    <TeamsSection />
    <NewsSection id="news" />
    <PartnersSection />
    <ContactSection />
    <footer>
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4">
            <div class="footer-brand">WISDOM ACADEMY FOOTBALL</div>
            <p class="footer-text">
              Building the bridge between raw potential and professional wisdom
              since 2010.
            </p>
            <div class="social-links">
              <a
                href="https://www.instagram.com/wisdomacademyfootball?utm_source=qr&igsh=MWV5YWVycTRiZXd6OQ=="
                target="_blank"
                ><i class="fab fa-instagram"></i
              ></a>
              <a
                href="https://www.facebook.com/profile.php?id=61550477043964"
                target="_blank"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a href="https://wa.me/+256785853463" target="_blank"
                ><i class="fab fa-whatsapp"></i
              ></a>
            </div>
          </div>
          <div class="col-lg-2 col-md-6">
            <h4 class="footer-title">QUICK LINKS</h4>
            <ul class="footer-links">
              <li>
                <a href="#about"
                  ><i class="fas fa-chevron-right"></i>About Us</a
                >
              </li>
              <li>
                <a href="#news"><i class="fas fa-chevron-right"></i>News</a>
              </li>
              <li>
                <a href="#" @click.prevent="openRegistration"
                  ><i class="fas fa-chevron-right"></i>Join US</a
                >
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6">
            <h4 class="footer-title">CONNECT</h4>
            <ul class="footer-links">
              <li>
                <a
                  href="https://www.instagram.com/wisdomacademyfootball?utm_source=qr&igsh=MWV5YWVycTRiZXd6OQ=="
                  target="_blank"
                  ><i class="fab fa-instagram"></i>Instagram</a
                >
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61550477043964"
                  target="_blank"
                  ><i class="fab fa-facebook-f"></i>Facebook</a
                >
              </li>
              <li>
                <a href="https://wa.me/+256785853463" target="_blank"
                  ><i class="fab fa-whatsapp"></i>WhatsApp</a
                >
              </li>
            </ul>
          </div>
          <div class="col-lg-4">
            <h4 class="footer-title">NEWSLETTER</h4>
            <p class="footer-text">
              Subscribe to stay updated with our latest news and events.
            </p>
            <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
              <input
                type="email"
                class="newsletter-input"
                placeholder="Your Email Address"
                required
                v-model="email"
              />
              <button type="submit" class="btn btn-newsletter">
                <i class="fas fa-paper-plane me-2"></i>SUBSCRIBE
              </button>
            </form>
            <div
              v-if="newsletterSuccess"
              class="alert alert-success mt-2 py-2 px-3 border-0 rounded-pill text-center"
              style="
                font-size: 0.85rem;
                font-weight: 600;
                background: rgba(16, 185, 129, 0.15);
                color: #10b981;
              "
            >
              <i class="fas fa-check-circle me-1"></i> Successfully subscribed!
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 WISDOM ACADEMY FOOTBALL. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>

    <!-- Registration Overlay -->
    <RegistrationForm
      :is-open="showRegistration"
      @close="showRegistration = false"
    />

    <!-- Scroll to Top Button -->
    <div
      class="scroll-top"
      :class="{ visible: showScrollTop }"
      @click="scrollToTop"
    >
      <i class="fas fa-arrow-up"></i>
    </div>
  </div>
</template>

<style src="./index.css"></style>
