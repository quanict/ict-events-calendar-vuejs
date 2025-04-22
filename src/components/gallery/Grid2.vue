<template>
  <div>
    <div class="border-1 border-solid text-left px-2 py-1">{{ date_format }}</div>
    <div class="gallery">
      <div v-for="img in photos" class="gallery-item">
        <img class="object-cover object-center w-full h-40 max-w-full rounded-lg" :src="thumbPath(img)"
          :src2="realPath(img)" alt="gallery-photo" @click="clickPhotoHandler(img)" />
        <div class="gallery-item-name">{{ filename(img) }}</div>
        <div v-if="isVideo(img)" class="gallery-item-video-icon"><i class="fa-duotone fa-solid fa-circle-play"></i></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { SET_PHOTO } from "@/services/store/photo-modal.module";
import moment from "moment";
import { PhotoDomain } from "@/configs/photos";
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
    photos: { type: Array },
  },
  data() {
    return {
      img_dns: '',
    };
  },
  created() {
    const directory = getDirectoryByDay(this.date)
    this.img_dns = `${PhotoDomain}/${directory}`
  },
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
    clickPhotoHandler(photo: any) {
      this[SET_PHOTO](photo);
    },
    thumbPath(img: any) {
      return "/imgs/img.svg";
      return `${this.img_dns}/${img.thumbnail}`;
    },
    realPath(img: any) {
      return `/${img.file}`;
    },

    filename(img: any): string {
      var filename = img.file.replace(/^.*[\\/]/, '')
      return filename
    },

    isVideo(img: any): boolean {
      const ext = img.file.split('.').pop().toLowerCase()
      return ["mp4", "mov"].indexOf(ext) > -1
    },

  },
  // watch: {
  //   status(newValue : any, oldValue:any) {
  //     console.log(`Updating from ${oldValue} to ${newValue}`);
  //   },
  // },



});
</script>
