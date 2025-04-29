<template>
    <DavidUiLayout>
        <div class="text-3xl font-bold mt-10 ">Gallery</div>
        <div v-if="message">{{ message }}</div>

        <template v-if="not_loading">
            <!-- <Photos v-show="hasNotDate(d)" v-for="d in days" :date="d" /> -->
            <Photos v-for="(photos_day, date) in all_photo" :date="date" :photos="photos_day"  />
        </template>

        <div v-if="day_next" class="item flex flex-wrap justify-center gap-4 mt-5">
            <a :href="day_next_href" class="btn-outline" @click="loadNextDay">View More</a>
        </div>
    </DavidUiLayout>
    <ModelPhoto />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from "vuex";
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import Photos from "@/components/gallery/Grid2.vue"
import GridMasonry from "@/components/gallery/GridMasonry.vue"
import ModelPhoto from '@/components/gallery/Model.vue';
import { HAS_NEXT_DAY, GET_PHOTO_DAY, IS_LOADING, NOT_LOADING, HAS_LOADED_DATE, GET_ALL_PHOTOS } from '@/services/store/photos.module'
import {GET_MESSAGE} from '@/services/store/notification.module'
import { useRoute } from 'vue-router'

interface PhotosDays {
    "date": '',
    "files" : []
}

const date_default = "2024-08-01"
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
    setup(){
        
    },
    computed: {
        ...mapGetters([GET_MESSAGE]),
        not_loading(): boolean { return this[NOT_LOADING]() },
        is_loading(): boolean { return this[IS_LOADING]() },
        message(): any { return this[GET_MESSAGE]},
        all_photo() : any {
            return this[GET_ALL_PHOTOS]()
        },
        day_next_href():string{
            const route = useRoute()
            return `${route.path}?date=${this.day_next}`
        },
    },
    methods: {
        ...mapActions([HAS_NEXT_DAY, GET_PHOTO_DAY, HAS_LOADED_DATE ]),
        ...mapGetters([IS_LOADING, NOT_LOADING, GET_ALL_PHOTOS]),
        
        async loadNextDay() {
            if (this.day_next === null) {
                return
            }
            this.getData(this.day_next)
        },

        async hasNotDate(date: string) {
            let hasLoaded: any = await this[HAS_LOADED_DATE](date)
            return hasLoaded
        },
        async getData(day : string ) {
            await this[GET_PHOTO_DAY](day);
            this.day_next = await this[HAS_NEXT_DAY](day)
        },

        handleScroll(e:any){
            // console.log(`==== handleScroll`, {e})
        }
    },
    data() {
        return {
            // days: ref<string[]>([]),
            days: ref<PhotosDays[]>([]),
            date: ref<string | null>(''),
            day_next: ref<string | null>(''),
            day_previous: {},
        }
    },
    async mounted() {
        document.title = `${process.env.VUE_APP_BABY}`
    },

    async created() {
        
        const route = useRoute()
        const dayQuery = route.query.day
        let day: string
        if (!dayQuery || dayQuery.length < 10) {
            day = date_default
        } else {
            day = dayQuery as string
        }

        const queryParams = new URLSearchParams(window.location.search);
        const dateFromQuery = queryParams.get("date") 
        if( dateFromQuery ){
            day = dateFromQuery as string
        }
        
        this.days = []
        this.getData(day)
        window.addEventListener('scroll', this.handleScroll);
        console.log(`======= GalleryView.created day=[${day}] day_next=${this.day_next}`)
    },
    unmounted () {
        // window.removeEventListener('scroll', this.handleScroll);
    },
})
</script>