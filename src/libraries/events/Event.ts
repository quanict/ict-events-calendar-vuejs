type CalendarEvent = {
    eventName: string;
    
    id?: string; 
    type?: string;
    title?: string; 
    father?: string; 
    lunar?: any; 
    solar?: any; 
    note?: string; 
    alive?: boolean; 
    date?: any, 

    deathDate?:boolean
    holiday?: boolean,
    offset?:boolean
    jp?: boolean,
    solar_date?:Date
    day_left?:number,

    info?:any
    distance?:0
    
};