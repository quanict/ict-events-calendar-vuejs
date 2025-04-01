<template>
    <div class="gallery grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div v-for="img in photos">
            <img 
            class="object-cover object-center w-full h-40 max-w-full rounded-lg" 
            :src="`${path}/${img.thumbnail }`"
            :src2="`${path}/${img.file }`"
            alt="gallery-photo" 
            />
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from "vuex";
import { GET_PHOTO_DAY, GET_PHOTOS_IN_DAY, GET_DAY_URL } from '@/services/store/photos.module'
import { DayPhotosType, PhotoJson } from "@/services/types"

/**
 * https://www.creative-tim.com/david-ui/docs/html/gallery
 */
export default defineComponent({
    components: {},
    setup(props) {},
    props: {
        date: String
    },
    data() {
        return {
            dayData : <DayPhotosType>{},
            path : <String>'',
            photos : <Array<PhotoJson>>[],
        }
    },
    async mounted() {
        await this[GET_PHOTO_DAY](this.date);
        this.dayData = this[GET_PHOTOS_IN_DAY]()
        this.path = this.dayData.path
        this.photos = this.dayData.items
    },
    methods: {
        ...mapActions([GET_PHOTO_DAY]),
        ...mapGetters([GET_PHOTOS_IN_DAY, GET_DAY_URL]),
    }
})
</script>
