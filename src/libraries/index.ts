import moment from 'moment';
import lunar, { Lunar } from './lunar/lunar';
import events from './events';

const toLunar = function (date: any) {

    if (moment.isMoment(date)) {
        return lunar(date);
    }
    return lunar(moment(date));

}

const isMoment = function (date: any) {
    return moment.isMoment(date)
}


export { lunar, Lunar, moment, toLunar, isMoment, events };