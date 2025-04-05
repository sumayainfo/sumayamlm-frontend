import axios from "axios";
import { IMG_URL } from "../config";

export const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file); 
  
      const response = await axios.post(`${IMG_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };