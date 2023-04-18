import axios from 'axios';
import { checkEnvironment } from '../check-env';

export const categoryCache = '/api/category';
export const getAllCategory = async () => {
  const response = await axios.get(`${checkEnvironment()}${categoryCache}`);

  return response.data.data;
};

export const addCategory = async (categoryName: string) => {
  const response = await axios.post(`${checkEnvironment()}${categoryCache}`, {
    value: categoryName,
  });
  return response.data.data;
};

export const updateCategory = async (categoryName: string) => {
  const response = await axios.put(`${checkEnvironment()}${categoryCache}`, {
    value: categoryName,
  });
  return response.data.data;
};
