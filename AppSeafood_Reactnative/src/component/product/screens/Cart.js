import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {ProductContext} from '../ProductsContest';
import {hardData} from '../../../constants';
const {COLORS, FONTSIZES} = hardData;

const {width, height} = Dimensions.get('window');

export default function Cart(props) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const {cart, setCart} = useContext(ProductContext);

  const [data, setData] = useState(cart);

  const {updateCart} = useContext(ProductContext);
  const [refreshing, setRefreshing] = useState(false);

  const isShowCheckout = () => {
    const item = data.filter(items => items.checked === true) || [];
    let total = 0;
    for (let index = 0; index < item.length; index++) {
      const element = item[index];
      total += element.quantity * element.product.price;
    }
    return {isShow: item.length > 0, total: total};
  };

  const isTransport = () => {
    return isShowCheckout().total <= 100000
      ? 50000
      : isShowCheckout().total <= 200000
      ? 25000
      : 0;
  };

  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  };

  const renderItem = ({item}) => {
    const {product, quantity, price, checked} = item;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: product.image}}
          />
        </View>
        <View style={styles.view1} />
        <View style={styles.infoContainer}>
          <View style={styles.containerName}>
            <Text style={styles.name}>{product.name}</Text>
          </View>
          {checked === true ? <Text>Thành công</Text> : <Text>Thất bại</Text>}
          <View style={styles.containerPriceVsQuantity}>
            <View style={styles.containerPrice}>
              <Text style={styles.price}>{product.price}đ</Text>
            </View>
            <View style={styles.quantityAction}>
              <TouchableOpacity
                style={styles.containerRemoveAction}
                onPress={() => updateCart(product, quantity - 1, price, true)}>
                <Text style={styles.removeAction}>-</Text>
              </TouchableOpacity>
              <View style={styles.view1} />
              <Text style={styles.quantity}>{quantity} KG</Text>
              <View style={styles.view1} />
              <TouchableOpacity
                style={styles.containerAddAction}
                onPress={() => updateCart(product, quantity + 1, price, true)}>
                <Text style={styles.addAction}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const CheckoutModal = props => {
    const {isShowModal, setIsShowModal} = props;
    const {onSaveCart} = useContext(ProductContext);
    const checkout = () => {
      onSaveCart();
      ToastAndroid.show('Thanh toan thanh cong', ToastAndroid.BOTTOM);
      setIsShowModal(false);
    };
    return (
      <Modal animationType="slide" transparent={true} visible={isShowModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.checkout}>Xác nhận thanh toán</Text>
            <TouchableOpacity onPress={checkout} style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Đồng ý</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsShowModal(false)}>
              <Text style={styles.cancel}>Hủy bỏ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top */}
      <View style={styles.containerTop}>
        <Text style={styles.title}>Giỏ hàng</Text>
      </View>
      {/* Center */}
      <View style={styles.containerCenter}>
        {cart.length !== 0 ? (
          <>
            <FlatList
              data={cart}
              renderItem={renderItem}
              style={styles.flatListContainer}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => Math.random()}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </>
        ) : (
          <>
            <View style={styles.cartNullContainer}>
              <Text style={styles.cartNull}>Giở hàng đang trống</Text>
            </View>
          </>
        )}
      </View>
      {/* Bottom */}
      {cart.length !== 0 ? (
        <>
          <View style={styles.containerBottom}>
            <View style={styles.totalContainer}>
              <View style={styles.totalContainer2}>
                <Text style={styles.totalText}>Tạm tính: </Text>
                <Text style={styles.totalPrice}>
                  {isShowCheckout().total} Đ
                </Text>
              </View>
              <View style={styles.totalContainer2}>
                <Text style={styles.totalText}>Ship: </Text>
                <Text style={styles.totalPrice}>{isTransport()} Đ</Text>
              </View>
              <View style={styles.totalContainer2}>
                <Text style={styles.totalText}>Tổng: </Text>
                <Text style={styles.totalPrice}>
                  {isShowCheckout().total + isTransport()} Đ
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setIsShowModal(true)}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Tiến hành thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <></>
      )}

      <CheckoutModal
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Modal
  modalView: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 80,
    paddingVertical: 24,
    borderRadius: 10,
  },
  cancel: {
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    marginTop: 8,
    textAlign: 'center',
    color: COLORS.white,
    fontSize: FONTSIZES.h3,
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: FONTSIZES.h3,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: 'aqua',
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    borderRadius: 15,
  },
  checkout: {
    color: COLORS.white,
    fontSize: FONTSIZES.h2,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  // RenderItem
  addAction: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerAddAction: {
    width: 30,
    height: 30,
    backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: FONTSIZES.h3,
  },
  removeAction: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerRemoveAction: {
    width: 30,
    height: 30,
    backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityAction: {
    flexDirection: 'row',
  },
  price: {
    fontSize: FONTSIZES.h3,
    color: 'black',
  },
  containerPrice: {
    width: width / 2 - 80,
  },
  containerPriceVsQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 50,
  },
  name: {
    color: 'black',
    fontSize: FONTSIZES.h2,
    fontWeight: 'bold',
  },
  containerName: {
    width: '100%',
  },
  infoContainer: {},
  view1: {
    width: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  imageContainer: {
    width: width / 3,
    height: height / 7,
  },
  itemContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 8,
    flexDirection: 'row',
    margin: 8,
  },
  // Bottom
  buttonText: {
    fontSize: FONTSIZES.h1,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  buttonContainer: {
    flex: 30,
    backgroundColor: 'aqua',
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: FONTSIZES.h3,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  totalText: {
    fontSize: FONTSIZES.h3,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  totalContainer2: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  totalContainer: {
    flex: 70,
    justifyContent: 'space-between',
  },
  containerBottom: {
    flex: 20,
    backgroundColor: COLORS.background,
    padding: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  // Center
  cartNull: {
    fontSize: FONTSIZES.h3,
    fontWeight: 'bold',
    color: 'black',
  },
  cartNullContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  containerCenter: {
    flex: 75,
    padding: 8,
  },
  // Top
  title: {
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
  // Total
  container: {
    flex: 1,
  },
});
