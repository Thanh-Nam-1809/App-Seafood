import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import {ProductContext} from '../ProductsContest';

import {hardData} from '../../../constants';
const {COLORS, FONTSIZES} = hardData;
const {width, height} = Dimensions.get('window');

export default function Detail(props) {
  const {
    navigation,
    route: {
      params: {_id},
    },
  } = props;
  const {onGetProducts_ByID, product} = useContext(ProductContext);

  const {updateCart} = useContext(ProductContext);

  const [number, setNumber] = useState(0);

  const onNumberChange = isAdd => {
    if (isAdd === true) {
      setNumber(number + 1);
    } else if (isAdd === false && number >= 1) {
      setNumber(number - 1);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await onGetProducts_ByID(_id);
    };
    fetch().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProductToCart = () => {
    updateCart(product, number, true);
    ToastAndroid.show('Thêm sản pham thanh cong', ToastAndroid.BOTTOM);
  };

  return (
    <View style={styles.container}>
      {product && (
        <>
          {/* Top */}
          <View style={styles.containerTop}>
            <Text style={styles.Title_Top}>Chi Tiết sản phẩm</Text>
          </View>

          {/* Center */}
          <View style={styles.containerCenter}>
            <ScrollView>
              <View style={styles.containerCenter2}>
                <Image
                  source={{uri: product.image}}
                  resizeMode={'cover'}
                  style={styles.image}
                />
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>Tên: {product.name}</Text>
                </View>
                <View style={styles.containerPrice}>
                  <Text style={styles.price}>Giá: {product.price}</Text>
                </View>
                <View style={styles.containerSale_off}>
                  <Text style={styles.sale_off}>
                    Giá Giảm: {product.sale_off}
                  </Text>
                </View>
                <View style={styles.containerQuantity}>
                  <View style={styles.containerQuantity2}>
                    <TouchableOpacity
                      onPress={() => onNumberChange(false)}
                      style={styles.btn}>
                      <Text style={styles.txt}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{number} kg</Text>
                    <TouchableOpacity
                      onPress={() => onNumberChange(true)}
                      style={styles.btn}>
                      <Text style={styles.txt}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.quantity}>
                    {number * product.price} Đ{' '}
                  </Text>
                </View>

                <View style={styles.containerInformation}>
                  <Text style={styles.information}>Thông tin chi tiết</Text>
                  <Text style={styles.txtInformation}>
                    {product.information}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}

      {/* Bottom */}
      <View style={styles.containerBottom}>
        <TouchableOpacity
          onPress={addProductToCart}
          style={number === 0 ? styles.btnBuy2 : styles.btnBuy}
          disabled={number === 0}>
          <Text style={styles.txtBuy}>Mua Ngay</Text>
        </TouchableOpacity>
        <View style={styles.view1} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnCancel}>
          <Text style={styles.txt_Bottom}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txt_Bottom: {
    color: '#ffffff',
    fontSize: 24,
  },
  txtBuy: {
    color: '#ffffff',
    fontSize: 24,
  },
  btnCancel: {
    width: width / 2 - 30,
    height: 50,
    backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  view1: {
    width: 20,
  },
  btnBuy2: {
    width: width / 2 - 30,
    height: 50,
    backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    opacity: 0.5,
  },
  btnBuy: {
    width: width / 2 - 30,
    height: 50,
    backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  containerBottom: {
    flex: 10,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  //Bottom
  txtInformation: {
    fontSize: FONTSIZES.h4,
    color: 'black',
  },
  information: {
    fontSize: FONTSIZES.h3,
    color: 'black',
  },
  containerInformation: {
    width: '100%',
  },
  quantity: {
    fontSize: FONTSIZES.h3,
    fontWeight: 'bold',
    color: 'black',
    margin: 15,
  },
  txt: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  btn: {
    width: 50,
    height: 50,
  },
  containerQuantity2: {
    width: '70%',
    flexDirection: 'row',
  },
  containerQuantity: {
    width: '100%',
    flexDirection: 'row',
  },
  // eslint-disable-next-line no-dupe-keys
  information: {
    fontSize: FONTSIZES.h3,
    color: 'black',
  },
  // eslint-disable-next-line no-dupe-keys
  containerInformation: {
    width: '100%',
  },
  sale_off: {
    fontSize: FONTSIZES.h3,
    color: 'black',
  },
  containerSale_off: {
    width: '100%',
  },
  price: {
    fontSize: FONTSIZES.h3,
    color: 'black',
  },
  containerPrice: {
    width: '100%',
  },
  name: {
    fontSize: FONTSIZES.h2,
    fontWeight: '600',
    color: 'black',
  },
  nameContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: height / 2 - 100,
    borderRadius: 10,
  },
  containerCenter2: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  containerCenter: {
    flex: 85,
    padding: 16,
  },
  //Center
  Title_Top: {
    fontSize: FONTSIZES.h1,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  containerTop: {
    flex: 5,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //Top
  container: {
    flex: 1,
  },
});
