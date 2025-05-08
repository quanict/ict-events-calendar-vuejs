<template>
    <div v-if="is_japan_holiday" class="month_day_events is_japan">
        <i class="fa-duotone fa-solid fa-flower" title="japan holiday"></i>
    </div>

    <div v-else-if="is_death_day" class="month_day_events month_day_mask_dead">
        <i v-for="dayEvent in deaths" class="fa-duotone fa-solid fa-universal-access" :title="dayEvent.title"></i>
    </div>

    <div v-else-if="is_holiday" class="month_day_events is_holiday">
        <i v-for="event in holidays" class="fa-duotone fa-solid fa-badge" :title="event.title"></i>
    </div>

    <div v-else-if="is_race_day" class="month_day_events is_racing">
        <i v-for="event in raceDays" class="fa-duotone fa-solid fa-person-running" :title="event.title"></i>
    </div>
</template>

<script lang="ts">
import { ref, PropType, defineComponent, defineProps } from 'vue';
import moment, { Moment } from "moment";
import { events, lunar, Lunar, toLunar } from '@/libraries';
/**
 * https://momentjs.com/docs/#/displaying/
 */
export default defineComponent({
    components: {},
    data() {
        return {
            events: []
        }
    },
    props: {
        date: {
            type: String,
            default: ""
        },
    },

    created() {
        this.events = this.getEvents(moment(this.date, "YYYY-MM-DD"))
    },

    methods: {
        getEvents(day: Moment): any {
            let eventsDate = events.filter((e) => {
                if (e.solar === day.format("YYYY-MM-DD")) return true
                if (moment(e.lunar, "YYYY-MM-DD").format("MM-DD") === toLunar(day).format("MM-DD")) return true
            })
            return eventsDate
        },
    },

    computed: {
        is_japan_holiday(): boolean {
            let events = this.events;
            events = events.filter((e: any) => e.jp === true && e.type === "holiday")
            return events.length > 0;
        },

        deaths(): any {
            return events.filter((e) => {
                if (!e.lunar) return false
                if (moment(e.lunar, "YYYY-MM-DD").format("MM-DD") === toLunar(this.date).format("MM-DD") && e.deathDate === true) return true
            })

        },

        is_death_day(i: number): boolean {
            return this.deaths.length > 0
        },

        holidays(): any {
            return this.events.filter((e: any) => e.type === "holiday")
        },

        is_holiday(): boolean {
            return this.holidays.length > 0
        },


        raceDays(): any {
            return this.events.filter((e: any) => e.type === "race")
        },
        is_race_day(): boolean {
            
            return this.raceDays.length > 0
        },
    },
    watch: {
        date(newVal, oldVal) {
            this.events = this.getEvents(moment(newVal, "YYYY-MM-DD"))
        }
    },
})
</script>