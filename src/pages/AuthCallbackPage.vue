<script>
import axios from 'axios'
import { useAuthStore } from '@/store/authStore.js'

export default {
  name: 'AuthCallbackPage',
  created() {
    const params = new URLSearchParams(location.search)
    const oauth = JSON.parse(localStorage.getItem('oauth'))
    sessionStorage.removeItem('oauth')
    if (!(params.get('state') && oauth.state && params.get('state') === oauth.state)) {
      console.log('Error')
      return
    }
    axios
        .post('/oauth/token', {
          'grant_type': 'authorization_code',
          'client_id': 1,
          'code_verifier': oauth.code_verifier,
          'redirect_uri': 'http://localhost:5173/auth/callback',
          'code': params.get('code'),
        })
        .then(response => {
          const data = response.data
          const authStore = useAuthStore()
          const tokenInfo = {
            accessToken: data.access_token,
            expiresIn: Date.now() + (data.expires_in * 1_000)
          }
          localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo))
          authStore
              .checkToken(tokenInfo)
              .then(() => {
                this.$router.push('/')
              })
        })
  },
}
</script>

<template>

</template>

<style scoped>

</style>
