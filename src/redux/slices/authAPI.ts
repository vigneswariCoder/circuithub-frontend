import axios from 'axios';
import { UserCredentials } from '../../types/authType';

const api = axios.create({
  baseURL: 'http://localhost:8080/auth',
});

export const register = (userCredentials: UserCredentials) => {
  return api.post('/signup', userCredentials)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response?.data?.message || 'Registration failed');
    });
};

export const login = (userCredentials: UserCredentials) => {
  return api.post('/signin', userCredentials)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response?.data?.message || 'Login failed');
    });
};
