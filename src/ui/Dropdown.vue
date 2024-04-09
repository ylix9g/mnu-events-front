<script>
export default {
  name: 'Dropdown',
  props: {
    modelValue: Number,
    label: String,
    text: String,
    items: Array,
  },
  data() {
    return {
      active: false,
      selectedItem: null,
    }
  },
  methods: {
    toggleActive() {
      this.active = !this.active
    },
    selectItem(item) {
      this.selectedItem = item
      this.$emit('update:modelValue', item.value)
    },
  },
}
</script>

<template>
  <div class="dropdown-container">
    <label>{{ label }}</label>
    <div @click="toggleActive" :class="'dropdown' + (active ? ' active' : '')">
      <div v-if="selectedItem">{{ selectedItem.text }}</div>
      <div v-else>{{ text }}</div>
      <div class="items">
        <div v-for="item in items" @click="selectItem(item)" class="item">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

.dropdown {
  position: relative;
  padding: 8px;
  border: 2px solid darkorchid;
  font-size: 1rem;
  cursor: pointer;
}

.dropdown-container label {
  margin-bottom: 5px;
  font-weight: 500;
}

.dropdown .items {
  position: absolute;
  top: 100%;
  left: -2px;
  width: calc(100% + 4px);
  background: white;
  border: 2px solid darkorchid;
  visibility: hidden;
  opacity: 0;
  transition-duration: .3s;
}

.dropdown .item {
  padding: 8px;
}

.dropdown.active .items {
  visibility: visible;
  opacity: 1;
  transition-duration: .5s;
}
</style>
