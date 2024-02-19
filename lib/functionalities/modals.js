import { convertTimeToSeconds } from "../helpers/time-helper.js";
import { checkAlarmExistence, createItem } from "../helpers/alarm-helper.js";
import { init_AlarmList } from "./tools/alarm.js";
const         
modal = document.querySelector('.modal'),
modal_Overlay = document.querySelector('.modal .overlay'),
modal_Container = document.querySelector('.modal .container');


export function init_Modal(contentType, object){
    console.log(contentType);
    modal.classList.add('active');
    switch(contentType) {
        case 'addAlarm' :
            modal_Container.innerHTML=`
                <div class="title">
                    <p>C R E A T E&nbsp;&nbsp;A L A R M </p>
                </div>
                <div class="form">
                    <label id="setAlarmName">
                        N A M E  : &nbsp; &nbsp;
                        <input id="alarmNameInput" type="text" maxlength="20">
                    </label>
                </div>
                <div class="form">
                    <label id="setAlarmTime">
                        T I M E  &nbsp;&nbsp;: &nbsp; &nbsp;
                        <input id="alarmTimeInputHour" type="number" maxlength="2" min="1" max="12"> :
                        <input id="alarmTimeInputMinute" type="number" maxlength="2" min="00" max="59">
                        <select id="alarmTimeInputMeridiem">
                            <option value="AM/PM" selected hidden>AM/PM</option>
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </label>
                </div>
                <div class="btn_container">
                    <button id="confirmSetAlarmBtn">Set</button>
            `;
            init_AddAlarmModal();
            break;
        case 'editAlarm' :
            modal_Container.innerHTML=`
                <div class="title">
                        <p>E D I T&nbsp;&nbsp;A L A R M </p>
                    </div>
                    <div class="form">
                        <label id="setAlarmName">
                            N A M E  : &nbsp; &nbsp;
                            <input id="alarmNameInput" type="text" maxlength="20">
                        </label>
                    </div>
                    <div class="form">
                        <label id="setAlarmTime">
                            T I M E  &nbsp;&nbsp;: &nbsp; &nbsp;
                            <input id="alarmTimeInputHour" type="number" maxlength="2" min="1" max="12"> :
                            <input id="alarmTimeInputMinute" type="number" maxlength="2" min="00" max="59">
                            <select id="alarmTimeInputMeridiem">
                                <option value="AM/PM" selected hidden>AM/PM</option>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </label>
                    </div>
                    <div class="btn_container">
                      
                    <button id="confirmSetAlarmBtn">Set</button>
                `;
                console.log(object);
                init_EditAlarmModal(object);
            break;
        case 'fireAlarm' :
            modal_Container.innerHTML=`
                    <div class="title">
                        <p>A L A R M </p>
                    </div>
                    
                    <div class="btn_container">
                      
                    <button id="confirmSetAlarmBtn">Finish</button>
            `;
            init_AlarmOffModal();
            break;
    }
    modal_Overlay.addEventListener('click', () => {
        modal.classList.remove('active');
    });

}

function init_AddAlarmModal(){
    const 
    modal_setAlarmBtn = document.querySelector('#confirmSetAlarmBtn'),
    modal_AlarmNameInput = document.getElementById('alarmNameInput'),
    modal_AlarmHourInput = document.getElementById('alarmTimeInputHour'),
    modal_AlarmMinInput = document.getElementById('alarmTimeInputMinute'),
    modal_AlarmMeridiemInput = document.getElementById('alarmTimeInputMeridiem');

    modal_AlarmHourInput.addEventListener('input', () => {
        console.log(modal_AlarmHourInput.value);
        if(modal_AlarmHourInput.value > 12) {
            modal_AlarmHourInput.value = 12;
        }
    });

    modal_AlarmMinInput.addEventListener('input', () => {
        console.log(modal_AlarmMinInput.value);
        if(modal_AlarmMinInput.value > 59) {
            modal_AlarmMinInput.value = 59;
        }
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
                createItem(name, hour, min, meridiem, order);
                init_AlarmList();
                modal.classList.remove('active');
                modal_AlarmNameInput.value = '';
                modal_AlarmHourInput.value = '';
                modal_AlarmMinInput.value = '';
                modal_AlarmMeridiemInput.value = 'AM/PM';
            } else {
                alert("The timeslot is already occupied");
            }
        }
    });    
}

function init_EditAlarmModal(orderNo){
    const 
    modal_setAlarmBtn = document.querySelector('#confirmSetAlarmBtn'),
    modal_AlarmNameInput = document.getElementById('alarmNameInput'),
    modal_AlarmHourInput = document.getElementById('alarmTimeInputHour'),
    modal_AlarmMinInput = document.getElementById('alarmTimeInputMinute'),
    modal_AlarmMeridiemInput = document.getElementById('alarmTimeInputMeridiem');

    var dbItem = localStorage.getItem(orderNo);
    var item = JSON.parse(dbItem);

    modal_AlarmNameInput.value = item._name;
    modal_AlarmHourInput.value = item._hour;
    modal_AlarmMinInput.value = item._minute;
    modal_AlarmMeridiemInput.value = item._meridiem;
    modal_AlarmHourInput.addEventListener('input', () => {
        console.log(modal_AlarmHourInput.value);
        if(modal_AlarmHourInput.value > 12) {
            modal_AlarmHourInput.value = 12;
        }
    });

    modal_AlarmMinInput.addEventListener('input', () => {
        console.log(modal_AlarmMinInput.value);
        if(modal_AlarmMinInput.value > 59) {
            modal_AlarmMinInput.value = 59;
        }
    });

    modal_setAlarmBtn.addEventListener('click', () => {
        let name = modal_AlarmNameInput.value;
        let hour = modal_AlarmHourInput.value;
        let min = modal_AlarmMinInput.value;
        let meridiem = modal_AlarmMeridiemInput.value;
        if((name == null || name == '') || (hour == null || hour == '') || (min == null || min =='') || meridiem == 'AM/PM') {
            alert("Please fill in the blanks");
        } else {
            localStorage.removeItem(orderNo);
            let order = convertTimeToSeconds(hour, min, meridiem);
            let alarmExists = checkAlarmExistence(order);
            if(!alarmExists) {
                createItem(name, hour, min, meridiem, order);
                init_AlarmList();
                modal.classList.remove('active');
                modal_AlarmNameInput.value = '';
                modal_AlarmHourInput.value = '';
                modal_AlarmMinInput.value = '';
                modal_AlarmMeridiemInput.value = 'AM/PM';
            } else {
                alert("The timeslot is already occupied");
            }
        }
    });    
}

function init_AlarmOffModal(){
    console.log('test1');
    let ringtone = new Audio('../res/sounds/ringtone.m4a');
    console.log('test2');
    var i = 0;
    var intervalID = setInterval(function () {
    ringtone.play();
    if (++i === 30 || !modal.classList.contains('active')) {
        window.clearInterval(intervalID);
    }
    console.log(i);
    }, 2000);
}