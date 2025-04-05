import axios from "axios";
import { API_URL } from "../config";

export const addTrasaction = async (packageData) => {
  try {
    const response = await axios.post(
      `${API_URL}/buy-package`,
      packageData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateTrasaction = async (packageInfo) => {
  try {
    const response = await axios.post(
      `${API_URL}/update-status`,
      packageInfo
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getTrasactionByUser = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/get-transactions/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteTransaction = async (trnId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/delete-transactions/${trnId}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getTrasactions = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/get-transactions`,
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};