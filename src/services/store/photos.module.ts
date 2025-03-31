import { isProxy, toRaw } from 'vue';
import { paths, domain } from "@/configs/nhat-minh";
import apiService from "../api/ApiService";
import { ApiResponse } from "../types";
import moment, {Moment} from "moment";

export const GET_DAY_URL = "getDayURL"
export const GET_PHOTO_DAY = "getPhotosDay";
export const GET_PHOTOS = "getListPhotos";
export const GET_PHOTOS_IN_DAY = "getPhotoInDay"
export const FETCH_DIRS = "fetchDirectories";
export const FETCH_DIR = "fetchPhotosInDirectory";
export const GET_DAYS_CURRENT_DIR = "getDaysInCurrentDirectory"
const PUSH_DIRS = "pushDirectories"
export const SET_DIR_NAME = "setDirectoryName"
const MUT_DIR_NAME = "storeDirectoryName"
export const SET_DATE = "setDate"
const SET_PHOTOS = "setPhotos"

const state = {
    directories : {},
    photos : {},
    directory_name:'',
    current_date: ''
}

const getters = {
    [GET_DAYS_CURRENT_DIR](state : any){
        return state.directories[state.directory_name]
    },
    
    [GET_DAY_URL](state:any){
        const date = state.current_date.format("MMDD")
        return `${domain}/${state.directory_name}/${date}`
    },

    [GET_PHOTOS_IN_DAY](state:any){
        return toRaw(state.photos[state.current_date.format("YYYY-MM-DD")])
    }
}

const mutations = {
    [PUSH_DIRS](state : any,  data: WindowProxy) {
        state.directories[state.directory_name] = data;
    },

    [MUT_DIR_NAME](state : any,  name:string){
        state.directory_name = name;
    },

    [SET_DATE](state : any,  str:string){
        let date = moment(str, "YYYY-MM-DD")
        state.current_date = date

        for (const [name, dateRange] of Object.entries(paths)) {
            const start = moment(dateRange[0], "YYYY-MM-DD")
            const end = moment(dateRange[1], "YYYY-MM-DD")
            if( end.diff(date, 'days') >= 0 && date.diff(start, 'days') >= 0 ){
                state.directory_name = name;
            }
        }
    },

    [SET_PHOTOS](state:any, obj : any){
        state.photos[obj.date] = obj.files
    }
}

const actions = {
    async [FETCH_DIRS](context:any){
        const files = `${context.state.directory_name}/all.json`
        const response = await apiService.get(files)
        context.commit(PUSH_DIRS, response.data);
    },

    async [FETCH_DIR](context:any, dirname: string){
        const day = moment(dirname, "YYYY-MM-DD").format("MMDD")
        const files = `${context.state.directory_name}/${day}/files.json`
        const response = await apiService.get(files)
        context.commit(SET_PHOTOS, response.data);
        
    },

    [SET_DIR_NAME](context:any,name:string){
        context.commit(MUT_DIR_NAME, name)
    },

    async [GET_PHOTO_DAY](context:any, day:string){
        let dayStr = day
        if( day.length < 10){
            dayStr = moment(new Date()).format("YYYY")+`-${day}`;
        }
        await context.commit(SET_DATE, dayStr)

        
        let dirs = context.state.directories[context.state.directory_name]
        if( !dirs ){
            await context.dispatch(FETCH_DIRS)
        }

        dirs = context.state.directories[context.state.directory_name]
        
        if( dirs[dayStr] > 0 ){
            await context.dispatch(FETCH_DIR, dayStr)
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};