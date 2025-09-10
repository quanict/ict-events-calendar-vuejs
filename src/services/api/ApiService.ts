import { PhotoDomain } from "@/configs/photos";
import axios, {AxiosStatic} from "axios";
import { ApiResponse } from "../types";

class ApiService {
    $axios: AxiosStatic;
    constructor() {
        // this.name = "Polygon";
        this.$axios = axios
        this.$axios.defaults.baseURL = PhotoDomain;
        this.$axios.defaults.withCredentials = true; 
        // this.$axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";


    }

    async get(url:string) : Promise<ApiResponse<null>> {
        let options = {withCredentials: true}
        
        try {
            return await this.$axios.get(url, options);
        } catch (error) {
            console.log(error, url);
        }

        return new Promise((resolve, reject) => {
            resolve({success: false, data: null});
        })
    }
}

const apiService = new ApiService();
export default apiService;
