<template>
    <DavidUiLayout>
        <div class="text-3xl font-bold mt-10 ">Gallery</div>

        <div class="gallery">

        </div>
    </DavidUiLayout>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import { mapActions, mapGetters, mapMutations } from "vuex";
import {domain, paths} from "@/configs/nhat-minh"
import { SET_DATE, FETCH_DIRS, GET_DAYS_CURRENT_DIR, SET_DIR_NAME, GET_PHOTO_DAY } from '@/services/store/photos.module';
@Options({

    components: {
        DavidUiLayout,
    },

    //props: {
    //      msg: { type: String, default: 'Welcome!' },
    //},

    data() {
        return {}
    },

    async created() {
        document.title = `Gallery`

        this.date = "2024-10-24"
        this.$store.commit(SET_DATE, this.date)
        
        // await this[SET_DIR_NAME](paths[0])
        // await this[FETCH_DIRS]()
        
        const photos = this[GET_PHOTO_DAY]("2024-10-24");
        // console.log(`===== debug create`, {photos})
    },


    computed: {
        
        queryParam() {
            return this.$route.query;
        },
    },

    methods : {
        ...mapActions([FETCH_DIRS, SET_DIR_NAME, GET_PHOTO_DAY]),
        ...mapGetters([GET_DAYS_CURRENT_DIR]),
        ...mapMutations([]),
        
    }
})
export default class YearView extends Vue { }
</script>