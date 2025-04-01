<template>
  <div class="nh-calendar w-full">
    <DavidUiNavBarSTicky />
    <main class="w-full">
      <div class="container">
        <slot />
      </div>
    </main>
    <Icons />
    <ModelPhoto show="1" />
  </div>


  
</template>


<script lang="ts">
/**
https://www.creative-tim.com/david-ui/docs/html/navbar
*/
import { Vue, Options } from 'vue-class-component';
import DavidUiNavBarSTicky from '@/components/david-ui/navbar/Sticky.vue';
import Icons from '@/components/Icons.vue';
import ModelPhoto from '@/components/gallery/Model.vue';

@Options({
  components: {
    DavidUiNavBarSTicky,
    Icons,
    ModelPhoto
  },
})
export default class DavidUiLayout extends Vue { }
</script>