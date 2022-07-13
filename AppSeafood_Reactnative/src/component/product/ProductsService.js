import axiosInstance from '../../utils/axios';
import constants from '../../utils/constants';

export const getProduct = async () => {
  const response = await axiosInstance.get(constants.API_PRODUCTS);
  return response;
};

export const getProducts_ById = async id => {
  const response = await axiosInstance.get(
    `${constants.API_PRODUCT_BY_ID}/${id}/detail`,
  );
  return response;
};

export const saveCart = async cart => {
  const res = await axiosInstance.post(constants.API_CART, cart);
  return res;
};
