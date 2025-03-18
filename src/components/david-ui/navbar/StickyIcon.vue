<template>
    <svg viewBox="0 0 24 24" class="h-4 w-4">
        <use :href="`#${icon}`" />
    </svg>
</template>
<script lang="ts">

import { defineComponent } from 'vue'
import { prop } from 'vue-class-component';

export default defineComponent({
    name: 'DavidUiStickyIcon',
    props: {
        icon: String
    },
    components: {},
    data() {
        return {
        }
    },
    created() {
    }
})
</script>