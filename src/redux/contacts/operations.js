import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const CONTACTS_BASE_URL = 'https://connections-api.goit.global/contacts'; 

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${CONTACTS_BASE_URL}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      // Исправлено: теперь используется полный URL с CONTACTS_BASE_URL
      const response = await axios.post(`${CONTACTS_BASE_URL}`, newContact);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`${CONTACTS_BASE_URL}/${contactId}`);
      return contactId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
