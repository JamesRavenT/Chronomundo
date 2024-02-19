const utcOffSets = [
    'UTC -12:00', //-21+
    'UTC -11:00', //-20
    'UTC -10:00', //-19
    'UTC -9:00', //-18
    'UTC -8:00', //-16
    'UTC -7:00', //-15
    'UTC -6:00', //-14
    'UTC -5:00', //-13
    'UTC -4:00', //-12
    'UTC -3:00', //-11
    'UTC -2:00', //-10
    'UTC -1:00', //-9
    'UTC 0:00',  //-8
    'UTC +1:00', //-7
    'UTC +2:00', //-6
    'UTC +3:00', //-5
    'UTC +4:00', //-4
    'UTC +5:00', //-3
    'UTC +6:00', //-2
    'UTC +7:00', //-1
    'UTC +8:00', //Current
    'UTC +9:00', //+1
    'UTC +10:00', //+2
    'UTC +11:00', //+3
    'UTC +12:00', //+4
]

function init_TimeZone(){
    let timeString = new Date().toLocaleTimeString();
}


let timeString = new Date().toLocaleTimeString();
let time = timeString.replaceAll(":", " ").split(" ");