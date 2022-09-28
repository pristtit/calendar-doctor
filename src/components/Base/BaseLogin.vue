<template>
    <div class="login">
        <slot></slot>
        <base-input
            v-model="authInfo.login"
            class="input"
            placeholder="Логин"
        />
        <base-input
            v-model="authInfo.password"
            class="input"
            placeholder="Пароль"
        />

        <base-button
            @click="Login"
            class="button"
        >
            {{ buttonText }}
        </base-button>

    </div>
</template>

<script>
export default {
    name: 'base-login',
    props: {
        buttonText: {
            type: String,
            default: 'Войти'
        }
    },

    data() {
        return {
            authInfo: {
                login: '',
                password: '',
            }
        }
    },

    methods: {
        Login() {
            this.$emit('login', this.authInfo)
            this.authInfo = {
                login: '',
                password: '',
            }
        }
    }
}

</script>

<style scoped>
.login {
    display: flex;
    flex-direction: column;
    align-items: center;

}
.button {
    align-self: end;
}
</style>