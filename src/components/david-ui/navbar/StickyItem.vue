<template>
    <li>
        <a :href="menu?.href"
            :class="`${linkClasses} ${defaultClasses}`">
            <svg viewBox="0 0 24 24" class="h-4 w-4">
                <use :href="`#${icon}`" />
            </svg>
            {{ title }}
        </a>
    </li>
</template>
<script lang="ts">

import { defineComponent, defineProps } from 'vue'
import type { PropType } from 'vue'

interface MenuItem {
    title: string
    svg_icon: string
    href?: string
}

const props = defineProps<{
    menu: MenuItem,
    classes?: string
}>()

export default defineComponent({
    name: 'DavidUiStickyItem',
    props: {
        menu: Object as PropType<MenuItem>,
        linkClasses:''
    },
    components: {},
    data() {
        return {
            title: this.menu?.title,
            icon: this.menu?.svg_icon,
            defaultClasses: "font-sans antialiased text-sm text-current flex items-center gap-x-2 hover:text-primary",

        }
    },
    created() {
    }
})
</script>