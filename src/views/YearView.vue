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

@Options({
  components: {
    DavidUiLayout
  },

  data() {
    year : 2024
  },

  props: {
    msg: { type: String, default: 'Welcome!' },
  },
})
export default class YearView extends Vue { }
</script>