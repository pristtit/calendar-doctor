<template>
    <div class="date-container" @click.stop="choosedWeek>1 ? choosedWeek-- : ''">
        <div class="date__arrow-left"></div>

         <date-item
            class="date"
            v-for="day of 7"
            :key="day"
            :class="{ choosedDay: choosedDay === day + 7*(choosedWeek-1) }"
            @click.stop="choosedDay = day + 7*(choosedWeek-1)"

            :dayMonthClass="'day_margin'"
            :day="day-1 + 7*(choosedWeek-1)"
            :dayNameShow="true"
        ></date-item>

        <div class="date__arrow-right" @click.stop="choosedWeek<4 ? choosedWeek++ : ''"></div>
    </div>

    <table class="calendar">
        <thead>
            <tr>
                <th class="calendar__date"></th>
                <th
                    class="calendar__date"
                    v-for="hour of 24"
                    :key="hour"
                    :class="{ 'hour-free': isHourFree }"
                >
                    {{ ("0" + (hour-1)).slice(-2) }}
                </th>
            </tr>
        </thead>
        <tbody class="calendar__body">
            <tr class="calendar__line" v-for="(doctor, index) of backEnd.schedule" :key="index">
                <td
                    class="calendar__schedule-name"
                    :class="{ 'calendar__schedule-first': index === 0 }"
                    >{{ doctor.name }}</td>
                <td
                    class="calendar__schedule"
                    v-for="hour of 24"
                    :key="hour"
                    
                ><div :class="scheduleClass(doctor.calendar, hour-1, choosedDay)"></div></td>
            </tr>
        </tbody>
    </table>
</template>


<script setup>
import DateItem from '@/components/DateItem.vue';
import useHoursClass from '@/hooks/useHoursClass';
import { useServer } from '@/stores/useServer';
import { ref } from 'vue';

const choosedWeek = ref(1);
const choosedDay = ref(1);
const {scheduleClass} = useHoursClass();

const backEnd = useServer();

</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat');
.date-container {
    display: flex;
    position: absolute;
    left: 228px;
    top: 99px;
    gap: 20px;
    cursor: pointer;
}
.date__arrow-left {
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
.date__arrow-right {
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


.calendar {
    position: absolute;
    left: 150px;
    top: 186px;
    border: 1px solid red;
    border-collapse: collapse;
}
.calendar__date {
    border: 1px solid red;
    height: 40px !important;
}
.calendar__line:hover {
    background: #B5D9FD;
    border-radius: 30px;
    position: relative;
    z-index: 100;
}
.calendar__schedule {
    border-right: 1px solid red;
    width: 40px;
    position: relative;
}
.calendar__schedule-name {
    
    border-right: 1px solid red;
    width: 196px;
    padding-left: 29px;

    font-family: 'Montserrat';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 150%;
/* or 18px */

display: flex;
align-items: center;

color: #000000;
}
.calendar__schedule-first {
    padding-top: 29px;
}




















.line {
    width: 100%;
    border-bottom: 1px solid #D1DCE5;
    position: relative;
    top: -1px;
}


.hour-container {
    display: flex;
    align-self: flex-end;
}
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


.schedule-container {
    display: flex;
    flex-direction: column;
    padding: 29px 0 0 29px;
    gap: 10px;
}
.schedule {
    display: flex;
}
.schedule__name {
    width: 196px;
}
.schedule__hours {
    height: 10px;
    width: 48px;
}


.choosed {
    position: absolute;
    z-index: 10;
    background: #47E69A;
    height: 10px;
    width: 44px;
    left: -1px;
    bottom: 5px;
}
.choosed_left-border {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.choosed_right-border {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}


.day_margin {
    margin-right: 9px;
}


.choosedDay {
    background-color: #73AEEA;
}
</style>