<script>
import Input from '@/ui/Input.vue'

export default {
  name: 'TextArea',
  components: { Input },
  props: {
    modelValue: String,
    label: String,
    placeholder: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div class="text-area">
    <label>{{ label }}</label>
    <textarea
        :value="modelValue"
        :placeholder="placeholder"
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
  border: 2px solid #ccc;
  font-size: 1rem;
}

.text-area textarea:focus {
  border-color: darkorchid;
}
</style>
