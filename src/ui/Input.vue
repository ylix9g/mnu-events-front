<script>
export default {
  name: 'Input',
  props: {
    modelValue: String,
    label: String,
    placeholder: {
      type: String,
      default: '',
    },
    password: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <div class="text-field">
    <label>{{ label }}</label>
    <input
        :type="!password ? 'text' : 'password'"
        :value="modelValue"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.text-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

.text-field label {
  margin-bottom: 5px;
  font-weight: 500;
}

.text-field input {
  padding: 8px;
  border: 2px solid #ccc;
  font-size: 1rem;
}

.text-field input:focus {
  border-color: darkorchid;
}
</style>
