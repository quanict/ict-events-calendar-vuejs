import apiService from "../api/ApiService";

export const GET_DAY_URL = "getDayURL"
export const GET_PHOTO_DAY = "getPhotosDay";
export const GET_PHOTOS = "getListPhotos";
export const GET_PHOTOS_IN_DAY = "getPhotoInDay"
export const FETCH_DIRS = "fetchDirectories";
export const FETCH_DIR = "fetchPhotosInDirectory";
const PUSH_DIRS = "pushDirectories"
const MUT_DIR_NAME = "storeDirectoryName"
export const SET_DATE = "setDate"

export const GET_PHOTO ="getPhotoViewing"
export const SET_PHOTO ="setPhotoViewing"
export const UNSET_PHOTO = "removePhotoViewing"
export const PUSH_PHOTO ="pushPhotoViewing"

const state = {
    photos : {},
    photo: {}
}

const getters = {
    [GET_PHOTO](state : any){
        return state.photo
    },
}

const mutations = {
    [PUSH_PHOTO](state : any,  photo:any) {
        state.photo = photo
    },
}

const actions = {
    async [SET_PHOTO](context:any, photo:any){
        console.log(`=== set photo model`, {photo})
        context.commit(PUSH_PHOTO, photo);
    },
    [UNSET_PHOTO](context:any, photo:any){
        console.log(`=== unset photo model`)
        context.commit(PUSH_PHOTO, {});
    },

}

export default {
    state,
    getters,
    mutations,
    actions,
};