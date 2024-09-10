import axios from 'axios';

axios.defaults.withCredentials = true
axios.defaults.validateStatus = status => {
    return status <= 500
}
export const createInstance = async raw_data => {
    const config = {
        headers: {
        'Content-Type': 'application/json',

        }
    }
    const data = JSON.stringify(raw_data)

    const result = await axios.post('http://127.0.0.1:8000/api/products/', data, config)

    if (result.status === 200){
        return result.data
    }
    return {'status': result.status, 'data': result.data}
}

export const getAllInstances = async () => {
    try {
        return await axios.get('http://127.0.0.1:8000/api/products/')

    } catch (error) {
        return error
    }
}