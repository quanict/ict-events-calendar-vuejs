<template>
    <div>
        <div class="month-day-name">
            <div class="grid grid-cols-7 gap-4">
                <div class="col-span-7">{{ month_name }}</div>
                <template v-for="i in 7">
                    <div v-if="[6,7].indexOf(i) >=0" class="month_day_title is_weekend"> {{ print_day_name(i) }} </div>
                    <div v-else class="month_day_title"> {{ print_day_name(i) }} </div>
                </template>
            </div>
        </div>
        <div class="grid grid-cols-7 gap-4">
            
            <template v-for="i in days">
                <template v-if="not_current_month(i)">
                    <div v-if="is_weekend(i)" class="month_day monday_preview is_weekend">
                        <span class="d-sonar">{{ print_day_of_month(i) }}</span>
                        <span class="d-lunnar">{{ lunar_day_of_month(i) }}</span>
                    </div>
                    <div v-else class="month_day monday_preview ">
                        <span class="d-sonar">{{ print_day_of_month(i) }}</span>
                        <span class="d-lunnar">{{ lunar_day_of_month(i) }}</span>
                    </div>
                </template>

                <template v-if="is_current_month(i)">
                    <div v-if="is_weekend(i)" class="month_day is_weekend">
                        <span class="d-sonar">{{ print_day_of_month(i) }}</span>
                        <span class="d-lunnar">{{ lunar_day_of_month(i) }}</span>
                    </div>

                    <div v-else class="month_day">
                        <span class="d-sonar">{{ print_day_of_month(i) }}</span>
                        <span class="d-lunnar">{{ lunar_day_of_month(i) }}</span>

                        <div v-if="is_japan_holiday(i)" class="month_day_events is_japan">
                            <i class="fa-duotone fa-solid fa-flower" title="japan holiday"></i>
                        </div>

                        <div v-else-if="is_death_day(i)" class="month_day_events month_day_mask_dead">
                            <template v-for="dayEvent in deathDay(i)">
                                <i class="fa-duotone fa-solid fa-universal-access" :title="dayEvent.title"></i>
                            </template>
                        </div>

                        <div v-else-if="is_holiday(i)" class="month_day_events is_holiday">
                            <template v-for="dayEvent in holidays(i)">
                                <i class="fa-duotone fa-solid fa-badge" :title="dayEvent.title"></i>
                            </template>
                        </div>

                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

/**
https://vuejs.org/guide/introduction.html
*/
<script lang="ts">
import { ref, PropType, defineComponent, defineProps } from 'vue'
import { Options, Vue } from 'vue-class-component';
import moment, { Moment } from "moment";
import { events, lunar, Lunar, toLunar } from '@/libraries';

/**
 * https://momentjs.com/docs/#/displaying/
 */
export default defineComponent({
    components: {
    },

    props: {
        month: {
            type: String,
            default: "2025-03"
        }
    },

    data() {
        return {
            date: moment(),
            month_number: '',
            start: moment(),
            end: moment(),
            days: 0,
            daysName : [
                "",
                "Mon",
                "Tue",
                "Web",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ]
        }
    },

    mounted() {

    },

    created() {
        let date;
            if (this.month) {
                date = moment(this.month, "YYYY-MM")
            } else {
                date = moment()
            }
            date.startOf("M")

            this.month_number = date.format('M')
            this.start = date.clone()

            let startIndex = Number(this.start.format("d"))
            if (startIndex > 0) {
                this.start.add(-startIndex, "day")
            }
            this.end = date.clone().endOf('M')
            let endIndex = Number(this.end.format("d"))
            if (endIndex < 6) {
                this.end.add((7 - endIndex), "day")
            }

            this.days = this.end.diff(this.start, "days");
            if( this.days < 42){
                /** when print 5 weeks */
                this.end = this.end.add(7, "days");
                this.days = this.end.diff(this.start, "days");
            }
    },

    methods: {
        print_day_name(i:number): string {
            return this.daysName[i];
        },
        print_day_of_month(i: number): string {
            return this.start.clone().add(i, "days").format("DD")
        },

        is_current_month(i: number): boolean {
            const day = this.start.clone().add(i, "days")
            return day.format("M") === this.month_number
        },
        not_current_month(i: number): boolean {
            const day = this.start.clone().add(i, "days")
            return day.format("M") !== this.month_number
        },
        is_weekend(i: number): boolean {
            const day = this.start.clone().add(i, "days")
            return ["Sa", "Su"].indexOf(day.format("dd")) > -1
        },

        lunar_day_of_month(i: number): string {
            const day = this.start.clone().add(i, "days")
            const lunarDate: Lunar.LunarDate = toLunar(day);
            const lunarDay = lunarDate.format("DD")
            const lunarMonth = lunarDate.format("MM")
            if (lunarDay === "01") {
                return `${lunarDay}/${lunarMonth}`
            }
            return lunarDate.format("DD");
        },

        getDay(i: number): any {
            return this.start.clone().add(i, "days")
        },

        getEvent(day: any): any {
            const lunarDate: Lunar.LunarDate = toLunar(day);
            const lunarDateStr = lunarDate.format("YYYY-MM-DD")

            let eventsDate = events.filter((e) => {
                if (e.solar === day.format("YYYY-MM-DD")) return true
                if (e.lunar === lunarDateStr) return true
            })
            return eventsDate
        },

        is_japan_holiday(i: number): boolean {
            const day = this.start.clone().add(i, "days");
            let events = this.getEvent(day);
            if (events && events.length > 0) {
            }

            events = events.filter((e: any) => e.jp === true && e.type === "holiday")
            return events.length > 0;
        },

        is_death_day(i: number): boolean {
            const eventsDate = this.deathDay(i)
            if (eventsDate.length > 0) {
                console.log(`===============`, { eventsDate })
            }
            return eventsDate.length > 0
        },

        deathDay(i: number): any {
            const day = this.start.clone().add(i, "days");
            const lunarDate: Lunar.LunarDate = toLunar(day);
            const lunarDateStr = lunarDate.format("YYYY-MM-DD")
            return events.filter((e) => {
                if (!e.lunar) return false
                if (e.lunar === lunarDateStr && e.deathDate === true) return true
            })

        },

        is_holiday(i: number): boolean {
            return this.holidays(i).length > 0
        },

        holidays(i: number): any {
            const day = this.start.clone().add(i, "days");
            let events = this.getEvent(day);
            return events.filter((e: any) => e.type === "holiday")
        }
    },

    computed: {
        title(): string { return this.month ?? '' },

        greetingUppercased: {
            // getter
            get(): string {
                return this.date.format("YYYY-MM-DD")
            },
            // setter
            set(newValue: string) {
                // this.date = newValue
            }
        },



        dayOfMonth(): string {
            let index = 0
            if (!this.start) {
                return ''
            }
            return this.start.clone().add(index, "days").format("MM")
        },

        month_name() : string {
            // console.log(`==== `, this.month_name, this.month_number, this.date.format("YYYY-MM-DD"))
            // return ;
            return moment(`2025-${this.month_number}-01`).format("MMMM")
        }


    },


})
</script>
