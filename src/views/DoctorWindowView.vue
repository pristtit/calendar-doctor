<template>
    <div class="user-name-container">
        <div class="user-name__icon-1"></div>
        <div class="user-name__icon-2"></div>
        <div class="user-name">{{ userStore.authData?.name }}</div>
    </div>

    <div class="week-container">
        <div
            v-for="week of 4"
            :key="week"
            @click="changeWeek(week)"
            class="week"
            :class="{ week_black: choosedWeek === week }"
        >
            <date-item class="weeks__date" :day="(week-1)*7"></date-item>
            <date-item :day="week*7-1"></date-item>
        </div>
        
    </div>

    <div class="day-container">
        <div
            class="day"
            v-for="day of 7"
            :key="day"
        >
            <date-item
                class="day__date"
                :dayMonthClass="'day__date_color'"
                :day="day-1 + 7*(choosedWeek-1)"
                :dayNameShow="true"
            ></date-item>

            <div class="hour-container">
                <div
                    class="hour"
                    :class="{
                        'hour_blue': isHourChoosed(choosed, hour-1, day + 7*(choosedWeek-1)),
                        'hour_dark-blue': isFirstElement(choosed, hour-1, day + 7*(choosedWeek-1))
                    }"
                    @click.stop="
                        chooseHour( day + 7*(choosedWeek-1), hour-1, choosed ),
                        sendCalendar( userStore.authData.name, choosed)
                    "
                    v-for="hour of 24"
                    :key="hour"
                >
                    {{ ("0" + (hour-1)).slice(-2) }}
                </div>
            </div>
            
        </div>
    </div>
    
</template>


<script setup>
import { useUser } from '@/stores/useUser';
import { ref } from 'vue';
import DateItem from '@/components/DateItem.vue';
import useHoursClass from '@/hooks/useHoursClass';
import useChooseHour from "@/hooks/useChooseHour";

const userStore = useUser();

const choosed = ref({});
const choosedWeek = ref(1);

const { isHourChoosed, isFirstElement } = useHoursClass();
const { chooseHour, sendCalendar } = useChooseHour();

const changeWeek = (week) => {
    choosedWeek.value = week;
}
</script>


<style scoped>
.hour {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 48px;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #D1DCE5;

    font-size: 12px;
    color: #636363;
}
.hour:hover {
    cursor: pointer;
}
.hour_blue {
    background: #73AEEA;
    color: #FFFFFF;
}
.hour_dark-blue {
    background: #2D87E2;
}
.hour-container {
    display: flex;
    margin: 5px 0 20px 0;

}
.user-name {
    position: absolute;
    left: 174px;
    top: 109px;
    font-weight: 400;
    font-size: 20px;
}
.user-name__icon-1 {
    position: absolute;
    top: 118px;
    left: 150px;
    background: url('@/assets/Vector1.svg');
    width: 14px;
    height: 14px;
    background-size: 14px 14px;
}
.user-name__icon-2 {
    position: absolute;
    top: 116px;
    left: 156px;
    background: url('@/assets/Vector2.svg');
    width: 10px;
    height: 10px;
    background-size: 10px 10px;
}
.week-container {
    position: absolute;
    left: 150px;
    top: 176px;

    display: flex;
    gap: 38px;
    cursor: pointer;
}
.weeks__date {
    display: flex;
}
.weeks__date::after {
    content: '-';
    margin: 0 5px 0 5px;
}
.week {
    font-size: 18px;
    line-height: 18px;

    display: flex;
    align-items: center;

    color: #4796E6;
    border-bottom: 1px dashed #4796E6;
}

.day {
    display: flex;
    flex-direction: column;
}
.day-container {
position: absolute;
left: 150px;
top: 230px;
}

.week_black {
    color: #233B4C;
}

.day__date {
    width: 30px;
    height: 18px;
    gap: 9px;

    font-size: 12px;
    color: #636363;
}
.day__date_color {
    color: #000000;
}
</style>