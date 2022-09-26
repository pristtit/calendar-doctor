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

    <div class="calendar">
        <div class="hour-container">
            <div
                class="hours"
                v-for="hour of 24"
                :key="hour"
                :class="{ 'hour-free': isHourFree }"
            >
                {{ ("0" + (hour-1)).slice(-2) }}
            </div>
        </div>

        <div class="line"></div>
        
        <div class="schedule-container">
            <div class="schedule" v-for="(doctor, index) of backEnd.schedule" :key="index">
                <div class="schedule__name">{{ doctor.name }}</div>
                <div
                    class="schedule__hours"
                    v-for="hour of 24"
                    :key="hour"
                    :class="scheduleClass(doctor.calendar, hour-1, choosedDay)"
                ></div>
            </div>
        </div>
    </div>

    <table class="calendar">
        <thead>
            <tr>
                <th></th>
                <th
                    v-for="hour of 24"
                    :key="hour"
                    :class="{ 'hour-free': isHourFree }"
                >
                    {{ ("0" + (hour-1)).slice(-2) }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(doctor, index) of backEnd.schedule" :key="index">
                <td>{{ doctor.name }}</td>
                <td
                    v-for="hour of 24"
                    :key="hour"
                    :class="scheduleClass(doctor.calendar, hour-1, choosedDay)"
                ></td>
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
.date-container {
    display: flex;
    position: absolute;
    left: 228px;
    top: 99px;
    gap: 20px;
    cursor: pointer;
}
.date {

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
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 150px;
    top: 186px;
    border: 1px solid red;
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
    background: #47E69A;
}
.choosed_left-border {
    border-radius: 10px 0 0 10px;
}
.choosed_right-border {
    border-radius: 0 10px 10px 0;
}


.day_margin {
    margin-right: 9px;
}


.choosedDay {
    background-color: #73AEEA;
}
</style>