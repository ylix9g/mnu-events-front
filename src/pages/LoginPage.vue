<script>
import Button from '@/ui/Button.vue'
import pkceChallenge from 'pkce-challenge'

export default {
  name: 'LoginPage',
  components: { Button },
  methods: {
    async buttonClickHandler() {
      const state = crypto.randomUUID()
      const challenge = await pkceChallenge(128)
      localStorage.setItem('oauth', JSON.stringify({
        state,
        code_verifier: challenge.code_verifier,
      }))
      const params = new URLSearchParams()
      params.append('response_type', 'code')
      params.append('client_id', '1')
      params.append('redirect_uri', 'http://localhost:5173/auth/callback')
      params.append('state', state)
      params.append('code_challenge', challenge.code_challenge)
      params.append('code_challenge_method', 'S256')
      location.href = `https://inspiring-maxwell.194-39-65-20.plesk.page/oauth/authorize?${params.toString()}`
    },
  },
}
</script>

<template>
  <div class="login">
    <div class="container">
      <h2>401 - Unauthorized<br></h2>
      <p>Для доступа к MNU Events необходимо пройти авторизацию.</p>
      <Button @click="buttonClickHandler" class="button">Перейти на страницу авторизации</Button>
    </div>
  </div>
</template>

<style scoped>
.login .container {
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

.login h2 {
  font-size: 3rem;
  margin-bottom: 25px;
}

.login p {
  font-size: 2rem;
}

.login .button {
  margin-top: 25px;
  font-size: 2rem;
}
</style>
