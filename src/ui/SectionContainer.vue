<script>
export default {
  name: 'SectionContainer',
  props: {
    title: String,
  },
}
</script>

<template>
  <div class="section-container">
    <h2 v-if="title">{{ title }}</h2>
    <slot/>
  </div>
</template>

<style scoped>
.section-container {
  width: 800px;
  margin: 50px auto;
  padding: 25px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, .4);
}

.section-container h2 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.5rem;
}
</style>
