<template>
  <DavidUiLayout>

    <div class="monthy-header">
      <div class="btn-previous">
        <button v-on:click="previous_year"><i class="fa-solid fa-angles-left"></i></button>
      </div>

      <div class="text-3xl font-bold mt-10 ">{{ year }}</div>

      <div class="btn-next">
        <button v-on:click="next_year"><i class="fa-solid fa-angles-right"></i></button>
      </div>
    </div>

    <div class="year">
      <template v-for="i in 12">
        <div :id="`month-${year}-${i}`">
          <Month :month="`${year}-${i}`" :ref="`month-${year}-${i}`" />
        </div>
      </template>
    </div>
  </DavidUiLayout>
</template>

/**
https://vi.vuejs.org/v2/style-guide/#Dat-ten-component-dung-nhieu-tu-thiet-yeu
*/
<script lang="ts">
import { defineComponent, ref, useTemplateRef } from 'vue';
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import Month from "@/components/month/Month.vue"
import moment, { Moment } from 'moment';

/**
 * https://vueuse.org/core/useScroll/
 */
export default defineComponent({
  components: {
    DavidUiLayout,
    Month
  },

  props: {
    msg: { type: String, default: 'Welcome!' },
  },

  data() {
    return {
      year: ''
    }
  },

  beforeCreate() {


  },
  mounted() {

  },
  created() {
    this.year = moment().format('YYYY')
    document.title = `year ${this.year}`
    this.scrollToCurrent()

  },

  methods: {
    previous_year(): void {
      this.year = moment(this.year, 'YYYY').add(-1, "year").format('YYYY')
      document.title = `year ${this.year}`
    },
    next_year(): void {
      this.year = moment(this.year, 'YYYY').add(1, "year").format('YYYY')
      document.title = `year ${this.year}`
    },
    scrollToCurrent() {
      setTimeout(function () {
        const monthRef = `month-${moment().format("YYYY-M")}`
        const currentMonth = document.getElementById(monthRef)
        console.log(`=== find month`, { currentMonth, monthRef })
        if (currentMonth) {
          currentMonth.scrollIntoView({ behavior: "smooth"})
        }
      }, 500);

    },
  },

})

</script>