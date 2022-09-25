import router from '@/router';
import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
    state: () => ({
        userAuthData: JSON.parse(localStorage.getItem('userAuthData')),
    }),

    getters: {
        authData: (state) => state.userAuthData,
    },

    actions: {
        setAuthData(authData) {
            this.userAuthData = authData;
        },

        clearAuthData() {
            this.userAuthData = null;
            localStorage.removeItem('userAuthData');
            
            router.push({ name: 'login' })
        },
    }
})