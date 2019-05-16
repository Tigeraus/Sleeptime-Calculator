export function getSleeptime(possible_wakeup_time) {
    const period = 90; //minutes
    var tips = "早点睡觉哦！"
    var now = new Date();
    let wakeup_time = new Date(possible_wakeup_time.getTime());

    var moment = getMoment(now.getHours());

    if (moment == "深夜") {
        if (wakeup_time.getHours() < 12) {
            //正常睡觉 +1天
            wakeup_time.setDate(wakeup_time.getDate() + 1);
            // var sleeptime = wakeup_time - now;
        } else {}
        //
    } else if (moment == "凌晨") {
        //正常睡觉 +0天
        // var sleeptime = wakeup_time - now;
    } else {
        //不适宜睡觉

    }

    var sleeptime = wakeup_time - now;

    var sleepminutes = sleeptime / 60000 //minutes
    var t = Math.round(sleepminutes / period) // the total period number we have

    var addm = Math.round(sleepminutes % period) // the minutes we should add
    now.setMinutes(now.getMinutes() + addm);

    var sleep_start = new Date(now.getTime());
    let options = {
        weekday: 'long',
        year: '2-digit',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return [sleep_start, t, addm, wakeup_time];
}

export function getMoment(hour) {
    if (hour >= 23) {
        return "深夜"
    } else if (hour > 0 && hour < 6) {
        return "凌晨"
    } else {
        return "不适宜睡觉的时间"
    }

}


export function generatePeriods(start_time, end_time) {
    let end = new Date(end_time.getTime() + 60 * 1000);
    let start = new Date(start_time.getTime());
    var times = new Array();
    var s = -1;
    while (start <= end) {

        times.push({
            x: new Date(start),
            y: (s + 1) * 0.5
        });
        start.setMinutes(start.getMinutes() + 45);
        s = s * (-1)
    }

    return times;

}
//TODO: 补完计算逻辑

//x=generatePeriods(start_time, end_time);
const chart_label = "";
const chart_color = 'rgba(255, 99, 132, 0.5)';
const chart_bordercolor = 'rgba(255, 99, 132, 1.0)';


const chart_fill = 'top';
const chart_pointRadius = 0;

export function getDataset(sleep_start_time, wakeup_time) {

    return {
        pointRadius: 0,
        fill: chart_fill,
        label: chart_label,
        backgroundColor: chart_color,
        borderColor: chart_bordercolor,
        borderWidth: 1,
        data: generatePeriods(sleep_start_time, wakeup_time) // [...Array(7)].map(e => ~~(Math.random() * 7)) //[40, 39, 10, 40, 39, 80, 40]
    }
}