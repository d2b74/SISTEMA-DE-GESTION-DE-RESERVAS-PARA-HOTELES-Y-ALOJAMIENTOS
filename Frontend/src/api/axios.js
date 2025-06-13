import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL || 'localhost:3001'}`,
    withCredentials: true,
    headers: {
    'Content-Type': 'application/json'
  }
})

export default instance