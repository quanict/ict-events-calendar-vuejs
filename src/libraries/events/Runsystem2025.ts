import moment from 'moment';
import lunar from '../lunar/lunar';

let events : Array<CalendarEvent> = [];

export const Holidays = [
    { solar:"2025-01-13", jp: true },
    { solar:"2025-01-25", title: "Tết Nguyên Đán" },
    { solar:"2025-01-26", title: "Tết Nguyên Đán" },
    { solar:"2025-01-27", title: "Tết Nguyên Đán" },
    { solar:"2025-01-28", title: "Tết Nguyên Đán" },
    { solar:"2025-01-29", title: "Tết Nguyên Đán" },
    { solar:"2025-01-30", title: "Tết Nguyên Đán" },
    { solar:"2025-01-31", title: "Tết Nguyên Đán" },
    { solar:"2025-02-01", title: "Tết Nguyên Đán" },
    { solar:"2025-02-02", title: "Tết Nguyên Đán" },

    { solar:"2025-02-11", jp: true },
    { solar:"2025-02-23", jp: true },
    { solar:"2025-02-24", jp: true },
    { solar:"2025-03-20", jp: true },
    { solar:"2025-04-29", jp: true },
    
    { solar:"2025-05-02", title: "Ngày Thống nhất đất nước" },
    { solar:"2025-05-03", jp: true },
    { solar:"2025-05-04", jp: true },
    { solar:"2025-05-05", jp: true },
    { solar:"2025-05-06", jp: true },

    { solar:"2025-07-21", jp: true },
    
    
    { solar:"2025-08-11", jp: true },
    { solar:"2025-09-01", title: "Quốc Khánh" },
    { solar:"2025-09-15", jp: true },
    { solar:"2025-09-23", jp: true },
    { solar:"2025-10-13", jp: true },

    { solar:"2025-11-03", jp: true },
    { solar:"2025-11-23", jp: true },
    { solar:"2025-11-24", jp: true },
];

Holidays.map((event)=>{
    let row : CalendarEvent = event as CalendarEvent;
    row.type = "holiday";

    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();

    if( row.solar ){
        row.solar = row.solar.replace("YEAR", year).replace("MONTH", month);
        row.date = moment(row.solar);
        events.push(row); return true;
    }

    if( row.lunar ){
        row.lunar = row.lunar.replace("YEAR", year).replace("MONTH", month);
        const date = moment(row.lunar);
        row.date = lunar(parseInt(date.format('D')), parseInt(date.format('M')));
        events.push(row); return true;
    }
    return true;
});

export {events};
