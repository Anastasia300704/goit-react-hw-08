// redux/auth/operations.js
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Устанавливаем базовый URL для запросов
axios.defaults.baseURL = 'https://connections-api.goit.global';

// Функция для установки и удаления токена в заголовке
const token = {
  set(tokenValue) {
    axios.defaults.headers.common.Authorization = `Bearer ${tokenValue}`;
  },
  unset() {
    delete axios.defaults.headers.common.Authorization;
  },
};

// Регистрация нового пользователя
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Логин существующего пользователя
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Логаут
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout');
      token.unset();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Обновление (рефреш) пользователя по токену
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('No token found');
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
