<template>
  <div>
    <div class="border-1 border-solid text-left px-2 py-1">{{ date_format }}</div>
    <div class="gallery">
      <div v-for="img in photos">
        <img class="object-cover object-center w-full h-40 max-w-full rounded-lg" :src="thumbPath(img)"
          :src2="realPath(img)" alt="gallery-photo" @click="clickPhotoHandler(img)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { SET_PHOTO } from "@/services/store/photo-modal.module";
import moment from "moment";
import { domain } from "@/configs/nhat-minh";
import { getDirectoryByDay } from "@/services/store/photos.module";

/**
 * https://www.creative-tim.com/david-ui/docs/html/gallery
 * https://vi.vuejs.org/v2/guide/instance
 */

interface DayImageProps {
  date: string;
  photos: [];
  // icon: any[];
}

// const props = defineProps<Props>();

export default defineComponent({
  components: {},
  props: {
    date: { type: String, required: true },
    photos: [],
  },
  // setup(props:DayImageProps) {
  //   console.log(`=====`, {props})
  // },

  data() {
    return {
      img_dns: '',
    };
  },
  created() {
    const directory = getDirectoryByDay(this.date)
    this.img_dns = `${domain}/${directory}`
  },
  // async updated() {},
  computed: {
    date_format(): string {
      if (!this.date) {
        return ''
      }
      return moment(this.date, "YYYY-MM-DD").format("YYYY-MM-DD");
    },
  },
  methods: {
    ...mapActions([SET_PHOTO]),

    thumbPath(img: any) {
      
      // return "/imgs/img.svg";
      return `${this.img_dns}/${img.thumbnail}`;
    },
    realPath(img: any) {
      return `/${img.file}`;
    },
    clickPhotoHandler(photo: any) {
      this[SET_PHOTO](photo);
    },
  },
  // watch: {
  //   status(newValue : any, oldValue:any) {
  //     console.log(`Updating from ${oldValue} to ${newValue}`);
  //   },
  // },



});
</script>
