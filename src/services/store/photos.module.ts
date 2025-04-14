import { paths as PhotoDirectories, domain } from "@/configs/nhat-minh";
import apiService from "../api/ApiService";
import moment, { Moment } from "moment";

export const IS_LOADING = "isLoading"
export const NOT_LOADING = "isNotLoading"
export const GET_DAY_URL = "getDayURL"
export const GET_PHOTO_DAY = "getPhotosDay";
export const GET_PHOTOS = "getListPhotos";
export const GET_PHOTOS_IN_DAY = "getPhotoInDay"
export const GET_ALL_PHOTOS = "getAllPhotos"
export const FETCH_DIRS = "fetchDirectories";
export const FETCH_DIR = "fetchPhotosInDirectory";
export const GET_DAYS_CURRENT_DIR = "getDaysInCurrentDirectory"
const PUSH_DIRS = "pushDirectories"
export const SET_DIR_NAME = "setDirectoryName"
const MUT_DIR_NAME = "storeDirectoryName"
export const SET_DATE = "setDate"
const SET_PHOTOS = "setPhotos"
export const HAS_NEXT_DAY = "has_next_day"

export const PUSH_LOADED_DATE = "pushDateLoaded"
export const HAS_LOADED_DATE = "hasDateLoaded"

const getDirectoryByDay = (date: Moment|string) => {
    if( typeof date === 'string'){
        date = moment(date, "YYYY-MM-DD")
    }
    for (const [name, dateRange] of Object.entries(PhotoDirectories)) {
        const start = moment(dateRange[0], "YYYY-MM-DD")
        const end = moment(dateRange[1], "YYYY-MM-DD")
        if (end.diff(date, 'days') >= 0 && date.diff(start, 'days') >= 0) {
            return name
        }
    }
    return null
}

const state = {
    isLoading: false,
    directories: {},
    photos: {},
    directory_name: '',
    current_date: '',
    dates_viewed: []
}

const getters = {
    [IS_LOADING](state: any) { return state.isLoading },
    [NOT_LOADING](state: any) { return !state.isLoading },
    [GET_ALL_PHOTOS](state: any) { return state.photos },

    [GET_DAYS_CURRENT_DIR](state: any) {
        return state.directories[state.directory_name]
    },

    [GET_DAY_URL](state: any) {
        const date = state.current_date.format("MMDD")
        return `${domain}/${state.directory_name}/${date}`
    },

    [GET_PHOTOS_IN_DAY](state: any) {
        if (!state.current_date) {
            return {}
        }
        return {
            path: `${domain}/${state.directory_name}`,
            items: state.photos[state.current_date.format("YYYY-MM-DD")]
        }
    },

}

const mutations = {
    [PUSH_DIRS](state: any, data: WindowProxy) {
        state.directories[state.directory_name] = data;
    },

    [MUT_DIR_NAME](state: any, name: string) {
        state.directory_name = name;
    },

    [SET_DATE](state: any, str: string) {
        console.log(`==== call mutations.SET_DATE`)
        try {
            state.current_date = moment(str, "YYYY-MM-DD")
            for (const [name, dateRange] of Object.entries(PhotoDirectories)) {
                const start = moment(dateRange[0], "YYYY-MM-DD")
                const end = moment(dateRange[1], "YYYY-MM-DD")
                if (end.diff(state.current_date, 'days') >= 0 && state.current_date.diff(start, 'days') >= 0) {
                    state.directory_name = name;
                }
            }
        } catch (e) {
            console.error(`==== got exceptin`, { e })
        }
    },

    [SET_PHOTOS](state: any, obj: any) {
        state.photos[obj.date] = obj.files
    },

    [PUSH_LOADED_DATE](state: any, date: string) {
        state.dates_viewed.push(date)
    },
}

const actions = {
    async [FETCH_DIRS](context: any) {
        const files = `${context.state.directory_name}/all.json`
        const response = await apiService.get(files)
        context.commit(PUSH_DIRS, response.data);
    },

    async [FETCH_DIR](context: any, dayStr: string) {
        const day = moment(dayStr, "YYYY-MM-DD").format("MMDD")
        // const files = `${dayGroup}/${day}/files.json`
        // const response = await apiService.get(files)
        // context.commit(SET_PHOTOS, response.data);
    },

    [SET_DIR_NAME](context: any, name: string) {
        context.commit(MUT_DIR_NAME, name)
    },

    async [GET_PHOTO_DAY](context: any, day: string) {
        try {
            if (context.state.isLoading === true) {
                console.warn(`==== date ${day} GET_PHOTO_DAY is working`)
                return
            }
            if (
                context.state.current_date
                && context.state.current_date.format("YYYY-MM-DD") === day
            ) {
                console.warn(`==== date ${day} not change in store STATE`)
                return
            }
            if (day.length < 10) {
                console.error(`==== GET_PHOTO_DAY please input day`)
                return
            }

            context.state.isLoading = true
            let dayStr = day
            if (day.length < 10) {
                dayStr = moment(new Date()).format("YYYY") + `-${day}`;
            }
            const date = moment(dayStr, "YYYY-MM-DD")

            const photoDir = await getDirectoryByDay(date)
            //await context.commit(SET_DATE, dayStr)

            if( photoDir === null){
                console.warn(`==== can not get directory of day [${day}]`, {day, dayStr, photoDir})
                return
            }

            let dirs = context.state.directories[photoDir]
            if (!dirs) {
                // await context.dispatch(FETCH_DIRS)
                const response = await apiService.get(`${photoDir}/all.json`)
                context.state.directories[photoDir] = response.data;
                // await context.commit(PUSH_DIRS, photoDir, response.data);
            }

            dirs = context.state.directories[photoDir]

            context.state.isLoading = false

            if (dirs[date.format("YYYY-MM-DD")] > 0) {
                const files = `${photoDir}/${date.format("MMDD")}/files.json`
                const response : any = await apiService.get(files)
                context.state.photos[date.format("YYYY-MM-DD")] = response.data.files
                context.commit(PUSH_LOADED_DATE, date.format("YYYY-MM-DD"))
                return response.data
            }
            return null
        } catch (e) {
            console.error(`=== GET_PHOTO_DAY got exception`, { e })
        }
        return false
    },

    async [HAS_NEXT_DAY](context: any, day: any) {
        
        const photoDir = await getDirectoryByDay(day)
        if( !photoDir ){
            return null
        }
        const directories = context.state.directories[photoDir];

        if (!directories) {
            return null
        }

        const days = Object.keys(directories)
        const index = days.indexOf(day)
        if (index + 1 === days.length) {
            return null
        }

        return days[index + 1]
    },

    [HAS_LOADED_DATE](context: any, date: string) {
        return context.state.dates_viewed.indexOf(date) > -1
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};