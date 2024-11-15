import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const createPost = (data, token) => API.post('/posts', data, { headers: { Authorization: token } });
export const fetchPosts = (token) => API.get('/posts', { headers: { Authorization: token } });
