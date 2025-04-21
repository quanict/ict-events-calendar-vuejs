import { paths as NhatMinhPaths, domain as NhatMinhDomain } from "./nhat-minh";
import { paths as NhatAnhPaths, domain as NhatAnhDomain } from "./nhat-anh";
import {YearDirectory, YearDirectories} from "./type"

var PhotoDirectories : YearDirectories = []
var PhotoDomain : string = ''



if( process.env.VUE_APP_BABY==="nhat-anh" ){
    PhotoDomain = NhatAnhDomain
    for(const [name, dateRange] of Object.entries(NhatAnhPaths)){
        PhotoDirectories.push({path: name, range: dateRange}) 
    }
} else {
    PhotoDomain = NhatMinhDomain
    for(const [name, dateRange] of Object.entries(NhatMinhPaths)){
        PhotoDirectories.push({path: name, range: dateRange}) 
    }
}

export {
    PhotoDirectories,
    PhotoDomain
}