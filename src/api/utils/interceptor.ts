import axios, {InternalAxiosRequestConfig} from 'axios';
import store from '../../redux/store';
import {authenticate} from '../../redux/authSlice';

export const api = axios.create({
  baseURL: 'http://fitcircle.yameenyousuf.com/api/',
  // baseURL: 'http://128.199.30.51:3016/api/',
  // baseURL: 'http://192.168.1.104:5000/api/',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const payLoad = store.getState();

  if (payLoad.auth.accessToken) {
    const accessToken = payLoad.auth.accessToken;
    config.headers['accessToken'] = accessToken;
  }
  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error);
    let response = {data: {message: 'Something went wrong'}};
    if (error.response.status === 401) {
      store.dispatch(authenticate(false));
    }
    return response;
  },
);
