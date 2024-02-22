import axios from "axios";
import { AppConstants } from "../constants/AppConstants";

const api = axios.create(
    {
        baseURL: AppConstants.BASE_URL
    }
)

export default api;