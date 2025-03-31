<template>
    <div>
        <img  :title="title" :src="thumbnail" />
    </div>
</template>


<script lang="ts">
import { ref, PropType, defineComponent, defineProps } from 'vue'
import {PhotoJson} from "@/services/types"

export default defineComponent({
    components: {
    },

    props: {
        path: {
            type: String,
            default: "",
            // required: true,

        },
        info:{
            type : Object as PropType<PhotoJson>,
            default: undefined
        }
       
    },

    data() {
        return {
        }
    },

    created() {
    },

    methods: {
       
    },

    computed: {
        title(): string|undefined { 
            return this.info?.file
        },
        src(): string {
            let domain = this.path
            domain += '/'+this.info?.thumbnail 
            return domain
        },
        thumbnail(): string {
            let domain = this.path
            domain += '/../'+this.info?.thumbnail 
            return domain
        },
    },

    watch: {
        
    },


})
</script>
