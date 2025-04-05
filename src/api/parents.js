import axios from "axios";
import { API_URL } from "../config";

export const getParents = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-parent`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteParent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-user/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateParent = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/update-user/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
