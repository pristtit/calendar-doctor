<template>
<div
    class="hours"
    :class="{ choosed: isHourChoosed, firstElement: isFirstElement }"
>
    {{ ("0" + (props.hour-1)).slice(-2) }}
</div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    day: {
        type: Number,
    },
    hour: {
        type: Number,
        required: true
    },
    choosedWeek: {
        type: Number,
    },
    choosed: {
        type: Array,
    },
})

const isHourChoosed = computed(() => {
    return props.choosed?.find(
        item => item.day === props.day + 7*(props.choosedWeek-1) && item.hour === props.hour-1
    )
});

const isFirstElement = computed(() => {
    return props.choosed?.find(
        item => item.day === props.day + 7*(props.choosedWeek-1) && item.hour === props.hour-1 && item.firstElement
    )
});

</script>

<style scoped>
.hours {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #D1DCE5;
    font-family: 'Montserrat';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 150%;
color: #636363;
}
.hours:hover {
    cursor: pointer;
}
.choosed {
    background: #73AEEA;
    color: #FFFFFF;
}
.firstElement {
    background: #2D87E2;
}
</style>