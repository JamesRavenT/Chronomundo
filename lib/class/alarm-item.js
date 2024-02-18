export default class Alarm {
    constructor(name, hour, minute, meridiem, order){
        this._name = name;
        this._hour = hour;
        this._minute = minute;
        this._meridiem = meridiem;
        this._order = order;
    }

    get name() { return this.name; }
    get hour() { return this.hour; }
    get minute() { return this.minute; }
    get meridiem() {return this.meridiem; }
    get order() {return this.order }

    set name(newName) {this.name = newName};
    set hour(newHour) {this.hour = newHour};
    set minute(newMinute) {this.minute = newMinute};
    set meridiem(newMeridiem) {this.meridiem = newMeridiem};
    set order(newOrder) {this.order = newOrder};

}