import { init_Alarm } from "./alarm.js";

const alarmBtn = document.getElementById('alarmBtn'),
      worldBtn = document.getElementById('wclockBtn'),
      comparatorBtn = document.getElementById('comparatorBtn'),
      tools = document.querySelector('.slideshow .slider');

export function init_Tools(){
    alarmBtn.addEventListener('click', () => {
        tools.style.transform = 'translate(0%)';
    });
    worldBtn.addEventListener('click', () => {
        tools.style.transform = 'translate(-33.3%)';
    });
    comparatorBtn.addEventListener('click', () => {
        tools.style.transform = 'translate(-66.6%)';
    });

    init_Alarm();
}