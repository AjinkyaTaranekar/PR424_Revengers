import axios from 'axios';
import {AsyncStorage} from 'react-native';
const instance = axios.create({
  baseURL: 'https://cyclepathtracker.herokuapp.com', // generated through ngrok valid only for 8 hrs using : ngrok http PORT
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  err => {
    Promise.reject(err);
  },
);

export default instance;
