import axiosInstance from '../../utils/axios';
import constants from '../../utils/constants';

export const login = async (username, password) => {
  const data = {username, password};
  const response = await axiosInstance.post(constants.API_LOGIN, data);
  return response;
};

export const register = async (
  username,
  password,
  confirm_password,
  name,
  old,
  phone,
  address,
) => {
  const data = {
    username,
    password,
    confirm_password,
    name,
    old,
    phone,
    address,
  };
  const response = await axiosInstance.post(constants.API_REGISTER, data);
  return response;
};

export const confirmPassword = async (username, password, confirm_password) => {
  const data = {
    username,
    password,
    confirm_password,
  };
  const response = await axiosInstance.post(
    constants.API_COMFIRM_PASSWORD,
    data,
  );
  return response;
};

export const getUserById = async id => {
  const response = await axiosInstance.get(
    `${constants.API_USER_BY_ID}/${id}/detail`,
  );
  return response;
};

export const saveCart = async cart => {
  const res = await axiosInstance.post(constants.API_ADD_CART, cart);
  return res;
};
