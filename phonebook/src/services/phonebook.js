import axios from 'axios'

const baseUrl = "http://localhost:3001/people"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(request => request.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(request => request.data)
}

const del = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(request => request.data)
}

export default {getAll, create, del}