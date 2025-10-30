<template>
    <DavidUiLayout>
        this is dashboard view
        <div class="text-3xl font-bold mt-10 ">Gallery</div>

        <div class="grid grid-cols-2 gap-4">


            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                v-for="(course) in courses">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <img :src="course.favicon" class="inline w-6 h-6 mr-2 mb-1" />
                        {{ course.title }}
                    </h5>
                </a>
                <div>
                    <img :src="course.logo" class="inline h-15 mr-2 mb-1" />
                </div>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ course.description }}</p>

                <div class="text-left mb-3">
                    <label for="website-admin"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only">Username</label>
                    <div class="flex mb-3">
                        <span
                            class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <i class="fa-duotone fa-solid fa-circle-user text-xl"></i>
                        </span>
                        <input type="text" id="website-admin"
                            class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="elonmusk" :value="course.username" readonly 
                        />
                    </div>


                     <label for="website-admin"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only">Password</label>
                    <div class="flex">
                        <span
                            class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <i class="fa-duotone fa-solid fa-circle-user text-xl"></i>
                        </span>
                        <input type="text" id="website-admin"
                            class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="elonmusk" :value="course.username" readonly 
                        />

                        <span
                            class="inline-flex items-center px-3 text-sm text-gray-900 border rounded-s-0 border-gray-300 border-s-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        </span>
                    </div>


                    
                </div>

                <a :href="course.link" target="_blank"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Vào Thi
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    </DavidUiLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DavidUiLayout from '@/views/layouts/DavidUiLayout.vue';
import Grid2 from "@/views/components/gallery/Grid2.vue"
import GridMasonry from "@/views/components/gallery/GridMasonry.vue"

export default defineComponent({
    components: {
        DavidUiLayout,
        Grid2,
        GridMasonry,
    },
    data() {
        return {
            courses: [
                {

                    favicon: "course/trangnguyen-edu-vn.png",
                    logo: "course/trang-nguyen-logo.svg",

                    title: "Trạng Nguyên Tiếng Việt",
                    link: "https://thi.trangnguyen.edu.vn/vao-thi-trang-nguyen-2023/?package_type=TNTV",
                    username: "nhatminh100619",
                    password: "Tanaka2013@",

                    description: "Sân chơi Trạng Nguyên Tiếng Việt Khối 1 Năm học 2025 - 2026",
                },

                {

                    favicon: "course/vio-favicon.png",
                    logo: "course/vio-edu-vn.png",

                    title: "Đấu trường VioEdu",
                    link: "https://vio.edu.vn/arena-ranking-mass",
                    username: "cbq1-4723",
                    password: "nhatminh19",
                    description: "Thi đấu trực tuyến trên nền tảng VioEdu từ 25/09/2025 đến tháng 03/2026 (25 tuần)",
                },

                {

                    favicon: "course/violympic.ico",
                    logo: "course/violympic.png",

                    title: "ViOlympic",
                    link: "https://violympic.vn/user-home",
                    username: "nhatminh100619",
                    password: "Tanaka2013@",

                    description: "",
                },
            ]
        }
    }
})
</script>