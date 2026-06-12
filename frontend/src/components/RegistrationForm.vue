<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const step = ref(1);
const loading = ref(false);
const errorMsg = ref("");
const showSuccess = ref(false);

const formData = ref({
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  ageGroup: "",
  parentName: "",
  parentEmail: "",
  phone: "",
  emergencyContact: "",
  position: "",
  experience: "",
  medicalNotes: "",
});

const calculateAge = (dobString) => {
  if (!dobString) return 0;
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const validateStep = () => {
  errorMsg.value = "";
  if (step.value === 1) {
    if (!formData.value.firstName.trim()) return "First name is required.";
    if (!formData.value.lastName.trim()) return "Last name is required.";
    if (!formData.value.dob) return "Date of birth is required.";
    
    const age = calculateAge(formData.value.dob);
    if (age < 6 || age > 21) {
      return `Player must be between 6 and 21 years old. (Current age: ${age})`;
    }
    if (!formData.value.gender) return "Please select a gender.";
  } else if (step.value === 2) {
    if (!formData.value.ageGroup) return "Please select an age group.";
    if (!formData.value.position) return "Please select a preferred position.";
  } else if (step.value === 3) {
    if (!formData.value.parentName.trim()) return "Parent/Guardian name is required.";
    if (!formData.value.parentEmail.trim()) return "Parent/Guardian email is required.";
    if (!formData.value.phone.trim()) return "Phone number is required.";
  }
  return "";
};

const nextStep = () => {
  const err = validateStep();
  if (err) {
    errorMsg.value = err;
    return;
  }
  if (step.value < 3) {
    step.value++;
  }
};

const prevStep = () => {
  errorMsg.value = "";
  if (step.value > 1) {
    step.value--;
  }
};

const selectAgeGroup = (val) => {
  formData.value.ageGroup = val;
};

const submitRegistration = async () => {
  const err = validateStep();
  if (err) {
    errorMsg.value = err;
    return;
  }

  loading.value = true;
  errorMsg.value = "";

  try {
    const response = await fetch("http://localhost:5000/api/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        dob: formData.value.dob,
        ageGroup: formData.value.ageGroup,
        parentName: formData.value.parentName,
        parentEmail: formData.value.parentEmail,
        phone: formData.value.phone,
        medicalNotes: formData.value.medicalNotes,
        // Optional extras
        gender: formData.value.gender,
        emergencyContact: formData.value.emergencyContact,
        position: formData.value.position,
        experience: formData.value.experience,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration submission failed.");
    }

    showSuccess.value = true;
  } catch (err) {
    errorMsg.value = err.message || "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  step.value = 1;
  showSuccess.value = false;
  errorMsg.value = "";
  formData.value = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    ageGroup: "",
    parentName: "",
    parentEmail: "",
    phone: "",
    emergencyContact: "",
    position: "",
    experience: "",
    medicalNotes: "",
  };
  emit("close");
};
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="resetForm">
    <div class="registration-modal-card">
      <button class="close-btn" @click="resetForm">&times;</button>
      
      <!-- Success Message -->
      <div v-if="showSuccess" class="success-screen text-center">
        <i class="fas fa-check-circle success-icon mb-4"></i>
        <h2 class="success-title">REGISTRATION SUCCESSFUL!</h2>
        <p class="success-subtitle text-muted">
          We have received your academy application. Our performance coaching staff will review the details and reach out within 5-7 business days.
        </p>
        <button class="btn btn-finish mt-4" @click="resetForm">
          <i class="fas fa-home me-2"></i>RETURN TO HOMEPAGE
        </button>
      </div>

      <div v-else>
        <!-- Modal Header -->
        <div class="modal-header-section text-center">
          <div class="header-badge-icon">
            <i class="fas fa-user-plus"></i>
          </div>
          <h2 class="form-main-title">ACADEMY REGISTRATION</h2>
          <p class="form-main-subtitle">Begin your player development pathway to elite levels.</p>
        </div>

        <!-- Progress Steps -->
        <div class="progress-steps-container">
          <div class="progress-line" :style="{ width: ((step - 1) * 50) + '%' }"></div>
          <div class="step-point" :class="{ active: step >= 1, completed: step > 1 }">
            <span class="step-num">1</span>
            <span class="step-text">Profile</span>
          </div>
          <div class="step-point" :class="{ active: step >= 2, completed: step > 2 }">
            <span class="step-num">2</span>
            <span class="step-text">Academy</span>
          </div>
          <div class="step-point" :class="{ active: step >= 3 }">
            <span class="step-num">3</span>
            <span class="step-text">Submit</span>
          </div>
        </div>

        <!-- Error Alert -->
        <div v-if="errorMsg" class="alert alert-danger d-flex align-items-center mt-3 mb-2" role="alert">
          <i class="fas fa-exclamation-circle me-2"></i>
          <div>{{ errorMsg }}</div>
        </div>

        <!-- Step 1: Personal Info -->
        <div v-if="step === 1" class="step-content mt-4">
          <h4 class="step-section-title">Personal Information</h4>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">First Name <span class="text-danger">*</span></label>
              <div class="input-container">
                <i class="fas fa-user field-icon"></i>
                <input v-model="formData.firstName" type="text" class="form-control" placeholder="Enter first name" required />
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Last Name <span class="text-danger">*</span></label>
              <div class="input-container">
                <i class="fas fa-user field-icon"></i>
                <input v-model="formData.lastName" type="text" class="form-control" placeholder="Enter last name" required />
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Date of Birth <span class="text-danger">*</span></label>
              <div class="input-container">
                <i class="fas fa-calendar-alt field-icon"></i>
                <input v-model="formData.dob" type="date" class="form-control" required />
              </div>
              <div class="form-text mt-1 text-muted">
                <i class="fas fa-info-circle me-1"></i>Eligible players: 6 - 21 years old.
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Gender <span class="text-danger">*</span></label>
              <div class="input-container">
                <i class="fas fa-venus-mars field-icon"></i>
                <select v-model="formData.gender" class="form-select" required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Academy Tiers & Details -->
        <div v-if="step === 2" class="step-content mt-4">
          <h4 class="step-section-title">Academy Selection</h4>
          
          <label class="form-label mb-2">Age Group <span class="text-danger">*</span></label>
          <div class="age-selector-grid mb-4">
            <button 
              v-for="grp in [
                { id: 'U8', label: 'U8', desc: 'Under 8 yrs' },
                { id: 'U10', label: 'U10', desc: 'Under 10 yrs' },
                { id: 'U12', label: 'U12', desc: 'Under 12 yrs' },
                { id: 'U15', label: 'U15', desc: 'Under 15 yrs' },
                { id: 'U16', label: 'U16', desc: 'Under 16 yrs' },
                { id: 'U18', label: 'U18', desc: 'Under 18 yrs' },
                { id: 'Senior', label: 'Senior', desc: '18+ yrs' }
              ]"
              :key="grp.id"
              type="button"
              class="age-card-btn"
              :class="{ selected: formData.ageGroup === grp.id }"
              @click="selectAgeGroup(grp.id)"
            >
              <span class="age-main-label">{{ grp.label }}</span>
              <span class="age-sub-desc">{{ grp.desc }}</span>
            </button>
          </div>

          <div class="row g-3">
            <div class="col-md-12">
              <label class="form-label">Preferred Position <span class="text-danger">*</span></label>
              <div class="input-container">
                <i class="fas fa-running field-icon"></i>
                <select v-model="formData.position" class="form-select" required>
                  <option value="">Select preferred position</option>
                  <option value="goalkeeper">Goalkeeper</option>
                  <option value="defender">Defender</option>
                  <option value="midfielder">Midfielder</option>
                  <option value="forward">Forward / Striker</option>
                  <option value="flexible">Flexible / Multiple Positions</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Guardian Details & Experience -->
        <div v-if="step === 3" class="step-content mt-4">
          <h4 class="step-section-title">Guardian & Performance Info</h4>
          
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Parent / Guardian Name <span class="text-danger">*</span></label>
              <div class="input-container">
                <i class="fas fa-user-shield field-icon"></i>
                <input v-model="formData.parentName" type="text" class="form-control" placeholder="Full name" required />
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Parent / Guardian Email <span class="text-danger">*</span></label>
              <div class="input-container">
                <i class="fas fa-envelope field-icon"></i>
                <input v-model="formData.parentEmail" type="email" class="form-control" placeholder="email@example.com" required />
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Phone Number <span class="text-danger">*</span></label>
              <div class="input-container">
                <i class="fas fa-phone field-icon"></i>
                <input v-model="formData.phone" type="tel" class="form-control" placeholder="+1 (234) 567-8900" required />
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">Emergency Contact Phone</label>
              <div class="input-container">
                <i class="fas fa-phone-alt field-icon"></i>
                <input v-model="formData.emergencyContact" type="tel" class="form-control" placeholder="+1 (234) 567-8900" />
              </div>
            </div>
            <div class="col-md-12">
              <label class="form-label">Previous Football Experience</label>
              <div class="input-container">
                <i class="fas fa-history field-icon textarea-icon"></i>
                <textarea v-model="formData.experience" class="form-control textarea-field" rows="2" placeholder="Detail any previous academy, club, or training experience..."></textarea>
              </div>
            </div>
            <div class="col-md-12">
              <label class="form-label">Medical Conditions / Allergies</label>
              <div class="input-container">
                <i class="fas fa-notes-medical field-icon textarea-icon"></i>
                <textarea v-model="formData.medicalNotes" class="form-control textarea-field" rows="2" placeholder="List any medical issues or allergies coaches should know..."></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="modal-footer-nav d-flex justify-content-between mt-4">
          <button 
            type="button" 
            class="btn btn-secondary-custom" 
            :disabled="step === 1 || loading"
            @click="prevStep"
          >
            <i class="fas fa-chevron-left me-2"></i> BACK
          </button>
          
          <button 
            v-if="step < 3" 
            type="button" 
            class="btn btn-primary-custom" 
            @click="nextStep"
          >
            NEXT <i class="fas fa-chevron-right ms-2"></i>
          </button>
          
          <button 
            v-else 
            type="button" 
            class="btn btn-gold-submit" 
            :disabled="loading"
            @click="submitRegistration"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            <i v-else class="fas fa-paper-plane me-2"></i> SUBMIT REGISTRATION
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(4, 10, 20, 0.75);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.registration-modal-card {
  background: rgba(10, 22, 40, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  width: 100%;
  max-width: 680px;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  color: white;
  animation: modalFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  max-height: 95vh;
  overflow-y: auto;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: color 0.2s;
  line-height: 1;
}

.close-btn:hover {
  color: var(--accent-gold);
}

/* Header style */
.modal-header-section {
  margin-bottom: 2rem;
}

.header-badge-icon {
  width: 60px;
  height: 60px;
  background: var(--accent-gold);
  border-radius: 50%;
  color: var(--primary-navy);
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.35);
}

.form-main-title {
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  letter-spacing: 1px;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.form-main-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

/* Steps progress bar */
.progress-steps-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 0 auto 2.5rem;
  max-width: 480px;
  z-index: 1;
}

.progress-steps-container::before {
  content: "";
  position: absolute;
  top: 18px;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  z-index: -1;
}

.progress-line {
  position: absolute;
  top: 18px;
  left: 0;
  height: 3px;
  background: var(--accent-gold);
  transition: width 0.3s ease;
  z-index: -1;
}

.step-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80px;
}

.step-num {
  width: 38px;
  height: 38px;
  background: #1e293b;
  border: 2px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: all 0.3s ease;
}

.step-text {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s ease;
}

.step-point.active .step-num {
  border-color: var(--accent-gold);
  background: var(--primary-navy);
  color: var(--accent-gold);
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.25);
}

.step-point.active .step-text {
  color: var(--accent-gold);
}

.step-point.completed .step-num {
  background: var(--accent-gold);
  border-color: var(--accent-gold);
  color: var(--primary-navy);
}

.step-point.completed .step-text {
  color: white;
}

/* Fields design */
.step-section-title {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--accent-gold);
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.5px;
  margin-bottom: 0.4rem;
}

.input-container {
  position: relative;
  width: 100%;
}

.field-icon {
  position: absolute;
  top: 50%;
  left: 1.25rem;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.45);
  pointer-events: none;
  font-size: 0.95rem;
}

.textarea-icon {
  top: 1.25rem;
  transform: none;
}

.form-control,
.form-select {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border-radius: 12px;
  padding: 0.75rem 1rem 0.75rem 2.75rem !important;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.form-select option {
  background: #0f1c30;
  color: white;
}

.textarea-field {
  padding-left: 2.75rem !important;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--accent-gold) !important;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.15) !important;
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

/* Custom Age button selector grid */
.age-selector-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.75rem;
}

.age-card-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: white;
  border-radius: 12px;
  padding: 0.8rem 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease;
}

.age-card-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
}

.age-card-btn.selected {
  background: rgba(245, 158, 11, 0.12);
  border-color: var(--accent-gold);
  color: var(--accent-gold);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.1);
}

.age-main-label {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
}

.age-sub-desc {
  font-size: 0.7rem;
  opacity: 0.75;
  margin-top: 0.2rem;
  text-align: center;
}

/* Nav footer buttons */
.btn-primary-custom {
  background: var(--accent-gold);
  color: var(--primary-navy);
  font-weight: 700;
  border: none;
  border-radius: 30px;
  padding: 0.75rem 2rem;
  transition: all 0.3s;
}

.btn-primary-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(245, 158, 11, 0.35);
  background: #fbbf24;
}

.btn-secondary-custom {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 0.75rem 2rem;
  transition: all 0.2s;
}

.btn-secondary-custom:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.18);
}

.btn-secondary-custom:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-gold-submit {
  background: linear-gradient(135deg, var(--accent-gold) 0%, #d97706 100%);
  color: var(--primary-navy);
  font-weight: 800;
  border: none;
  border-radius: 30px;
  padding: 0.75rem 2.25rem;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
}

.btn-gold-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.45);
}

/* Success panel design */
.success-screen {
  padding: 2.5rem 1rem;
}

.success-icon {
  font-size: 5rem;
  color: #10b981;
  filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.3));
}

.success-title {
  font-family: "Montserrat", sans-serif;
  font-weight: 900;
  color: white;
  letter-spacing: 1px;
}

.success-subtitle {
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 480px;
  margin: 1.5rem auto 0;
  color: rgba(255, 255, 255, 0.75) !important;
}

.btn-finish {
  background: var(--accent-gold);
  color: var(--primary-navy);
  border-radius: 30px;
  padding: 0.85rem 2.5rem;
  font-weight: 800;
  border: none;
  transition: all 0.3s;
}

.btn-finish:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4);
}
</style>
