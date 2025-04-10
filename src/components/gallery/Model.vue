<template>
    <div 
    :class="`modal-container ${show_modal==true ? 'modal-activated ' : ''}`" 
    aria-hidden="true"
    @click="hidden"
    >
        <div class="model-content">
            <div v-if="show_header" class="pb-0 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/team-4.jpg"
                        alt="alex andrew" class="inline-block object-cover object-center w-11 h-11 rounded-md">
                    <div class="flex flex-col">
                        <p class="font-sans text-base text-stone-800 font-semibold">Alex Andrew</p>
                        <small class="font-sans text-sm text-stone-500 hidden">@alexandrew</small>
                    </div>
                </div>

                <div class="flex items-center gap-2 hidden">
                    <button class="btn-favorite">
                        <svg class="h-4 w-4">
                            <use :href="`#heart`" />
                        </svg>
                    </button>
                    <button class="btn-download ">Download</button>
                </div>
            </div>

            <div class="my-4">
                <img alt="nature"
                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/mt-demo.jpg"
                    :src2="url"
                    class="h-[48rem] w-full rounded-lg object-cover object-center">
            </div>

            <div v-if="show_footer" class="flex items-end justify-between">
                <div class="flex items-center gap-16">
                    <div>
                        <small class="font-sans  text-sm text-stone-500">Views</small>
                        <p class="font-sans  text-base text-stone-800 font-semibold">44,082,044</p>
                    </div>
                    <div>
                        <small class="font-sans  text-sm text-stone-500">Downloads</small>
                        <p class="font-sans  text-base text-stone-800 font-semibold">553,031</p>
                    </div>
                </div>
                <button
                    class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm rounded-md py-2 px-4 bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5 hover:border-stone-800/5 shadow-none hover:shadow-none">
                    <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg" color="currentColor" class="mr-1.5 h-4 w-4">
                        <path d="M20 13V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V13"
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12 15V3M12 3L8.5 6.5M12 3L15.5 6.5" stroke="currentColor" stroke-linecap="round"
                            stroke-linejoin="round"></path>
                    </svg>
                    Share
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * https://www.creative-tim.com/david-ui/docs/html/modal
 */
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapMutations } from "vuex";
import { GET_PHOTO, UNSET_PHOTO } from '@/services/store/photo-modal.module'

export default defineComponent({
    components: {},
    props: {
        show: String
    },
    data() {
        return {
            show_header: false,
            show_footer: false,
            show_modal : false,
            photo :{
                file: ''
            }
        }
    },

    computed: {
        url() : string {
            this.photo = this[GET_PHOTO]()
            if( !this.photo.file || this.photo.file.length < 1){
                return ''    
            }
            this.show_modal = true
            // console.log(`=== show photo`, this.photo)
            return this.photo.file
            return ''
        }
    },
    methods: {
        ...mapGetters([GET_PHOTO]),
        ...mapActions([UNSET_PHOTO]),
        ...mapMutations([]),
        hidden():void{
            this[UNSET_PHOTO]()
            this.show_modal = false
        }
    }
    

})
</script>

<style lang="css" scoped></style>