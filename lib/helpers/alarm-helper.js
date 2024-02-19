import Alarm from '../class/alarm-item.js'
import { init_Modal } from '../functionalities/modals.js';
import { setLimitedInterval } from './interval-helper.js';

export function checkAlarmExistence(order) {
    let check = false;
    for(let i = 0 ; i < localStorage.length ; i++) {
        var key = localStorage.key(i);
        if(key == order) {
            check = true;
            return check;   
        } else {
            check = false;
            return check;
        }
    }
    return check;
}   

export function checkForAlarms(hour, min, sec, mm){
    for(let i = 0 ; i < localStorage.length ; i++) {
        var key = localStorage.key(i);
        var item = localStorage.getItem(key);
        var alarm = JSON.parse(item);
        if(alarm._hour == hour && alarm._minute == min && alarm._meridiem == mm && sec == 0) {
           init_Modal('fireAlarm', null);
        }
    }

}

export function createItem(name, hour, min, meridiem, order) {
    const alarm = new Alarm(name, hour, min, meridiem, order);
    localStorage.setItem(order, JSON.stringify(alarm));
}