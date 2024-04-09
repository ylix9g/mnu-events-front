<script>
export default {
  name: 'Button',
}
</script>

<template>
  <button><slot/></button>
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

  button:hover {
    background: darkorchid;
    color: white;
    transition-duration: .5s;
  }
</style>
