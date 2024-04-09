<script>
import { useAuthStore } from '@/store/authStore.js'
import Button from '@/ui/Button.vue'

export default {
  name: 'Header',
  components: { Button },
  data() {
    return {
      authStore: useAuthStore(),
    }
  },
  methods: {
    logoutButtonClickHandler() {
      const authStore = useAuthStore()
      authStore.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<template>
  <header class="header">
    <div class="container">
      <RouterLink to="/" class="logo">
        <h1>MNU Events</h1>
      </RouterLink>
      <!--      <RouterLink to="/news">-->
      <!--        <Button>Новости</Button>-->
      <!--      </RouterLink>-->
      <RouterLink to="/events" v-if="authStore.user">
        <Button>События</Button>
      </RouterLink>
      <Button @click="logoutButtonClickHandler" v-if="authStore.user">Выйти</Button>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 70px;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 0 10px rgb(0, 0, 0, .4);
}

.header > .container {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  height: 100%;
}

.header .logo {
  display: flex;
  align-items: center;
  margin-right: auto;
  text-decoration: none;
}

.header .logo h1 {
  font-size: 1.3rem;
  font-weight: 700;
  color: darkorchid;
}
</style>
