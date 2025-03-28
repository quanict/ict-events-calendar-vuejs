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
import { mapActions, mapGetters } from "vuex";

@Options({

    components: {
        DavidUiLayout,
    },

    //props: {
    //      msg: { type: String, default: 'Welcome!' },
    //},

    data() {
    },

    created() {
        document.title = `Gallery`
        // listPhotos()
    },

    computed: {
        ...mapGetters(["listPhotos"]),
        queryParam() {
            return this.$route.query;
        },
    },

    getList() {
    //   this.$http.get(api).then((response:any) => {
    //     console.log(response.data)
    //   })
    }
})
export default class YearView extends Vue { }
</script>