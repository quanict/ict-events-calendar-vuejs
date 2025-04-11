<template>
   <div>
    <div class="border-1 border-solid text-left px-2 py-1">{{ datetime.format("YYYY-MM-DD") }}</div>
    <div class="gallery ">
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
   </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapMutations } from "vuex";
import { GET_PHOTO_DAY, GET_PHOTOS_IN_DAY, PUSH_LOADED_DATE, HAS_LOADED_DATE } from '@/services/store/photos.module'
import { PUSH_PHOTO, SET_PHOTO, SET_DATE  } from '@/services/store/photo-modal.module'
import { DayPhotosType, PhotoJson } from "@/services/types"
import moment from "moment";

/**
 * https://www.creative-tim.com/david-ui/docs/html/gallery
 * https://vi.vuejs.org/v2/guide/instance
 */
export default defineComponent({
    components: {},
    setup(props) {
        console.log(`==== PhotoGrid.setup`, {props})
    },
    props: {
        date: String
    },
    data() {
        return {
            datetime: moment(),
            dayData : <DayPhotosType>{},
            path : <String>'',
            photos : <Array<PhotoJson>>[],
        }
    },
    async created() {
        console.log(`==== PhotoGrid.created [${this.date}]`)
        this.init()
    },
    async updated(){
        console.log(`==== PhotoGrid.updated [${this.date}]`)
        let hasLoaded : any = await this[HAS_LOADED_DATE](this.date)
            if(  hasLoaded ){
                return
            }
        this.init()
    },
    computed:{},
    methods: {
        ...mapActions([GET_PHOTO_DAY, SET_PHOTO, HAS_LOADED_DATE]),
        ...mapGetters([GET_PHOTOS_IN_DAY]),
        ...mapMutations([SET_DATE, PUSH_LOADED_DATE, ]),
        async init(){
            let hasLoaded : any = await this[HAS_LOADED_DATE](this.date)
            if(  hasLoaded ){
                this.initPhotos()
                return
            }
            
            this.datetime = moment(this.date, "YYYY-MM-DD")

            this[SET_DATE](this.date)
            // await this[GET_PHOTO_DAY](this.datetime.format("YYYY-MM-DD"))
            this.initPhotos()
        },
        async initPhotos(){
            this.dayData = this[GET_PHOTOS_IN_DAY]()
            if( this.dayData.items ){
                this[PUSH_LOADED_DATE](this.date)
            }

            console.log(`======= PhotoGrid.init [${this.date}]`, )
            this.path = this.dayData.path
            this.photos = this.dayData.items
        },
        clickPhotoHandler(photo:any){
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
