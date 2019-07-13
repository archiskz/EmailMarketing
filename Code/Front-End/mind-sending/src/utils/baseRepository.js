import axios from "axios";
import * as Config from "../constants/Config";

export default axios.create({
    baseURL: `http://103.79.141.134:8080/api`
});
