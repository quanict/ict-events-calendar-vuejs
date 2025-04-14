<template>
  <div>
    <div class="border-1 border-solid text-left px-2 py-1">{{ date_format }}</div>
    <div class="gallery">
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
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { SET_PHOTO } from "@/services/store/photo-modal.module";
import moment from "moment";

/**
 * https://www.creative-tim.com/david-ui/docs/html/gallery
 * https://vi.vuejs.org/v2/guide/instance
 */
export default defineComponent({
  components: {},
  setup(props) {},
  props: {
    date: String,
    photos: "",
  },
  data() {
    return {
      datetime: moment(),
    };
  },
  async created() {},
  async updated() {},
  
  methods: {
    ...mapActions([SET_PHOTO]),

    thumbPath(img: any) {
      return "/imgs/img.svg";
      return `${img.thumbnail}`;
    },
    realPath(img: any) {
      return `/${img.file}`;
    },
    clickPhotoHandler(photo: any) {
      this[SET_PHOTO](photo);
    },
  },
  watch: {
    status(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
    },
  },

  computed: {
    date_format : () => {
      return moment(this.date, "YYYY-MM-DD").format("YYYY-MM-DD");
    },
  },
  
});
</script>
