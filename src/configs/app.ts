export const APP_NAME = process.env.VUE_APP_NAME??"Material Tailwind" 

/**
 * app type : calendar|gallery
 */
export const APP_TYPE = process.env.VUE_APP_TYPE??"calendar" 

export const IS_CALANDER = APP_TYPE==="calendar"
export const IS_GALLERY = APP_TYPE==="gallery"