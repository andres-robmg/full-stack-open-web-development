import axios from "axios"

const getWeather = (url) => {
    return axios.get(url)
}

export default {
    getWeather: getWeather
}