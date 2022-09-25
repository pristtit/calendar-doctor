<template>
    <div class="logo">
        <div class="logo__heart">
            <div class="logo__heart-1"></div>
            <div class="logo__heart-2"></div>
        </div>
        <div class="logo__title">
            <div class="logo__title-1"><strong>ЧЕСТНАЯ</strong></div>
            <div class="logo__title-2"><strong>МЕДЕЦИНА</strong></div>
        </div>
        <button
            v-show="authData"
            class="logo__btn-out"
            @click="clearAuthData"
        >Выйти</button>
    </div>
</template>


<script>
import { mapState, mapActions  } from 'pinia'
import { useUser } from "@/stores/useUser";

export default {
  name: 'base-header',

  computed: {
    ...mapState(useUser, ['authData']),
  },

   methods: {
    ...mapActions(useUser, ['clearAuthData'])
  },
}
</script>


<style scoped>
.logo {
    display: flex;
    position: relative;
    height: 53px;
    border-bottom: 1px solid #D1DCE5;
}
.logo__heart-2 {
    position: absolute;
    top: 14px;
    left: 27px;
    border-radius: 12px 12px 2px 0;
    background: #EB5757;
    width: 13px;
    height: 19.5px;
    transform: rotate(45deg);
}

.logo__heart-1 {
    position: absolute;
    top: 15px;
    left: 20px;
    border-radius: 50%;
    background: linear-gradient(135.21deg, #EB5757 16.52%, #DD4B4B 52.8%, #CF3F3F 61.09%);
    width:  13px;
    height: 13px;
}

.logo__title {
    position: absolute;
    top: 15px;
    left: 59px;
    height: 22px;

    font-size: 11px;
    line-height: 8px;
    letter-spacing: 2px;
    font-family: 'Arial';
    font-style: normal;
}
.logo__title-1 {
    margin-bottom: 4px;
}

.logo__btn-out {
    position: absolute;
    align-self: center;
    right: 0px;
}
</style>