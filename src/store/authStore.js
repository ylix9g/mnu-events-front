import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore({
    id: 'auth',
    state() {
        return {
            tokenInfo: JSON.parse(localStorage.getItem('tokenInfo')),
            user: null,
        }
    },
    actions: {
        async checkToken(tokenInfo = null) {
            if (tokenInfo) this.tokenInfo = tokenInfo
            let error = false
            if (this.tokenInfo.expiresIn > Date.now()) {
                if (!this.user) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${this.tokenInfo.accessToken}`
                    axios
                        .get('/api/user')
                        .then(response => {
                            this.user = response.data
                            console.log(response.data)
                        })
                        .catch(() => {
                            error = true
                        })
                }
            } else {
                error = true
            }
            if (error) {
                throw new Error()
            }
        },
        logout() {
            localStorage.removeItem('tokenInfo')
            this.tokenInfo = null
            this.user = null
        },
    },
})
