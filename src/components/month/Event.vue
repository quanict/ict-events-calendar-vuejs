<template>
<div v-if="is_japan_holiday" class="month_day_events is_japan">
    <i class="fa-duotone fa-solid fa-flower" title="japan holiday"></i>
</div>

<div v-else-if="is_death_day" class="month_day_events month_day_mask_dead">
    <template v-for="dayEvent in deaths">
        <i class="fa-duotone fa-solid fa-universal-access" :title="dayEvent.title"></i>
    </template>
</div>

<div v-else-if="is_holiday" class="month_day_events is_holiday">
    <template v-for="dayEvent in holidays">
        <i class="fa-duotone fa-solid fa-badge" :title="dayEvent.title"></i>
    </template>
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
    data(){
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

    created(){
        this.events = this.getEvents(moment(this.date, "YYYY-MM-DD"))
        // console.log(`======= get event of day`, this.date)
    },

    methods:{
        getEvents(day: Moment): any {
            const lunarDate: Lunar.LunarDate = toLunar(day);
            const lunarDateStr = lunarDate.format("YYYY-MM-DD")

            let eventsDate = events.filter((e) => {
                if (e.solar === day.format("YYYY-MM-DD")) return true
                if (e.lunar === lunarDateStr) return true
            })
            return eventsDate
        },

        deaths(): any {
            const lunarDate: Lunar.LunarDate = toLunar(this.date);
            const lunarDateStr = lunarDate.format("YYYY-MM-DD")
            return events.filter((e) => {
                if (!e.lunar) return false
                if (e.lunar === lunarDateStr && e.deathDate === true) return true
            })

        },

        holidays(i: number): any {
            return this.events.filter((e: any) => e.type === "holiday")
        }
    },

    computed:{
        is_japan_holiday(): boolean {
            let events = this.events;
            events = events.filter((e: any) => e.jp === true && e.type === "holiday")
            return events.length > 0;
        },

        is_death_day(i: number): boolean {
            const events = this.deaths()
            return events.length > 0
        },

        is_holiday(i: number): boolean {
            return this.holidays(i).length > 0
        },
    },
    watch: {
        date(newVal, oldVal) {
            this.events = this.getEvents(moment(newVal, "YYYY-MM-DD"))
        }
    },
})
</script>