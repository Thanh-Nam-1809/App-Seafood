import React from 'react';

import AppNavigation from './src/component/navigation/AppNavigation';
import {UserContextProvider} from './src/component/user/UserContext';
import {ProductContextProvider} from './src/component/product/ProductsContest';

export default function App() {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        <AppNavigation />
      </ProductContextProvider>
    </UserContextProvider>
  );
}
