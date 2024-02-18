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