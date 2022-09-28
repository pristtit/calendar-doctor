<template>
<div class="date">
    <div :class="dayMonthClass">{{ getDateFormat(props.day) }}</div>
    <div v-if="dayNameShow" :class="dayNameClass">{{ getWeekDay(props.day) }}</div>
</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    day: {
        type: Number,
        required: true
    },
    dayMonthClass: {
        type: String,
        default: ''
    },
    dayNameClass: {
        type: String,
        default: ''
    },
    dayNameShow: {
        type: Boolean,
        default: false
    },
})

const getDate = (days) => {
    let currentDay = new Date();
    currentDay.setDate(currentDay.getDate() + days);
    return currentDay
}

const getDateFormat = (days) => {
    let currentDay = getDate(days);
    return `${("0" + (currentDay.getDate())).slice(-2)}.${("0" + (currentDay.getMonth())).slice(-2)}`
}

const getWeekDay = (days) => {
    const daysList = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];
  let currentDay = getDate(days);

  return daysList[currentDay.getDay()];
}
</script>

<style scoped>
.date {
    display: flex;
    gap: 8px;
}
</style>