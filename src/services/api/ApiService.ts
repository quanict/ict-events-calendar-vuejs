import { PhotoDomain } from "@/configs/photos";
import axios, {AxiosStatic} from "axios";
import { ApiResponse } from "../types";

class ApiService {
    $axios: AxiosStatic;
    constructor() {
        // this.name = "Polygon";
        this.$axios = axios
        this.$axios.defaults.baseURL = PhotoDomain;
    }

    async get(url:string) : Promise<ApiResponse<null>> {
        let options = {}
        
        try {
            return await this.$axios.get(url, options);
        } catch (error) {
            console.log(error);
            throw new Error(`ApiService ${error}`);
        }
    }
}

const apiService = new ApiService();
export default apiService;
