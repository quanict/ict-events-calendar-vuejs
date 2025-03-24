<template>
	<DavidUiLayout>
		<div class="monthy-header">
			<div class="btn-previous">
				<button><i class="fa-solid fa-angles-left"></i></button>
				<button><i class="fa-solid fa-angle-left"></i></button>
			</div>
			<div class="text-3xl font-bold  ">{{ month }}</div>
			<div class="btn-next">
				<button><i class="fa-solid fa-angle-right"></i></button>
				<button><i class="fa-solid fa-angles-right"></i></button>
			</div>
		</div>
		
		<div class="month">
			<Month :month="month" />
		</div>
		
	</DavidUiLayout>
</template>

/**
https://vuejs.org/guide/introduction.html
*/
<script lang="ts">
import { ref, PropType, defineComponent, defineProps } from 'vue'
import { Options, Vue } from 'vue-class-component';
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import moment, { Moment } from "moment";
import { events, lunar, Lunar, toLunar } from '@/libraries';
import Month from "@/components/Month.vue"

export default defineComponent({
	components: {
		DavidUiLayout,
		Month
	},

	props: {
		month: {
			type: String,
			default: "2025-03"
		}
	},

	data() {
		return {
			date: '',
			month_number: '',
			start: moment(),
			end: moment(),
			days: 0
		}
	},

	mounted() {
		this.initDayOfMonth
	},

	methods:{
		print_day_of_month(i : number) : string {
			return this.start.clone().add(i, "days").format("DD")
		},

		is_current_month(i:number) : boolean{
			const day = this.start.clone().add(i, "days")
			return day.format("M")===this.month_number
		},
		not_current_month(i:number) : boolean{
			const day = this.start.clone().add(i, "days")
			return day.format("M")!==this.month_number
		},
		is_weekend(i:number) : boolean {
			const day = this.start.clone().add(i, "days")
			return ["Sa", "Su"].indexOf(day.format("dd")) > -1
		},

		lunar_day_of_month(i:number) : string {
			const day = this.start.clone().add(i, "days")
			const lunarDate: Lunar.LunarDate = toLunar(day);
			const lunarDay = lunarDate.format("DD")
			const lunarMonth = lunarDate.format("MM")
			if( lunarDay === "01"){
				return `${lunarDay}/${lunarMonth}`
			}
			return lunarDate.format("DD");
		},

		getDay(i:number): any {
			return this.start.clone().add(i, "days")
		},

		getEvent(day:any):any {
			const lunarDate: Lunar.LunarDate = toLunar(day);
			const lunarDateStr = lunarDate.format("YYYY-MM-DD")

			let eventsDate = events.filter((e)=>{
				if( e.solar===day.format("YYYY-MM-DD")) return true
				if( e.lunar===lunarDateStr) return true
			})
			return eventsDate
		},

		is_japan_holiday(i:number) : boolean {
			const day = this.start.clone().add(i, "days");
			let events = this.getEvent(day);
			if( events && events.length > 0 ){
			}
			
			events = events.filter((e:any)=>e.jp===true&&e.type==="holiday")
			return events.length > 0;
		},

		is_death_day(i:number) : boolean {
			const eventsDate = this.deathDay(i)
			if( eventsDate.length > 0 ){
				console.log(`===============`, {eventsDate})
			}
			return eventsDate.length > 0
		},

		deathDay(i:number): any {
			const day = this.start.clone().add(i, "days");
			const lunarDate: Lunar.LunarDate = toLunar(day);
			const lunarDateStr = lunarDate.format("YYYY-MM-DD")
			return events.filter((e)=>{
				if( !e.lunar) return false
				if( e.lunar===lunarDateStr && e.deathDate===true) return true
			})
			
		},

		is_holiday(i:number) : boolean {
			if( this.holidays(i).length > 0 ){
				console.log(`===== show holidays`, this.holidays(i))
			}
			
			return this.holidays(i).length > 0
		},

		holidays(i:number) : any {
			const day = this.start.clone().add(i, "days");
			let events = this.getEvent(day);
			return events.filter((e:any)=>e.type==="holiday")
		}
	},

	computed: {
		title(): string { return this.month ?? '' },

		greetingUppercased: {
			// getter
			get(): string {
				return this.date.toUpperCase()
			},
			// setter
			set(newValue: string) {
				this.date = newValue.toUpperCase()
			}
		},

		initDayOfMonth(): Moment {
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
			return moment()
		},

		dayOfMonth() : string {
			let index = 0
			if( !this.start ){
				return ''
			}
			return this.start.clone().add(index, "days").format("MM")
		},

		
	},

	
})
</script>
