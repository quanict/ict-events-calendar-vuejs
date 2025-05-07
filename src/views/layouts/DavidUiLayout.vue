<template>
  <div class="nh-calendar w-full">
    <DavidUiNavBarSTicky />
    <main class="w-full">
      <div class="container">
        <slot />
      </div>
    </main>
    <Icons />
  </div>
  
</template>


<script lang="ts">
/**
https://www.creative-tim.com/david-ui/docs/html/navbar
*/
import { Vue, Options } from 'vue-class-component';
import DavidUiNavBarSTicky from '@/views/components/david-ui/navbar/Sticky.vue';
import Icons from '@/views/components/Icons.vue';
import ModelPhoto from '@/views/components/gallery/Model.vue';

@Options({
  components: {
    DavidUiNavBarSTicky,
    Icons,
    ModelPhoto
  },
})
export default class DavidUiLayout extends Vue { }
</script>