<template>
<div class="container">
    <base-header></base-header>
    <router-link to="/doctor">doctor</router-link>
    <router-link to="/coordinator">coordinator</router-link>
    <router-link to="/login">login</router-link>
    <router-view/>
</div>
  
</template>
<script setup>


</script>
<style>
.container {
    position: relative;
    margin: auto;
    width: 1440px;
    height: 1154px;

    background: #FFFFFF;
}
</style>
