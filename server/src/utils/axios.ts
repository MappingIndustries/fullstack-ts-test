import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.quotable.io/',
  timeout: 5000,
});

export default api;
