
import { checkForAlarms } from "../../helpers/alarm-helper.js";
import { sortByTime } from "../../helpers/array-helper.js";
import { init_Modal } from "../modals.js";

const   addBtn = document.getElementById('alarm_CreateBtn'),
        listOfAlarms = document.getElementById('alarm_list');


let listOfUserSavedAlarms = [];

export function init_Alarm(){

    init_AlarmList();
    init_Timer();
    addBtn.addEventListener('click', () => {
        init_Modal('addAlarm', null);
    });

}

export function init_AlarmList() {
    listOfUserSavedAlarms = [];
    for(let i = 0 ; i < localStorage.length ; i++) {
        var key = localStorage.key(i);
        var alarm = JSON.parse(localStorage.getItem(key));
        listOfUserSavedAlarms.push(alarm);
    }
    listOfUserSavedAlarms = sortByTime(listOfUserSavedAlarms);
    init_AlarmListDisplay();
    init_EditFunction();
    init_DeleteFunction();
}

function init_AlarmListDisplay() {
    listOfAlarms.innerHTML = "";
    listOfUserSavedAlarms.forEach((item, index) => {
        var name = item._name;
        var hour = item._hour;
        var min = (item._minute.length > 1) ? item._minute : '0' + item._minute;
        var meridiem = item._meridiem;
        const li = document.createElement('li');
        li.innerHTML = `
                <div class="item_alarm">
                    <div class="container">
                        <p id="name">${name}</p>
                        <p id="time">${hour} : ${min} ${meridiem}</p>
                    </div>
                    <img id="editBtn" class="button" src="./res/images/edit.png">
                    <img id="deleteBtn" class="button" src="./res/images/delete.png">        
                </div>
            `;
        listOfAlarms.appendChild(li);
    });
    
}

function init_EditFunction(){
    let itemsToEdit = document.querySelectorAll('#editBtn');
    itemsToEdit.forEach((edit, item) => {
        edit.addEventListener('click', () => {
            var alarm = listOfUserSavedAlarms[item];
            init_Modal('editAlarm', alarm._order);
        });
    });  
}

function init_DeleteFunction(){
    let itemsToDelete = document.querySelectorAll('#deleteBtn');
    itemsToDelete.forEach((del, item)=> {
        del.addEventListener('click', () => {
            var alarm = listOfUserSavedAlarms[item];
            localStorage.removeItem(alarm._order);
            init_AlarmList()
        });
    });
}

function init_Timer(){
    setInterval(() => {
        let timeString = new Date().toLocaleTimeString();
        let time = timeString.replaceAll(":", " ").split(" ");
        checkForAlarms(time[0], time[1], time[2], time[3]);
    }, 1000);
}






