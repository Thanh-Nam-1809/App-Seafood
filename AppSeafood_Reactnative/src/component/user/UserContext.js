import React, {useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, register, confirmPassword, getUserById} from './UserService';

import constants from '../../utils/constants';

export const UserContext = createContext();

export const UserContextProvider = props => {
  const {children} = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const onLogin = async (username, password) => {
    try {
      const result = await login(username, password);
      if (result && result.token) {
        await AsyncStorage.setItem(constants.STORAGE_KEY, result.token);
        setIsLoggedIn(true);
        return true;
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.log('onLogin error: ', error);
    }
    return false;
  };

  const onRegister = async (
    username,
    password,
    confirm_password,
    name,
    old,
    phone,
    address,
  ) => {
    try {
      const res = await register(
        username,
        password,
        confirm_password,
        name,
        old,
        phone,
        address,
      );
      return res.status;
    } catch (error) {
      console.log('onRegister error: ', error);
    }
  };

  const onConfirmPassword = async (
    username,
    password,
    confirm_password,
    name,
    old,
    phone,
    address,
  ) => {
    try {
      const res = await confirmPassword(
        username,
        password,
        confirm_password,
        name,
        old,
        phone,
        address,
      );
      return res.status;
    } catch (error) {
      console.log('onConfirmPassword error: ', error);
    }
  };

  const onGetUser_ByID = async id => {
    try {
      const res = await getUserById(id);
      if (res) {
        setUser(res);
      }
    } catch (error) {
      console.log('getProducts_ById error: ', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        onLogin,
        onRegister,
        onConfirmPassword,
        users,
        user,
        onGetUser_ByID,
        isLoggedIn,
      }}>
      {children}
    </UserContext.Provider>
  );
};
