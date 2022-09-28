<template>
    <div class="date-container" @click.stop="choosedWeek>1 ? choosedWeek-- : ''">
        <div class="date__arrow"></div>

        <div class="date-item-container">
            <date-item
                v-for="day of 7"
                :key="day"

                class="date-item"
                :class="{ 'date-item_choosed': choosedDay === day + 7*(choosedWeek-1) }"
                @click.stop="choosedDay = day + 7*(choosedWeek-1)"

                :dayNameClass="'date-item_name-font'"
                :dayMonthClass="'day-item_month-font'"
                :day="day-1 + 7*(choosedWeek-1)"
                :dayNameShow="true"
            ></date-item>
        </div>

        <div class="date__arrow date__arrow_right" @click.stop="choosedWeek<4 ? choosedWeek++ : ''"></div>
    </div>

    <div class="coordinator__button-container">
        <button
            v-show="!isEditing"
            @click="editSwitch"
            class="coordinator__button"
        >
            Добавить врача
        </button>
        <button
            v-show="isEditing"
            @click="addDoctor"
            class="coordinator__button"
        >
            Сохранить
        </button>
        <button
            v-show="isEditing"
            @click="editSwitch"
            class="coordinator__button"
        >
            Отменить
        </button>
    </div>
    
    <table class="calendar">
        <thead>
            <tr>
                <th class="calendar__date calendar__date_void-width"></th>
                <th
                    class="calendar__date calendar__date_item-width"
                    v-for="hour of 24"
                    :key="hour"
                    :class="{ 'calendar__date_red': isHourFree(hour-1) }"
                >
                    {{ ("0" + (hour-1)).slice(-2) }}
                </th>
            </tr>
        </thead>
        <tbody class="calendar__body">
            <tr v-show="isEditing">
                <td :class="{ 'calendar__schedule-first': isEditing }" class="calendar__schedule-name"><input type="text" v-model="newDoctorSchedule.name"></td>
                <td
                    class="calendar__schedule"
                    v-for="hour of 24"
                    :key="hour"
                    @click="chooseHour( choosedDay, hour-1, newDoctorSchedule.calendar )"
                >
                    <div :class="scheduleClass(newDoctorSchedule.calendar, hour-1, choosedDay)"></div>
                </td>
            </tr>
            <tr class="calendar__line" v-for="(doctor, index) of backEnd.schedule" :key="index">
                <td
                    class="calendar__schedule-name"
                    :class="{ 'calendar__schedule-first': index === 0 && !isEditing }"
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
import useChooseHour from "@/hooks/useChooseHour";
import { useServer } from '@/stores/useServer';
import { ref, computed } from 'vue';

const choosedWeek = ref(1);
const choosedDay = ref(1);
const isEditing = ref(false);
const newDoctorSchedule = ref({ name: '', calendar: {} });
const { scheduleClass } = useHoursClass();
const { chooseHour } = useChooseHour();
const backEnd = useServer();


const editSwitch = () => {
    isEditing.value = !isEditing.value;
    clearNewDoctorSchedule();
}

const clearNewDoctorSchedule = () => newDoctorSchedule.value = { name: '', calendar: {} }

const addDoctor = () => {
    backEnd.sendCalendar(newDoctorSchedule.value.name, newDoctorSchedule.value.calendar);
    editSwitch();
}

const isHourFree = computed(() => function(hour) {
    let isHourFree = true;
    backEnd.schedule.forEach(item => {
        item.calendar[choosedDay.value]?.forEach(item => { if (item.hour === hour) isHourFree = false})
    })
    return isHourFree
})
</script>


<style>
.date-container {
    display: flex;
    align-items: center;
    gap: 46px;

    position: absolute;
    left: 150px;
    top: 95px;
    
    cursor: pointer;
}

.date-item-container {
    display: flex;
    gap: 10px;
}
.date-item {
    height: 24px;
    border-radius: 40px;
    padding: 0 10px;
}
.date-item_name-font {
    font-size: 14px;
}
.date-item_month-font {
    font-weight: 600;
    font-size: 14px;
}
.date-item_choosed {
    background-color: #73AEEA;
    color: #FFFFFF;
}

.date__arrow {
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
.date__arrow_right {
    transform: rotate(180deg);
}


.coordinator__button-container {
    position: absolute;
    top: 150px;
    left: 150px;

    display: flex;
    gap: 5px;
}
.coordinator__button {
    border: 1px solid #E3EFF9;
    border-radius: 12px;
}
.coordinator__button:hover {
    background: #73AEEA;
    color: #FFFFFF;
}


.calendar {
    position: absolute;
    left: 150px;
    top: 186px;
    border: 1px solid #E3EFF9;
    border-collapse: collapse;
}
.calendar__date {
    height: 40px !important;
    box-sizing: border-box;
    border: 1px solid #E3EFF9;
    padding: 0;

    font-size: 12px;
    color: #636363;
}
.calendar__date_red {
    background: #E75454;
    color: #FFFFFF;
}
.calendar__date_void-width {
    width: 196px;
}
.calendar__date_item-width {
    width: 40px;
}
.calendar__line:hover {
    background: #B5D9FD;
    border-radius: 30px;
    position: relative;
    z-index: 100;
}
.calendar__schedule {
    border-right: 1px solid #E3EFF9;
    
    padding: 0;
    position: relative;
}
.calendar__schedule-name {
    box-sizing: border-box;
    border-right: 1px solid #E3EFF9;
    width: 196px;
    padding-left: 29px;
    font-size: 12px;
    line-height: 18px;
}
.calendar__schedule-name input {
    border: 1px solid #73AEEA;
    outline:none;
}
.calendar__schedule-first {
    padding-top: 26px;
}


.calendar__schedule_green {
    position: absolute;
    z-index: 10;
    background: #47E69A;
    height: 10px;
    width: 40px;
    bottom: 5px;
}
.calendar__schedule_left-border {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.calendar__schedule_right-border {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
</style>