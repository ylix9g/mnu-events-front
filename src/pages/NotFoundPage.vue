<script>
export default {
  name: 'NotFoundPage',
}
</script>

<template>
  <div class="not-found">
    <div class="container">
      <h2>404 - Not Found</h2>
      <p>(Страница не найдена)</p>
    </div>
  </div>
</template>

<style scoped>
.not-found .container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  font-weight: 700;
  text-align: center;
  line-height: 1.5;
  color: darkorchid;
}

.not-found h2 {
  font-size: 3rem;
  margin-bottom: 25px;
}

.not-found p {
  font-size: 2rem;
}
</style>
