import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const CONTACTS_BASE_URL = 'https://connections-api.goit.global/contacts'; 

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${CONTACTS_BASE_URL}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone: number }, thunkAPI) => {
    try {
      const response = await axios.post(`${CONTACTS_BASE_URL}`, { name, number });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
   if (!contactId) {
  console.error("Ошибка: передан неверный contactId", contactId);
  return thunkAPI.rejectWithValue('Неверный ID контакта');
}

    try {
      await axios.delete(`${CONTACTS_BASE_URL}/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
