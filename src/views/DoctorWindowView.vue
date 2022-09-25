<template>
    <div class="user-name-container">
        <div class="user-name__icon-1"></div>
        <div class="user-name__icon-2"></div>
        <div class="user-name">{{ userStore.authData.name }}</div>
    </div>

    <div class="week-container">
        <div
            v-for="week of 4"
            :key="week"
            @click="changeWeek(week)"
            class="week"
            :class="{ choosedWeek: choosedWeek === week }"
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
                <hour-item
                    @click.stop="chooseHour( day + 7*(choosedWeek-1), hour-1 )"
                    @click="sendCalendar( userStore.authData.id, choosed)"
                    v-for="hour of 24"
                    :key="hour"

                    :day="day"
                    :hour="hour"
                    :choosed-week="choosedWeek"
                    :choosed="choosed"
                ></hour-item>
            </div>
            
        </div>
    </div>
    
</template>


<script setup>
import { useServer } from '@/stores/useServer';
import { useUser } from '@/stores/useUser';
import { ref } from 'vue';
import HourItem from '@/components/hourItem.vue';
import DateItem from '@/components/DateItem.vue';

const userStore = useUser();
const backEnd = useServer();

const choosed = ref([]);
const choosedWeek = ref(1);

const chooseHour = (day, hour) => {
    let arrIndex
    choosed.value.forEach((item, index) => {
        if (item.day === day && item.hour === hour) arrIndex = index;
    })

    if (arrIndex === undefined) {
        if (choosed.value.find(item => item.day === day)) {
            choosed.value.push({ day, hour });
        } else {
            choosed.value.push({ day, hour, isFirst: true, firstElement: true});
            for (let index = 1; index < 4; index++) {
                if (hour + index > 24) break
                choosed.value.push({ day, hour: hour + index, isFirst: true });
            }
        }
    } else {
        if (choosed.value[arrIndex].isFirst) {
            choosed.value = choosed.value.filter(item => !(item.day === day && item.isFirst));
        } else {
            choosed.value = choosed.value.filter(item => !(item.day === day && item.hour === hour));
        }
    }

}

const changeWeek = (week) => {
    choosedWeek.value = week;
}

let timer;
const sendCalendar = (id, calendar) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        backEnd.sendCalendar(id, calendar);
    }, 2_000);
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat');
.hour-container {
    display: flex;
    margin: 5px 0 20px 0;

}
.user-name {
    position: absolute;
    left: 174px;
    top: 109px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    color: #000000;
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
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
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

.choosedWeek {
    color: #233B4C;
}

.day__date {
    width: 30px;
    height: 18px;
    gap: 9px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    color: #636363;
}
.day__date_color {
    color: #000000;
}
</style>