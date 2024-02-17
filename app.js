//EXPORTS
import Alarm from './lib/class/alarm.js';
import { getCurrentDate, getCurrentDay } from './lib/datehelper.js';


//VARIABLE DECLARATIONS
const contentBG = document.querySelector('.body'),
      nav = document.querySelector('.navbar'),
      doW = document.getElementById('currentDoW'),
      date = document.getElementById('currentDate'),
      time = document.getElementById('currentTime'),
      alarmBtn = document.getElementById('alarmBtn'),
      worldBtn = document.getElementById('wclockBtn'),
      comparatorBtn = document.getElementById('comparatorBtn'),
      tools = document.querySelector('.slideshow .slider'),
      addAlarmBtn = document.querySelector('#alarm_CreateBtn'),
      listOfAlarms = document.getElementById('alarm_list'),
      modal_SetAlarm = document.querySelector('.popup_SetAlarm'),
      modal_setAlarmBtn = document.querySelector('#confirmSetAlarmBtn'),
      modal_SetAlarmOverlay = document.querySelector('.popup_SetAlarm .overlay'),
      modal_AlarmNameInput = document.getElementById('alarmNameInput'),
      modal_AlarmHourInput = document.getElementById('alarmTimeInputHour'),
      modal_AlarmMinInput = document.getElementById('alarmTimeInputMinute'),
      modal_AlarmMeridiemInput = document.getElementById('alarmTimeInputMeridiem');

const alarmsArray = localStorage.getItem('alarms') ? JSON.parse(localStorage.getItem('alarms')) : []

let listOfUserSavedAlarms = [];

//MAIN

init_NavigationBar();
init_BackgroundAccordingToTime();
init_Clock();
init_Date();
init_Tools();
retrieveAlarmsOnDatabase();

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

    modal_SetAlarmOverlay.addEventListener('click', () => {
        modal_SetAlarm.classList.remove('active');
    });

    modal_setAlarmBtn.addEventListener('click', () => {
        let name = modal_AlarmNameInput.value;
        let hour = modal_AlarmHourInput.value;
        let min = modal_AlarmMinInput.value;
        let meridiem = modal_AlarmMeridiemInput.value;
        if((name == null || name == '') || (hour == null || hour == '') || (min == null || min =='') || meridiem == 'AM/PM') {
            alert("Please fill in the blanks");
        } else {
            let order = convertHourstToMin(hour, min, meridiem);
            let check = checkIfAlarmAlreadyExists(order);
            if(check == false) {
                const alarm = new Alarm(name, hour, min, meridiem, order);
                localStorage.setItem(order, JSON.stringify(alarm));
                modal_SetAlarm.classList.remove('active');
                retrieveAlarmsOnDatabase();
            } else {
                alert("The timeslot is already occupied");
            }
        }
        
    });

    function convertHourstToMin(hour, min, meridiem) {
        var a = hour * 60;
        var b = a * 60;
        var c = min * 60;
        var d = b + c;
        return (meridiem == 'AM') ? d : d + 43200;
    }

    function checkIfAlarmAlreadyExists(order) {
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
}

function retrieveAlarmsOnDatabase() {
    console.log("HAHHAH" + listOfUserSavedAlarms.length);
    if(listOfUserSavedAlarms.length != 0) {
        while (listOfUserSavedAlarms.length > 0) {
            listOfUserSavedAlarms.pop();
        } 
        console.log("HAHHAH" + listOfUserSavedAlarms.length);
        for(let i = 0 ; i < localStorage.length ; i++) {
            var key = localStorage.key(i);
            var alarm = JSON.parse(localStorage.getItem(key));
            listOfUserSavedAlarms.push(alarm);
        }
        displayAlarms();
        console.log("HAHHAH" + listOfUserSavedAlarms.length);
    } else {
        for(let i = 0 ; i < localStorage.length ; i++) {
            var key = localStorage.key(i);
            console.log(key);
            
            var alarm = JSON.parse(localStorage.getItem(key));
            console.log(alarm);
            listOfUserSavedAlarms.push(alarm);
            console.log(listOfUserSavedAlarms.length);
        }
        displayAlarms();
        }
  }

  function displayAlarms() {
    for(let i = 0 ; i < listOfUserSavedAlarms.length ; i++) {
        var alarm = listOfUserSavedAlarms[i];
        var name = alarm._name;
        var hour = alarm._hour;
        var min = (alarm._minute.length > 1) ? alarm._minute : '0' + alarm._minute;
        var meridiem = alarm._meridiem;
        const li = document.createElement('li');
        li.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                justify-content: center; 
                    ">
                    <div style="
                        display: block;
                        width: 100%;
                        ">
                        <p style="
                            font-size: 4vw;
                            ">
                            ${name}
                        </p>
                        <p style="
                            font-size: 4vw;
                            ">
                            ${hour} : ${min} ${meridiem}
                        </p>
                    </div>
                    <img src="./res/images/edit.png" style="
                        height: auto;
                        width: 4vw;
                        margin: 0.5em;
                        display: flex;
                        align-items: center; 
                        ">
                    <img src="./res/images/delete.png" style="
                        height: auto;
                        width: 4vw;
                        margin: 0.5em;
                        display: flex;
                        align-items: center; 
                        ">
                    
                
                </div>
                
            `;
        listOfAlarms.appendChild(li);
      };
  }
