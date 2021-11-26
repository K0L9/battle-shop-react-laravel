import axios from "axios";

export default axios.create({
    baseURL: "local.shopph.com/",
    headers: {
        "Content-type": "application/json"
    }
});