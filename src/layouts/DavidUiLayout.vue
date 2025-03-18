<template>
  <div class="w-full">
    <DavidUiNavBarSTicky />
    <main class="w-full">
      <div class="mx-auto max-w-xl">
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
import DavidUiNavBarSTicky from '@/components/david-ui/navbar/Sticky.vue';
import Icons from '@/components/Icons.vue';

@Options({
  components: {
    DavidUiNavBarSTicky,
    Icons
  },
})
export default class DavidUiLayout extends Vue { }
</script>