import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import UserNavigation from '../user/UserNavigation';
import ProductsNavigation from '../product/ProductsNavigation';
import {UserContext} from '../user/UserContext';

export default function AppNavigation(props) {
  const {isLoggedIn} = useContext(UserContext);
  return (
    <NavigationContainer>
      {/* {isLoggedIn ? <UserNavigation /> : <ProductsNavigation />} */}
      {isLoggedIn ? <ProductsNavigation /> : <UserNavigation />}
    </NavigationContainer>
  );
}
