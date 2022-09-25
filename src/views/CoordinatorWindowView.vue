<template>
    <div>Координатор</div>
    <div class="day-container" @click.stop="choosedWeek>1 ? choosedWeek-- : ''">
        <div class="day__arrow-left"></div>

         <date-item
            class="day"
            v-for="day of 7"
            :key="day"
            :class="{ choosedDay: choosedDay === day + 7*(choosedWeek-1) }"
            @click.stop="choosedDay = day + 7*(choosedWeek-1)"

            :dayMonthClass="'day_margin'"
            :day="day-1 + 7*(choosedWeek-1)"
            :dayNameShow="true"
        ></date-item>

        <div class="day__arrow-right" @click.stop="choosedWeek<4 ? choosedWeek++ : ''"></div>
    </div>

    <div class="hour-container">
                <hour-item
                    v-for="hour of 24"
                    :key="hour"

                    :hour="hour"
                ></hour-item>
            </div>
</template>


<script setup>
import DateItem from '@/components/DateItem.vue';
import HourItem from '@/components/hourItem.vue';
import { ref } from 'vue';
const choosedWeek = ref(1);
const choosedDay = ref(1);
</script>


<style>
.hour-container {
    display: flex;
    position: absolute;
    left: 345px;
    top: 186px;
}
.day-container {
    display: flex;
    position: absolute;
    left: 228px;
    top: 99px;
    gap: 20px;
    cursor: pointer;
}
.day_margin {
    margin-right: 9px;
}

.day__arrow-left {
    box-sizing: border-box;

    width: 32px;
    height: 32px;

    border: 1px solid #73AEEA;
    border-radius: 40px;
    background: url('@/assets/Shape.svg');
    background-size: 10px 12px;
    background-repeat: no-repeat;
    background-position: center;
}
.day__arrow-right {
    box-sizing: border-box;

    width: 32px;
    height: 32px;

    border: 1px solid #73AEEA;
    border-radius: 40px;
    background: url('@/assets/Shape.svg');
    background-size: 10px 12px;
    background-repeat: no-repeat;
    background-position: center;
    transform: rotate(180deg);
}
.choosedDay {
    background-color: #73AEEA;
}
</style>