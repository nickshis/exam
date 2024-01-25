import axios from 'axios'
let BASE_URL = 'http://localhost:7000/'


export const getData = async (url) => {
    try {
        const res = await axios.get(BASE_URL + url)

        return res.data
    } catch (error) {
        alert('что то пошло не так перезагрузите страницу')
    }
}

export const postData = async (url, body) => {
    try {
        const res = await axios.post(BASE_URL + url, body)

        return res
    } catch (e) {
        console.log(e);
    }
}

export const removeData = async (url, id) => {
    const res = await axios.delete(`${BASE_URL}${url}/${id}`)

    return res
}

export const patchData = async (url, body) => {
    const res = await axios.patch(BASE_URL + url, body)

    return res
}