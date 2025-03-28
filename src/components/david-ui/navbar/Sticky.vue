<template>
  <nav
    class="rounded-lg border shadow-lg overflow-hidden p-2 bg-white border-stone-200 shadow-stone-950/5 sticky top-0 mx-auto w-full max-w-screen-xl mt-3 mb-3"
    style="z-index: 9;"
    >
    <div class="flex items-center">

      <RouterLink 
      :to="{ name: 'home'}"
      class="font-sans antialiased text-sm text-current ml-2 mr-2 block py-1 font-semibold" >
      {{ app_name }}
      </RouterLink>

      <hr class="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
      <div class="hidden lg:block">
        <ul class="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
          <template v-for="menu, index in menus" v-bind:key="index">
            <DavidUiStickyItem :menu="menu" classes="p-1" />
          </template>
        </ul>
      </div>

      <button
        class="items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased hidden lg:ml-auto lg:inline-block"
        v-if="showSignIn">
        Sign In</button>

      <div data-dui-toggle="collapse" data-dui-target="#sticky-navbar-collapse" aria-expanded="false"
        aria-controls="sticky-navbar-collapse"
        class="place-items-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm min-w-[34px] min-h-[34px] rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-200/10 hover:border-stone-600/10 shadow-none hover:shadow-none ml-auto grid lg:hidden"
        @click="toggleMenuBar">
        <DavidUiStickyIcon icon="bars" />
      </div>
    </div>

    <div class="overflow-hidden transition-[max-height] duration-300 ease-in-out" v-if="showMenu">
      <ul class="flex flex-col gap-0.5 mt-2">
        <template v-for="menu, index in menus" v-bind:key="index">
          <DavidUiStickyItem :menu="menu" class="p-2 hover:bg-stone-100 rounded-md" />
        </template>

        <li class="mt-2" v-if="showSignIn">
          <button
            class="w-full items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1.5 px-3 shadow-sm hover:shadow bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased">
            Sign In</button>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import {RouterLink} from "@/router/vue-router"
import DavidUiStickyIcon from './StickyIcon.vue'
import DavidUiStickyItem from './StickyItem.vue'
import {APP_NAME} from "@/configs/app"


export default defineComponent({
  name: 'DavidUiNavBarSTicky',
  components: {
    DavidUiStickyIcon,
    DavidUiStickyItem,
    RouterLink
  },
  data() {
    return {
      menus: [
        { "title": "Year", 'svg_icon': "sun", route:"year.default" },
        { "title": "Month", 'svg_icon': "moon", route:"month.default" },
        { "title": "Day", 'svg_icon': "calendar", route:"day.default" },
        // { "title": "User", 'svg_icon': "circle-user" },
        // { "title": "Files", 'svg_icon': "files" },
        // { "title": "User", 'svg_icon': "box" },
        // { "title": "Blocks", 'svg_icon': "box" },
        // { "title": "Docs", 'svg_icon': "print" },
      ],
      showSignIn: false,
      showMenu: false,

    }
  },
  created() {
    this.showMenu = false
  },

  methods: {
    toggleMenuBar() {
      this.showMenu = !this.showMenu
      console.log("clicked")
    }
  },
  setup() {
    return {}
  },
  computed : {
    app_name():string { return APP_NAME}
  }
})
</script>