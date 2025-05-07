<template>
	<DavidUiLayout>
        <div class="component-day">
            <div class="data">
                <div class="year">
                    {{ date.format(`MMMM YYYY`) }}
                </div>
                <div class="detail">
                    <div class="solar-day-of-month">
                        {{ date.format(`DD`) }}
                    </div>
                    <div class="solar-day-of-week mb-5">
                        {{ date.format(`dddd`) }}
                    </div>

                    <div class="lunar-day-month">
                        <div class="lunar-day-month-m">{{ lunar_month_name }}</div>
                        <div class="lunar-day-month-d">{{ lunar_day }}</div>
                        <div class="lunar-day-month-y">{{ year_can_chi }}</div>
                    </div>
                    <div class="lunar-day-detail">
                        <div>
                            <label>Ngày</label><span>{{ day_can_chi }}</span>
                        </div>
                        <div>
                            <label>Tháng</label><span>{{ month_can_chi }}</span>
                        </div>
                        <div>
                            <label>Giờ đầu</label><span>{{ hours_can_chi }}</span>
                        </div>
                        <div>
                            <label>Tiết</label><span>{{ tiet_khi }}</span>
                        </div>
                    </div>

                    <div class="lunar-good-hours pt-5 pb-5">
                        <label>Giờ hoàng đạo:</label>
                        <span v-for="txt in gio_hoang_dao" >{{ txt }}</span>
                    </div>
                </div>
            </div>
        </div>
    </DavidUiLayout>
</template>

<script lang="ts">
import { ref, PropType, defineComponent, defineProps } from 'vue'
import DavidUiLayout from '@/views/layouts/DavidUiLayout.vue';
import moment, { Moment } from "moment";
import { Lunar, lunar, toLunar } from '@/libraries';

/**
 * https://lichviet.app/
 */
export default defineComponent({
	components: {
		DavidUiLayout,
	},
    data() {
		return {
			date: moment(),
            lunar: {},
            can_chi: {},
		}
	},
    created(){
        const routeDate = null;
		// const routeDate = this.$route.params.date
		if (routeDate) {
			this.date = moment(routeDate, "YYYY-MM-DD").locale("vn")
		} else {
			this.date = moment().locale("vi")
		}

        this.lunar = lunar(this.date);
        this.can_chi = (this.lunar as Lunar.LunarDate).can_chi
	},

    computed:{
        lunar_day(): string{
            return (this.lunar as Lunar.LunarDate).format("DD")
        },
        lunar_month_name(): string{
            return (this.lunar as Lunar.LunarDate).format("MMMMMM")
        },

        year_can_chi(): string{
            const canChi : Lunar.CanChi = (this.lunar as Lunar.LunarDate).can_chi
            return canChi.year_name
        },

        day_can_chi(): string{
            const canChi : Lunar.CanChi = (this.lunar as Lunar.LunarDate).can_chi
            return canChi.day_name
        },

        month_can_chi(): string{
            const canChi : Lunar.CanChi = (this.lunar as Lunar.LunarDate).can_chi
            return canChi.month_name
        },

        hours_can_chi(): string{
            const canChi : Lunar.CanChi = (this.lunar as Lunar.LunarDate).can_chi
            return canChi.can_hour_start
        },

        tiet_khi(): string{
            const canChi : Lunar.CanChi = (this.lunar as Lunar.LunarDate).can_chi
            return canChi.tiet_khi
        },

        gio_hoang_dao(): string[] {
            const canChi : Lunar.CanChi = (this.lunar as Lunar.LunarDate).can_chi
            return canChi.gio_hoang_dao
            
        }

    }

   
})
</script>