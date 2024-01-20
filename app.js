//EXPORTS
import { getCurrentDate, getCurrentDay } from "./lib/datehelper.js";

//VARIABLE DECLARATIONS
const contentBG = document.getElementById('body');
const doW = document.getElementById('currentDoW');
const date = document.getElementById('currentDate');
const time = document.getElementById('currentTime');

//MAIN
init_BackgroundAccordingToTime();
init_Clock();
init_Date();


//FUNCTIONS
function init_BackgroundAccordingToTime() {

    let hour = new Date().getHours() + 1;
    
    if(hour >= 1 && hour <= 4) {
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    } else if (hour >= 5 && hour <= 6) {
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    } else if (hour >= 7 && hour <= 10) {
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    } else if (hour >= 11 && hour <= 15) {
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ',' + '#FFFF8F' + ')';
    } else if (hour >= 16 && hour <= 18) {
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour >= 19 && hour <= 21) {
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    } else if (hour >= 22 && hour <= 24) {
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    }
    
}


function init_Clock() {
    setInterval(() => {
        let currentTime = new Date();
        time.innerHTML = currentTime.toLocaleTimeString();
    }, 1000)
}

function init_Date() {
    doW.innerHTML = getCurrentDay();
    date.innerHTML = getCurrentDate();
}

