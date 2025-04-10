<template>
    <div class="gallery grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div v-for="img in photos">
            <img 
                class="object-cover object-center w-full h-40 max-w-full rounded-lg" 
                :src="thumbPath(img)"
                :src2="realPath(img)"
                alt="gallery-photo" 
                @click="clickPhotoHandler(img)"
            />
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from "vuex";
import { GET_PHOTO_DAY, GET_PHOTOS_IN_DAY, GET_DAY_URL } from '@/services/store/photos.module'
import { PUSH_PHOTO, SET_PHOTO } from '@/services/store/photo-modal.module'

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
    computed:{},
    methods: {
        ...mapActions([GET_PHOTO_DAY, SET_PHOTO]),
        ...mapGetters([GET_PHOTOS_IN_DAY, GET_DAY_URL]),
        clickPhotoHandler(photo:any){
            console.log(`==== clicked photo`, {photo})
            this[SET_PHOTO](photo);
        },
        thumbPath(img:any){
            return "/imgs/img.svg"
            return `${this.path}/${img.thumbnail }`
        },
        realPath(img:any){
            return `${this.path}/${img.file }`
        },
    },
    watch:{
        status(newValue, oldValue) {
            console.log(`Updating from ${oldValue} to ${newValue}`);
        }
    }
})
</script>
