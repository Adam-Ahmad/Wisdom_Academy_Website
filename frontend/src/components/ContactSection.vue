<script setup>
const submitForm = () => {
  alert("Thank you for your submission! We will contact you shortly.");
  location.reload();
};
</script>

<template>
  <section class="section contact-section" id="contact">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-5">
          <div class="contact-card">
            <h3 class="contact-title">GET IN TOUCH</h3>
            <p class="contact-text">
              Ready to join Wisdom Academy Football? Contact our performance
              team today.
            </p>
            <form @submit.prevent="submitForm">
              <input
                type="text"
                class="form-control"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                class="form-control"
                placeholder="Your Email"
                required
              />
              <input type="text" class="form-control" placeholder="Subject" />
              <textarea
                class="form-control"
                rows="4"
                placeholder="Your Message"
                required
              ></textarea>
              <button type="submit" class="btn btn-submit">
                <i class="fas fa-paper-plane me-2"></i>SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
        <div class="col-lg-7">
          <div class="map-placeholder">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.543499976158!2d32.15606407371573!3d1.934885459418758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177a91007438f76d%3A0x5b8497ea161bccfb!2sWisdom%20Academy%20Football!5e0!3m2!1sen!2sug!4v1780688119544!5m2!1sen!2sug"
              width="100%"
              height="100%"
              style="border: 0; border-radius: 8px"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
