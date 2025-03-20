<template>
  <DavidUiLayout>
    <div> this is year view</div>
  </DavidUiLayout>
</template>

/**
https://vi.vuejs.org/v2/style-guide/#Dat-ten-component-dung-nhieu-tu-thiet-yeu
*/
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import moment from 'moment';

@Options({
  components: {
    DavidUiLayout
  },

  data() {
    year : 2024
  },

  created(){
    this.year = moment().format('YYYY')
  },

  props: {
    msg: { type: String, default: 'Welcome!' },
  },
})
export default class YearView extends Vue { }
</script>