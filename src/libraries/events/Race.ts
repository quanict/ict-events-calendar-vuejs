import Events from "./RaceData"
import moment from 'moment';

let events: Array<CalendarEvent> = [];


Events.map((event) => {
    let row: CalendarEvent = event as CalendarEvent;
    const date = moment(event.date)
    row.type = "race";
    row.solar = date.format("YYYY-MM-DD");
    row.solar_date = date.toDate()

    events.push(row); 
    return true;
});

export {events};