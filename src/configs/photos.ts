import { paths as NhatMinhPaths, domain as NhatMinhDomain } from "./nhat-minh";
import { paths as NhatAnhPaths, domain as NhatAnhDomain } from "./nhat-anh";
import {YearDirectory, YearDirectories} from "./type"

var PhotoDirectories : YearDirectories = []
var PhotoDomain : string = ''
var ObjectPaths;

if( process.env.VUE_APP_BABY==="nhat-anh" ){
    PhotoDomain = NhatAnhDomain
    ObjectPaths = NhatAnhPaths;
} else {
    PhotoDomain = NhatMinhDomain
    ObjectPaths = NhatMinhPaths
}

for(const [name, dateRange] of Object.entries(ObjectPaths)){
    const photoDir : YearDirectory = {path: name, range: dateRange}
    PhotoDirectories.push(photoDir) 
}

export {
    PhotoDirectories,
    PhotoDomain
}