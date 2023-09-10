import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: '',
});

const getData = async () => {
  try {
    const authToken = await AsyncStorage.getItem('authToken');
    return authToken;
  } catch (e) {
    console.log(e);
  }
};

axiosInstance.interceptors.request.use(
  async config => {
    let authToken = await getData();
    if (authToken) {
      config.headers['Authorization'] = authToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
