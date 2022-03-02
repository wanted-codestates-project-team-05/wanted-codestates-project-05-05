import axios from 'axios';

export const getProducts = async () => {
  const { data } = await axios.get(`https://static.pxl.ai/problem/data/products.json`);
  return data;
};
export const getRegions = async () => {
  const { data } = await axios.get(`https://static.pxl.ai/problem/data/regions.json`);
  return data;
};
