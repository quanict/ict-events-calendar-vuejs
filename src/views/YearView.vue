<template>
  <DavidUiLayout>
    <div> this is year view</div>

    <div class="year">
      <template v-for="i in 12">
        <Month :month="`${year}-${i}`"/>
      </template>
    </div>
  </DavidUiLayout>
</template>

/**
https://vi.vuejs.org/v2/style-guide/#Dat-ten-component-dung-nhieu-tu-thiet-yeu
*/
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import Month from "@/components/Month.vue"
import moment from 'moment';

@Options({
  components: {
    DavidUiLayout,
    Month
  },

  props: {
    msg: { type: String, default: 'Welcome!' },
  },

  data() {
    year : 2024
  },

  created(){
    this.year = moment().format('YYYY')
  },
})
export default class YearView extends Vue { }
</script>