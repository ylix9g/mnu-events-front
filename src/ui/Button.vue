<script>
export default {
  name: 'Button',
  props: {
    buttonStyle: {
      type: String,
      default: 'primary',
    }
  },
}
</script>

<template>
  <button type="button" :class="buttonStyle"><slot/></button>
</template>

<style scoped>
  button {
    padding: 8px 15px;
    background: inherit;
    border: 2px solid darkorchid;
    font-size: 1rem;
    font-weight: 500;
    color: darkorchid;
    cursor: pointer;
    transition-duration: .3s;
  }

  button.danger {
    border-color: darkred;
    color: darkred;
  }

  button:hover {
    background: darkorchid;
    color: white;
    transition-duration: .5s;
  }

  button.danger:hover {
    background: darkred;
  }
</style>
