<template>
    <base-login
        class="login"
        @Login="LoginIn"
    >
        <h3>Авторизация</h3>
    </base-login>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useUser } from "@/stores/useUser";
import { useServer } from '@/stores/useServer';

const router = useRouter();
const userStore = useUser();
const backEnd = useServer();

const LoginIn = (authInfo) => {
    let authData;
    
    if ( (authData = backEnd.userRole(authInfo)) ) {
        localStorage.setItem("userAuthData", JSON.stringify(authData));
        userStore.setAuthData(authData);

        router.push({ name: `${authData.role}` });
    }
}
</script>


<style scoped>
.login {
    width: 300px;
    margin: 200px auto;
}
</style>