<script>
import Input from '@/ui/Input.vue'

export default {
  name: 'TextArea',
  components: { Input },
  props: {
    modelValue: String,
    label: String,
  },
}
</script>

<template>
  <div class="text-area">
    <label>{{ label }}</label>
    <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.text-area {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

.text-area label {
  margin-bottom: 5px;
  font-weight: 500;
}

.text-area textarea {
  resize: none;
  height: 200px;
  padding: 8px;
  border: 2px solid darkorchid;
  font-size: 1rem;
}
</style>
