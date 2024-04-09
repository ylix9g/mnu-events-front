<script>
export default {
  name: 'Checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: this.modelValue,
    }
  },
  methods: {
    changeValue() {
      const newValue = !this.value
      this.$emit('update:modelValue', newValue)
      this.value = !this.value
    },
  },
}
</script>

<template>
  <div @click="changeValue" :class="'checkbox' + (value ? ' active' : '')">
    <div class="check"></div>
    <span class="text"><slot/></span>
  </div>
</template>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  font-weight: 500;
}

.checkbox .check {
  width: 24px;
  height: 24px;
  margin-right: 15px;
  border: 2px solid darkorchid;
  transition-duration: .3s;
}

.checkbox.active .check {
  background: darkorchid;
  transition-duration: .5s;
}

.checkbox:hover {
  cursor: pointer;
}
</style>








