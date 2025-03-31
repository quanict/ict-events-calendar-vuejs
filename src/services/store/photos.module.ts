import { paths } from "@/configs/nhat-minh";
import apiService from "../api/ApiService";
import { ApiResponse } from "../types";
import moment, {Moment} from "moment";

export const GET_PHOTO_DAY = "getPhotosDay";
export const GET_PHOTOS = "getListPhotos";
export const FETCH_DIRS = "fetchDirectories";
export const GET_DAYS_CURRENT_DIR = "getDaysInCurrentDirectory"
const PUSH_DIRS = "pushDirectories"
export const SET_DIR_NAME = "setDirectoryName"
const MUT_DIR_NAME = "storeDirectoryName"
export const SET_DATE = "setDate"

const state = {
    directories : {},
    current_date: ''
}

const getters = {
    [GET_DAYS_CURRENT_DIR](state : any){
        return state.directories[state.directory_name]
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

        console.log(`================ current_dir=${state.directory_name}`)
        for (const [name, dateRange] of Object.entries(paths)) {
            const start = moment(dateRange[0], "YYYY-MM-DD")
            const end = moment(dateRange[1], "YYYY-MM-DD")
            if( end.diff(date, 'days') >= 0 && date.diff(start, 'days') >= 0 ){
                state.directory_name = name;
            }
        }

        console.log(`================ current_dir=${state.directory_name}`)
        console.log(`====`, {state})

    }
}

const actions = {
    async [FETCH_DIRS](context:any){
        const files = `${context.state.directory_name}/all.json`
        const response = await apiService.get(files)
        console.log(`==== FETCH_DIRS`, response.data)
        context.commit(PUSH_DIRS, response.data);
        // context.state.directories[context.state.directory_name] = response.data
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

        let photosCount = context.state.directories[context.directory_name]
        console.log(`=== 1.get in day count=${photosCount}`,{context}, this)
        if( !photosCount ){
            await context.dispatch(FETCH_DIRS)
        }

        photosCount = context.state.directories[context.directory_name]
        const test = context.state.directories
        console.log(`=== 2.get in day count=${photosCount}`, {dayStr, test, photosCount})
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};