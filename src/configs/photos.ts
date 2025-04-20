import { paths as NhatMinhPaths, domain as NhatMinhDomain } from "./nhat-minh";
import { paths as NhatAnhPaths, domain as NhatAnhDomain } from "./nhat-anh";

var PhotoDirectories : any = NhatMinhPaths
var PhotoDomain : any = NhatMinhDomain

if( process.env.VUE_APP_BABY==="nhat-anh" ){
    PhotoDirectories = NhatAnhPaths
    PhotoDomain = NhatAnhDomain
}

export {
    PhotoDirectories,
    PhotoDomain
}