import { computed } from 'vue';

export default function useHoursClass() {

    const isFirstElement = computed(() => function(choosed, hour, day) {
        return choosed[day]?.find(item => item.hour === +hour && item.firstElement)
    });

    const isHourChoosed = computed(() => function(choosed, hour, day) {
        return choosed[day]?.find(item => item.hour === +hour)
    })
    
    const scheduleClass = computed(() => function(choosed, hour, day) {
        hour = Number(hour);
        day = String(day);

        let isChoosed = false;
        let isStart = false;
        let isEnd = false;

        choosed[day]?.forEach((item, index, arr) => {
            if (item.hour === hour) {
                isChoosed = true;
                if ( arr[index-1]?.hour !== hour-1 ) isStart = true;
                if ( arr[index+1]?.hour !== hour+1 ) isEnd = true;
            }
        })

        return {
            'choosed': isChoosed,
            'choosed_left-border': isStart,
            'choosed_right-border': isEnd
        }
    })

    return { isHourChoosed, isFirstElement, scheduleClass }
}
