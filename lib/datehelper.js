export function getCurrentDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = getMonthName(currentDate.getMonth() + 1);
    let day = currentDate.getDate();
    return 'ー ー ー ー ' + month + ' ' + day + ' ' + year + ' ー ー ー ー';
}

export function getCurrentDay(){
    let currentDate = new Date();
    let day = getDayName(currentDate.getDay());
    return 'ー ー ー ー ー &nbsp; ' + day + ' &nbsp; ー ー ー ー ー';
}

function getDayName(day){
    return   (day == 1) ? 'Monday' 
           : (day == 2) ? 'Tuesday'
           : (day == 3) ? 'Wednesday'
           : (day == 4) ? 'Thursday'
           : (day == 5) ? 'Friday'
           : (day == 6) ? 'Saturday'
           : (day == 7) ? 'Sunday'
           : 'Error';
}

function getMonthName(month) {
    return   (month == 1) ? 'January' 
           : (month == 2) ? 'February'
           : (month == 3) ? 'March'
           : (month == 4) ? 'April'
           : (month == 5) ? 'May'
           : (month == 6) ? 'June'
           : (month == 7) ? 'July'
           : (month == 8) ? 'August'
           : (month == 9) ? 'September'
           : (month == 10) ? 'October'
           : (month == 11) ? 'November'
           : (month == 12) ? ' December'
           : 'Error';

}