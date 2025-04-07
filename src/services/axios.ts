import axios from 'axios';
import Config from 'react-native-config';

const baseURL = Config.API_URL;

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
const API_TOKEN = Config.API_TOKEN;

apiClient.interceptors.request.use(
  value => {
    value.headers.Authorization = 'Bearer ' + API_TOKEN;
    return value;
  },
  error => {
    console.log('[request error]', JSON.stringify(error));
  },
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('[response_error]:', JSON.stringify(error));
  },
);

export default apiClient;
