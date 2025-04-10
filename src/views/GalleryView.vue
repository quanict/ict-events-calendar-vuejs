<template>
    <DavidUiLayout>
        <div class="text-3xl font-bold mt-10 ">Gallery</div>
        <Photos :date="date" />
    </DavidUiLayout>
    <ModelPhoto />
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import Photos from "@/components/gallery/Grid.vue"
import GridMasonry from "@/components/gallery/GridMasonry.vue"
import ModelPhoto from '@/components/gallery/Model.vue';

/**
 * https://www.creative-tim.com/david-ui/docs/html/gallery
 */
 export default defineComponent({
    components: {
        DavidUiLayout,
        Photos,
        GridMasonry,
        ModelPhoto
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