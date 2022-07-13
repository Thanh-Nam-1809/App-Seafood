import React, {useState, createContext} from 'react';

export const ProductContext = createContext();
import {getProduct, getProducts_ById, saveCart} from './ProductsService';

export const ProductContextProvider = props => {
  const {children} = props;

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState([]);

  // =================== Laptops ===================
  const onGetProducts = async () => {
    try {
      const result = await getProduct();
      if (result) {
        setProducts(result);
      }
    } catch (error) {
      console.log('onGetProducts error: ', error);
    }
  };

  const onGetProducts_ByID = async id => {
    try {
      const res = await getProducts_ById(id);
      if (res) {
        setProduct(res);
      }
    } catch (error) {
      console.log('getProducts_ById error: ', error);
    }
  };

  // eslint-disable-next-line no-shadow
  const updateCart = (product, number, price, checked = true) => {
    let temp = cart;
    if (cart.length === 0) {
      temp.push({
        product: product,
        quantity: number,
        price: price,
        checked: checked,
      });
    } else {
      const check = cart.filter(item => item.product._id === product._id);
      if (check.length === 0) {
        temp.push({
          product: product,
          quantity: number,
          price: price,
          checked: checked,
        });
      } else {
        if (number <= 0) {
          temp = temp.filter(item => item.product._id !== product._id);
        } else {
          temp = temp.map(item => {
            if (item.product._id === product._id) {
              item.quantity = number >= 3 ? 3 : number;
            }
            return item;
          });
        }
      }
    }
    setCart([...temp]);
  };

  const onSaveCart = async () => {
    try {
      let total = 0;
      // eslint-disable-next-line no-shadow
      let products = [];
      for (let index = 0; index < cart.length; index++) {
        const element = cart[index];
        total += element.quantity * element.price;
        products.push({
          product: element.product._id,
          quantity: element.quantity,
          price: element.price,
        });
      }
      await saveCart({total, products});
      setCart([...[]]);
      return true;
    } catch (error) {
      console.log('onsaveCart error: ', error);
    }
    return false;
  };

  return (
    <ProductContext.Provider
      value={{
        onGetProducts,
        onGetProducts_ByID,
        products,
        product,
        cart,
        updateCart,
        onSaveCart,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
