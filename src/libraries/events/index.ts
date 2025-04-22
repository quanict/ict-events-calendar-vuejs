import {events as familyEvents} from './Family';
import {events as holidayEvents} from './Holiday';
import {events as raceEvents} from './Race';
import {events as gmo2023} from './Runsystem2023';
import {events as gmo2024} from './Runsystem2024';
import {events as gmo2025} from './Runsystem2025';

// { solar:"2022-01-29", title: "Tết Nguyên Đán" },
export default [
    ...familyEvents, 
    ...holidayEvents, 
    ...raceEvents,
    ...gmo2023, 
    ...gmo2024, 
    ...gmo2025
];
// export default events;