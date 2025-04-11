<template>
    <DavidUiLayout>
        <div class="text-3xl font-bold mt-10 ">Gallery</div>

        <template v-if="not_loading">
            <Photos v-show="hasNotDate(d)" v-for="d in days" :date="d" />
        </template>

        <div v-if="day_next" class="item flex flex-wrap justify-center gap-4">
            <button class="btn-outline" @click="loadNextDay">View More</button>
        </div>
    </DavidUiLayout>
    <ModelPhoto />
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapActions, mapGetters } from "vuex";
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import Photos from "@/components/gallery/Grid.vue"
import GridMasonry from "@/components/gallery/GridMasonry.vue"
import ModelPhoto from '@/components/gallery/Model.vue';
import { HAS_NEXT_DAY, GET_PHOTO_DAY, IS_LOADING, NOT_LOADING, HAS_LOADED_DATE } from '@/services/store/photos.module'
import { useRoute } from 'vue-router'

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
    computed: {
        not_loading(): boolean { return this[NOT_LOADING]() },
        is_loading(): boolean { return this[IS_LOADING]() },

    },
    methods: {
        ...mapActions([HAS_NEXT_DAY, GET_PHOTO_DAY, HAS_LOADED_DATE]),
        ...mapGetters([IS_LOADING, NOT_LOADING]),

        async loadNextDay() {
            console.warn(`======== clicked loadmore`)
            if (this.day_next === null) {
                return
            }
            this.days.push(this.day_next)
            await this[GET_PHOTO_DAY](this.day_next);
            this.day_next = await this[HAS_NEXT_DAY](this.day_next)
        },

        async hasNotDate(date: string) {
            let hasLoaded: any = await this[HAS_LOADED_DATE](date)
            return hasLoaded
        },
    },
    data() {
        return {
            days: ref<string[]>([]),
            date: '',
            day_next: ref<string | null>(''),
            day_previous: {},
        }
    },
    async mounted() {
        document.title = `Gallery`
    },

    async created() {
        console.log(`======= GalleryView.created`)

        const route = useRoute()
        const dayQuery = route.query.day
        let day: string
        if (!dayQuery || dayQuery.length < 10) {
            day = "2024-10-24"
        } else {
            day = dayQuery as string
        }

        console.log(`======= GalleryView.created day=[${day}]`)

        this.days = []
        this.days.push(day)
        await this[GET_PHOTO_DAY](day);
        this.day_next = await this[HAS_NEXT_DAY](day)
    },
})
</script>