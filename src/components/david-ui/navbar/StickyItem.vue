<template>
    <li>
      <RouterLink 
      v-if="menu.route" 
      :to="{name:menu.route}"
      :class="link_class" >
        <svg viewBox="0 0 24 24" class="h-4 w-4"><use :href="`#${icon}`" /></svg>
        {{ title }}
      </RouterLink>

      <a v-else :href="menu?.href"
          :class="link_class">
          <svg viewBox="0 0 24 24" class="h-4 w-4">
              <use :href="`#${icon}`" />
          </svg>
          {{ title }}
      </a>
    </li>
</template>
<script lang="ts">

import { ref,PropType, defineComponent, defineProps } from 'vue'
import { useStore } from 'vuex';
import {RouterLink} from "@/modules/vue-router"

interface MenuItem {
    title: string
    svg_icon: string
    href?: string
    route?: string
}

export default defineComponent({
  components:{
    // RouterLink
    RouterLink
  },
    props: {
    menu: {
      type: Object as PropType<MenuItem>,
      // Make sure to use arrow functions if your TypeScript version is less than 4.7
      default: () => ({
        title: 'Arrow Function Expression'
      }),
      validator: (menu: MenuItem) => !!menu.title
    },
    class: {
        type : String,
        default : ''
    }
  },
  data() {
    return {
        anchorClass : "font-sans antialiased text-sm text-current flex items-center gap-x-2 hover:text-primary",
        message : ''
    }
  },
  computed: {
    title(): string { return this.menu.title },
    icon(): string { return this.menu.svg_icon },
    link_class() : string {return `${this.anchorClass} ${this.class}`},
    greetingUppercased: {
      get(): string {
        // return this.greeting.toUpperCase()
        return ''
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
</script>