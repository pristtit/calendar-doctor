import { computed } from 'vue';

export default function useHoursClass() {

    const isFirstElement = computed(() => function(choosed, hour, day) {
        return choosed[day]?.find(item => item.hour === hour && item.firstElement)
    });

    const isHourChoosed = computed(() => function(choosed, hour, day) {
        return choosed[day]?.find(item => item.hour === hour)
    })
    
    const scheduleClass = computed(() => function(choosed, hour, day) {
        let isChoosed = false;
        let isStart = false;
        let isEnd = false;

        if ( choosed[day]?.find(item => item.hour === hour ) ) {
            isChoosed = true;
            if ( !choosed[day]?.find(item => item.hour === hour-1 ) ) isStart = true;
            if ( !choosed[day]?.find(item => item.hour === hour+1 ) ) isEnd = true;
        }
        

        return {
            'calendar__schedule_green': isChoosed,
            'calendar__schedule_left-border': isStart,
            'calendar__schedule_right-border': isEnd
        }
    })

    return { isHourChoosed, isFirstElement, scheduleClass }
}
