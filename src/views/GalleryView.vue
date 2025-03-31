<template>
    <DavidUiLayout>
        <div class="text-3xl font-bold mt-10 ">Gallery</div>
        <div class="gallery">
            <Photo v-for="p in photos" :info="p" :path="dayUrl" />
        </div>
    </DavidUiLayout>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';
import { mapActions, mapGetters } from "vuex";
import { GET_PHOTO_DAY, GET_PHOTOS_IN_DAY, GET_DAY_URL } from '@/services/store/photos.module';
import Photo from "@/components/gallery/Photo.vue"

@Options({

    components: {
        DavidUiLayout,
        Photo
    },

    data() {
        return {
            photos : []
        }
    },

    async created() {
        document.title = `Gallery`
        await this[GET_PHOTO_DAY]("2024-10-24");
        this.photos = this[GET_PHOTOS_IN_DAY]()
    },


    computed: {
        queryParam() {
            return this.$route.query;
        },
        dayUrl(){
            return this[GET_DAY_URL]()
        }
    },

    methods : {
        ...mapActions([GET_PHOTO_DAY]),
        ...mapGetters([GET_PHOTOS_IN_DAY, GET_DAY_URL]),
        
    }
})
export default class YearView extends Vue { }
</script>