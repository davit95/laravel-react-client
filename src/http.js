import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://vas.faiseweb.co.uk:4004' : `http://localhost:8000/api/`
})
