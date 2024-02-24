import axios from "axios";
import { AppConstants } from "../constants/AppConstants";

const api = axios.create(
    {
        baseURL: AppConstants.BASE_URL
    }
)

/**
 * Intercept request to the server
 */
api.interceptors.request.use(
    request => {
      // Check if the request is to login or a authorization request
      const authorization = window.sessionStorage.getItem("Authorization");
      console.log(authorization)
      if(authorization){
        request.headers.authorization = authorization;
      }
      return request
    }
  )

export default api;