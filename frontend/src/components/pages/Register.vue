<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <h2 class="mb-4">Player Registration</h2>
      <form @submit.prevent="submit" class="card p-4 shadow-sm">
        <div class="mb-3"><label class="form-label">First Name</label><input v-model="form.firstName" class="form-control" required /></div>
        <div class="mb-3"><label class="form-label">Last Name</label><input v-model="form.lastName" class="form-control" required /></div>
        <div class="mb-3"><label class="form-label">Date of Birth</label><input v-model="form.dob" type="date" class="form-control" required /></div>
        <div class="mb-3"><label class="form-label">Parent Email</label><input v-model="form.parentEmail" type="email" class="form-control" required /></div>
        <button type="submit" class="btn btn-success w-100" :disabled="loading">{{ loading ? 'Submitting...' : 'Submit Application' }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '../../services/api'

const form = reactive({ firstName: '', lastName: '', dob: '', parentEmail: '' })
const loading = ref(false)

const submit = async () => {
  loading.value = true
  try {
    await api.post('/registrations', form)
    alert('✅ Registration submitted! We will contact you shortly.')
    Object.assign(form, { firstName: '', lastName: '', dob: '', parentEmail: '' })
  } catch (e) { alert('❌ ' + e.message) }
  finally { loading.value = false }
}
</script>