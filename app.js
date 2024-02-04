//EXPORTS
import { getCurrentDate, getCurrentDay } from "./lib/datehelper.js";

//VARIABLE DECLARATIONS
const contentBG = document.querySelector('.body'),
      nav = document.querySelector('.navbar'),
      doW = document.getElementById('currentDoW'),
      date = document.getElementById('currentDate'),
      time = document.getElementById('currentTime'),
      alarmBtn = document.getElementById('alarmBtn'),
      worldBtn = document.getElementById('wclockBtn'),
      comparatorBtn = document.getElementById('comparatorBtn'),
      tools = document.querySelector('.tool_slider'),
      addAlarmBtn = document.querySelector('#alarm_AddBtn'),
      modal_SetAlarm = document.querySelector('.popup_SetAlarm'),
      modal_SetAlarmOverlay = document.querySelector('.overlay'),
      modal_SetAlarmContainer = document.querySelector('.setAlarmContainer');

//MAIN
init_NavigationBar();
init_BackgroundAccordingToTime();
init_Clock();
init_Date();
init_Tools();

//FUNCTIONS

function init_NavigationBar() {

    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            nav.classList.add('navbar-scrolled');
        } else if(window.scrollY < 50) {
            nav.classList.remove('navbar-scrolled');
        }
    })
}

function init_BackgroundAccordingToTime() {

    let hour = new Date().getHours() + 1;
    if (hour >= 1 && hour <= 4) { // Night
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    } else if (hour >= 5 && hour <= 7) { // Early Morning
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    } else if (hour >= 8 && hour <= 9) { // Morning
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#2b2b3b' + ')';
    } else if (hour >= 10 && hour <= 11) { // Late Morning
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#FFFF8F' + ')';
    } else if (hour == 12) { // Noon 
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour >= 13 && hour <= 15) { // Afternoon
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour == 16) { // Late Afternoon
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour >= 17 && hour <= 18) { // Early Evening
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour >= 19 && hour <= 20) { // Evening
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
    } else if (hour >= 21 && hour <= 24) { // Night
        contentBG.style.backgroundImage = 'linear-gradient(' + 'to bottom' + ',' + '#1B1212' + ',' + '#2b2b3b' + ',' + '#F4BB44' + ')';
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

function init_Tools(){
    alarmBtn.addEventListener('click', () => {
        tools.style.transform = 'translate(0%)';
    });
    worldBtn.addEventListener('click', () => {
        tools.style.transform = 'translate(-33.3%)';
    });
    comparatorBtn.addEventListener('click', () => {
        tools.style.transform = 'translate(-66.6%)';
    });

    init_AlarmToolFunctionalities();
}

function init_AlarmToolFunctionalities(){
    addAlarmBtn.addEventListener('click', () => {
        modal_SetAlarm.classList.add('active');
    });

    modal_SetAlarm.addEventListener('click', () => {
        modal_SetAlarm.classList.remove('active');
    });
}   