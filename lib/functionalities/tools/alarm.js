import Alarm from "../../class/alarm-item.js";
import { convertTimeToSeconds } from "../../helpers/time-helper.js";
import { checkAlarmExistence } from "../../helpers/localstorage-helper.js";

const 
      addAlarmBtn = document.getElementById('alarm_CreateBtn'),
      listOfAlarms = document.getElementById('alarm_list'),
      modal_SetAlarm = document.querySelector('.popup_SetAlarm'),
      modal_setAlarmBtn = document.querySelector('#confirmSetAlarmBtn'),
      modal_SetAlarmOverlay = document.querySelector('.popup_SetAlarm .overlay'),
      modal_AlarmNameInput = document.getElementById('alarmNameInput'),
      modal_AlarmHourInput = document.getElementById('alarmTimeInputHour'),
      modal_AlarmMinInput = document.getElementById('alarmTimeInputMinute'),
      modal_AlarmMeridiemInput = document.getElementById('alarmTimeInputMeridiem');

let listOfUserSavedAlarms = [];

export function init_Alarm(){

    updateAlarmList();

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
            let order = convertTimeToSeconds(hour, min, meridiem);
            let alarmExists = checkAlarmExistence(order);
            if(!alarmExists) {
                const alarm = new Alarm(name, hour, min, meridiem, order);
                localStorage.setItem(order, JSON.stringify(alarm));
                modal_SetAlarm.classList.remove('active');
                updateAlarmList();
            } else {
                alert("The timeslot is already occupied");
            }
        }
    });    
}

function updateAlarmList() {
    if(listOfUserSavedAlarms.length != 0) {
        while (listOfUserSavedAlarms.length > 0) {
            listOfUserSavedAlarms.pop();
        }
    }
    for(let i = 0 ; i < localStorage.length ; i++) {
        var key = localStorage.key(i);
        var alarm = JSON.parse(localStorage.getItem(key));
        listOfUserSavedAlarms.push(alarm);
    }
    showAlarmList();
  }

  function showAlarmList() {
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