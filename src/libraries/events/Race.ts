import Events from "./RaceData"
import moment from 'moment';

let events: Array<CalendarEvent> = [];


Events.map((event) => {
    let row: CalendarEvent = event as CalendarEvent;
    row.type = "race";
    row.solar = moment(event.date).format("YYYY-MM-DD");
    events.push(row); 
    return true;
});

export {events};