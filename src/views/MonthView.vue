<template>
	<DavidUiLayout>
		<div class="monthy-header">
			<div class="btn-previous">
				<button v-on:click="previous_year"><i class="fa-solid fa-angles-left"></i></button>
				<button v-on:click="previous_month"><i class="fa-solid fa-angle-left"></i></button>
			</div>
			<div class="text-3xl font-bold  ">{{ month }}</div>

			<div class="btn-next">
				<button v-on:click="next_month"><i class="fa-solid fa-angle-right"></i></button>
				<button v-on:click="next_year"><i class="fa-solid fa-angles-right"></i></button>
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
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import moment, { Moment } from "moment";
import Month from "@/components/month/Month.vue"

export default defineComponent({
	components: {
		DavidUiLayout,
		Month
	},

	data() {
		return {
			date: moment(),
		}
	},

	mounted() {},
	created(){
		const routeMonth = this.$route.params.month
		if (routeMonth) {
			this.date = moment(routeMonth, "YYYY-MM")
		} else {
			this.date = moment()
		}
	},

	methods: {
		push_route(): void {
			this.$router.push({ name: `month`, params: { month: this.date.format("YYYY-MM") } })
		},
		previous_year(): void {
			this.date = this.date.clone().add(-1, "year")
			this.push_route()

		},
		previous_month(): void {
			this.date = this.date.clone().add(-1, "month")
			this.push_route()
		},
		next_year(): void {
			this.date = this.date.clone().add(1, "year")
			this.push_route()

		},

		next_month(): void {
			this.date = this.date.clone().add(1, "month")
			this.push_route()
		},
	},

	computed: {
		month(): string { 
			return this.date.format("YYYY-MM")
		 },
	},


})
</script>
