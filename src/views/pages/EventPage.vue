<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { ref, PropType, defineComponent, defineProps } from 'vue'
import DavidUiLayout from '@/views/layouts/DavidUiLayout.vue';
import moment, { Moment } from "moment";
import { events, lunar, Lunar, toLunar } from '@/libraries';

export default defineComponent({
  components: {
    DavidUiLayout,
  },
  setup() {},
  mounted(){
    this.initData()
  },
  computed: {},
  methods:{
    initData(){
      const data = events;
      console.log(` debug get event`, {data})
    }
  },
})
</script>