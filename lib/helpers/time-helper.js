export function convertTimeToSeconds(hour, min, meridiem) {
    var a = (hour == 12) ? 0 : hour * 60;
    var b = a * 60;
    var c = min * 60;
    var d = b + c;
    return (meridiem == 'AM') ? d : d + 43200;
}