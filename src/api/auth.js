// src/api/auth.js

import axios from "axios";
import { API_URL } from "../config";




export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem("userData", response.data.data.user);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-user`);
    console.log(response.data, "uuu");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getUserTree = async (sponserCode) => {
  try {
    const response = await axios.get(`${API_URL}/user-tree/${sponserCode}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/user-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserById = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/update-user/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
