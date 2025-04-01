<template>
    <DavidUiLayout>
        <div class="text-3xl font-bold mt-10 ">Gallery</div>
        <Photos :date="date" />
    </DavidUiLayout>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import Photos from "@/components/gallery/Grid.vue"
import GridMasonry from "@/components/gallery/GridMasonry.vue"

/**
 * https://www.creative-tim.com/david-ui/docs/html/gallery
 */
 export default defineComponent({
    components: {
        DavidUiLayout,
        Photos,
        GridMasonry
    },
    computed: {},
    methods : {},
    data() {
        return {
            date: ''
        }
    },
    async created() {
        document.title = `Gallery`
        this.date = "2024-10-24"
       
    },
})
</script>