import axios from "axios";
//CONFIG
import config from "../utils/constants";

export default axios.create({
    baseURL: config.serverApiUrl,
});