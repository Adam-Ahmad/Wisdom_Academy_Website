<script setup>
const values = [
  {
    title: "Excellence",
    desc: "We strive for excellence in all aspects of our program.",
  },
  {
    title: "Discipline",
    desc: "We uphold high standards of conduct, commitment, and accountability.",
  },
  {
    title: "Teamwork",
    desc: "We work together, support one another, and value collective success.",
  },
  {
    title: "Respect",
    desc: "We treat teammates, opponents, officials, and the community with dignity and respect.",
  },
  {
    title: "Integrity",
    desc: "We act honestly, ethically, and responsibly both on and off the field.",
  },
  {
    title: "Leadership",
    desc: "We encourage initiative, responsibility, and positive influence within our teams communities.",
  },
  {
    title: "Sportsmanship",
    desc: "We compete fairly and graciously, demonstrating character in victory and defeat.",
  },
];
</script>

<template>
  <section class="section" id="about">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="section-title">WHO WE ARE</h2>
        <p class="section-subtitle">Discover what drives us to excellence</p>
      </div>
      <div class="row g-4">
        <!-- Mission -->
        <div class="col-lg-4">
          <div class="info-card">
            <div
              class="info-card-image"
              style="background-image: url(/images/flag.jpg)"
            >
              <div class="info-card-icon"><i class="fas fa-bullseye"></i></div>
            </div>
            <div class="info-card-content">
              <h3 class="info-card-title">OUR MISSION</h3>
              <p class="info-card-text">
                The mission of Wisdom Academy Football is to provide a
                supportive and challenging environment where player-athletes can
                develop their skills, build character, and achieve academic
                success. We strive to foster a culture of excellence,
                sportsmanship, and community engagement, inspiring our players
                to become leaders both on and off the field.
              </p>
            </div>
          </div>
        </div>
        <!-- Vision -->
        <div class="col-lg-4">
          <div class="info-card">
            <div
              class="info-card-image"
              style="background-image: url(/images/coaching.jpg)"
            >
              <div class="info-card-icon"><i class="fas fa-eye"></i></div>
            </div>
            <div class="info-card-content">
              <h3 class="info-card-title">OUR VISION</h3>
              <p class="info-card-text">
                To become a premier football program in the region, recognized
                for our commitment to developing well-rounded individuals who
                excel in football, academics, and life. We envision a future
                where our players are equipped with the skills, knowledge, and
                values necessary to succeed in their chosen paths and make a
                positive impact in their communities.
              </p>
            </div>
          </div>
        </div>
        <!-- Values -->
        <div class="col-lg-4">
          <div class="info-card">
            <div
              class="info-card-image"
              style="background-image: url(/images/values.jpg)"
            >
              <div class="info-card-icon"><i class="fas fa-heart"></i></div>
            </div>
            <div class="info-card-content">
              <h3 class="info-card-title">OUR VALUES</h3>
              <ul class="values-list">
                <li v-for="value in values" :key="value.title">
                  <strong>{{ value.title }}</strong
                  >{{ value.desc }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
