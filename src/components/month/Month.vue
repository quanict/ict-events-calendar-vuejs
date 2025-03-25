<template>
    <div>
        <div class="month-day-name">
            <div class="grid grid-cols-7 gap-4">
                <div class="col-span-7">{{ month_name }}</div>
                <template v-for="i in 7">
                    <div v-if="[6, 7].indexOf(i) >= 0" class="month_day_title is_weekend"> {{ day_of_week(i) }} </div>
                    <div v-else class="month_day_title"> {{ day_of_week(i) }} </div>
                </template>
            </div>
        </div>
        <div class="grid grid-cols-7 gap-4">
            <div v-for="i in days" :class="day_classes(i)">
                <span class="d-sonar">{{ solar_day(i) }}</span>
                <span class="d-lunnar">{{ lunar_day(i) }}</span>
                <Event v-if="is_current_month(i)" :date="get_date(i)" />
            </div>
        </div>
    </div>
</template>

/**
https://vuejs.org/guide/introduction.html
*/
<script lang="ts">
import { ref, PropType, defineComponent, defineProps } from 'vue'
import moment, { Moment } from "moment";
import { Lunar, toLunar } from '@/libraries';
import Event from "@/components/month/Event.vue"
/**
 * https://momentjs.com/docs/#/displaying/
 */
export default defineComponent({
    components: {
        Event
    },

    props: {
        month: {
            type: String,
            default: "",
            // required: true,

        }
    },

    data() {
        return {
            date: moment(),
            month_number: '',
            start: moment(),
            end: moment(),
            days: 0,
            daysName: [
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
    emits: ["updateMonthValue"],
    mounted() { },
    onUpdated() {
        this.set_date(moment(this.$props.month, "YYYY-MM"))
    },

    created() {
        let date;
        const propMonth = this.$props.month
        if (typeof propMonth !== "undefined") {
            date = moment(propMonth, "YYYY-MM")
        } else {
            date = moment(new Date())
        }
        date = date.startOf("M")
        this.set_date(date)

    },

    methods: {
        set_date(date: Moment) {
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
            if (this.days < 42) {
                /** when print 5 weeks */
                this.end = this.end.add(7, "days");
                this.days = this.end.diff(this.start, "days");
            }

            this.date = date
        },
        get_date(i: number) {
            const eventDate = this.start.clone().add(i, "days").format("YYYY-MM-DD");
            return this.start.clone().add(i, "days").format("YYYY-MM-DD")
        },

        day_of_week(i: number): string {
            return this.daysName[i];
        },

        solar_day(i: number): string {
            return this.start.clone().add(i, "days").format("DD")
        },


        lunar_day(i: number): string {
            const day = this.start.clone().add(i, "days")
            const lunarDate: Lunar.LunarDate = toLunar(day);
            const lunarDay = lunarDate.format("DD")
            const lunarMonth = lunarDate.format("MM")
            if (lunarDay === "01") {
                return `${lunarDay}/${lunarMonth}`
            }
            return lunarDate.format("DD");
        },

        is_current_month(i:number): boolean {
            const date = this.start.clone().add(i, "days")
            return date.format("M") === this.date.format("M")
        },
        day_classes(i: number): string {
            const classes: Array<string> = ["month_day"]

            const date = this.start.clone().add(i, "days")
            if (["Sa", "Su"].indexOf(date.format("dd")) > -1) {
                classes.push("is_weekend")
            }

            if (date.format("M") !== this.date.format("M")) {
                classes.push("monday_preview")
            }

            return classes.join(' ')
        },
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

        month_name(): string {
            return this.date.format("MMMM")
        },
    },

    watch: {
        month(newVal, oldVal) {
            this.set_date(moment(newVal, "YYYY-MM"))
        }
    },


})
</script>
