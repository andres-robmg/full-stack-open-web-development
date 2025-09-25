import axios from "axios"

/* const BASE_URL = 'https://phonebook-server-tupz.onrender.com/api/persons' */
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL
const BASE_URL = `${BACKEND_API_URL}/api/persons`

const getAll = () => {
    return axios.get(BASE_URL)
}

const create = newObject => {
    return axios.post(BASE_URL, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${BASE_URL}/${id}`, newObject)
}

const deletePerson = id => {
    return axios.delete(`${BASE_URL}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    delete: deletePerson,
}