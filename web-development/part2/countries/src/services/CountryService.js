import axios from "axios"

const getAllCountries = (url) => {
    return axios.get(url)
}

export default {
    getAllCountries: getAllCountries
}