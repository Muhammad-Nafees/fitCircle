import axios, {InternalAxiosRequestConfig} from 'axios';
import store from '../../redux/store';

export const api = axios.create({
  baseURL: 'http://fitcircle.yameenyousuf.com/api/',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const payLoad = store.getState();

  if (payLoad.auth.accessToken) {
    const accessToken = payLoad.auth.accessToken;
    config.headers['accessToken'] = accessToken;
  }
  return config;
});
