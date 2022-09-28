import { useServer } from '@/stores/useServer';

export default function usehooseHour() {

    const backEnd = useServer();
    let timer;

    const chooseHour = (day, hour, choosed) => {
        let arrIndex
        choosed[day]?.forEach((item, index) => {
            if (item.hour === hour) arrIndex = index;
        })

        if (arrIndex === undefined) {
            if (choosed[day]?.length) {
                choosed[day].push({ hour });
            } else {
                choosed[day] = [];
                choosed[day].push({ hour, isFirst: true, firstElement: true});
                for (let index = 1; index < 4; index++) {
                    if (hour + index > 24) break
                    choosed[day].push({ hour: hour + index, isFirst: true });
                }
            }
        } else {
            if (choosed[day][arrIndex].isFirst) {
                choosed[day] = choosed[day].filter(item => !item.isFirst);
                if ( !choosed[day].length ) delete choosed[day];
            } else {
                choosed[day] = choosed[day].filter(item => item.hour !== hour);
                if ( !choosed[day].length ) delete choosed[day];
            }
        }
    }

    const sendCalendar = (id, calendar) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            Object.keys(calendar).forEach(item => {
                calendar[item].sort((a, b) => a.hour - b.hour)
            })
            backEnd.sendCalendar(id, calendar);
        }, 10_000);
    }

    return { chooseHour, sendCalendar }
}