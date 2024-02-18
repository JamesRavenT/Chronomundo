import { getCurrentDate, getCurrentDay } from "../helpers/date-helper.js";

const background = document.querySelector('.body'),
      doW = document.getElementById('currentDoW'),
      date = document.getElementById('currentDate'),
      time = document.getElementById('currentTime');

export function init_Clock() {
    init_Time();
    init_Date();
    init_Background();

}
    
function init_Time() {
    setInterval(() => {
        let currentTime = new Date();
        time.innerHTML = currentTime.toLocaleTimeString();
    }, 1000)
}

function init_Date() {
    doW.innerHTML = getCurrentDay();
    date.innerHTML = getCurrentDate();
}

function init_Background() {

    let hour = new Date().getHours() + 1;
    if (hour >= 1 && hour <= 4) { // Night
        background.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    } else if (hour >= 5 && hour <= 7) { // Early Morning
        background.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    } else if (hour >= 8 && hour <= 9) { // Morning
        background.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    } else if (hour >= 10 && hour <= 11) { // Late Morning
        background.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#FFFF8F' + ')';
    } else if (hour == 12) { // Noon 
        background.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour >= 13 && hour <= 15) { // Afternoon
        background.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour == 16) { // Late Afternoon
        background.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour >= 17 && hour <= 18) { // Early Evening
        background.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour >= 19 && hour <= 20) { // Evening
        background.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour >= 21 && hour <= 24) { // Night
        background.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } 
    
}