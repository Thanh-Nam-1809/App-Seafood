import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect} from 'react';

// import Icon from 'react-native-vector-icons/FontAwesome';
import {hardData} from '../../../constants';
const {COLORS, FONTSIZES, IMAGES} = hardData;

import Swiper from 'react-native-swiper';
import {ProductContext} from '../ProductsContest';

const {width, height} = Dimensions.get('window');

export default function Home(props) {
  const {navigation} = props;
  const {navigate} = navigation;
  const {products, onGetProducts} = useContext(ProductContext);

  useEffect(() => {
    const fetch = async () => {
      await onGetProducts();
    };
    fetch().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.background} />

      {/* Top */}
      <View style={styles.containerTop}>
        <Swiper autoplay={true}>
          <View>
            <Image style={styles.Slide_Image} source={IMAGES.slider0} />
          </View>
          <View>
            <Image style={styles.Slide_Image} source={IMAGES.slider1} />
          </View>
          <View>
            <Image style={styles.Slide_Image} source={IMAGES.slider2} />
          </View>
        </Swiper>
      </View>

      {/* Center */}
      <View style={styles.containerCenter}>
        <View style={styles.titleContainer}>
          <View style={styles.view1} />
          <Text style={styles.title}>SEAFOOD</Text>
          <View style={styles.view1} />
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.containerBottom}>
        <ScrollView>
          <View style={styles.flatListContainer}>
            {products.map(item => {
              return (
                <View style={styles.renderItemContainer1} key={item._id}>
                  {item.quantity <= 0 ? (
                    <Text style={styles.outOfStock}>Hết Hàng</Text>
                  ) : (
                    ''
                  )}
                  <TouchableOpacity
                    onPress={() => navigate('Detail', {_id: item._id})}
                    disabled={item.quantity <= 0}
                    style={item.quantity <= 0 ? styles.btnOpacity : ''}>
                    <View style={styles.renderItemContainer2}>
                      <Image
                        style={styles.Image}
                        resizeMode="cover"
                        source={{uri: item.image}}
                      />
                      <Text style={styles.Name} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text
                        style={
                          item.sale_off > 0 ? styles.txtOutPrice : styles.price
                        }>
                        Price: {item.price} $
                      </Text>
                      <Text
                        style={
                          item.sale_off > 0
                            ? styles.sale_off
                            : styles.txtOutPrice
                        }>
                        Sale Off: {item.sale_off} $
                      </Text>
                      <Text style={styles.quantity}>
                        Quantity: {item.quantity}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txtOutPrice: {color: 'red', textDecorationLine: 'line-through'},
  quantity: {
    fontSize: FONTSIZES.h5,
    color: COLORS.white,
  },
  sale_off: {
    fontSize: FONTSIZES.h4,
    color: 'yellow',
    fontWeight: '500',
  },
  price: {
    fontSize: FONTSIZES.h4,
    color: COLORS.white,
  },
  Name: {
    fontSize: FONTSIZES.h3,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  Image: {
    width: width / 2 - 50,
    height: height / 2 - 250,
  },
  renderItemContainer2: {
    height: 250,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.white,
    width: Dimensions.get('window').width / 2 - 31.5,
    padding: 8,
  },
  btnOpacity: {opacity: 0.5},
  outOfStock: {
    position: 'absolute',
    fontSize: FONTSIZES.h1,
    color: 'yellow',
    fontWeight: 'bold',
    marginTop: 100,
    marginLeft: 50,
  },
  renderItemContainer1: {
    padding: 15,
  },
  flatListContainer: {
    marginTop: height / 2 - 30,
    backgroundColor: COLORS.background,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerBottom: {
    flex: 50,
  },
  //Bottom
  title: {
    fontSize: FONTSIZES.h1,
    marginHorizontal: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  view1: {
    width: 50,
    borderWidth: 1,
    borderColor: 'black',
  },
  titleContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    position: 'absolute',
    paddingHorizontal: width / 2 - 110,
  },
  containerCenter: {
    flex: 5,
    marginTop: 300,
    position: 'absolute',
  },
  // Center
  Slide_Image: {
    width: '100%',
    height: 300,
  },
  slide: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  containerTop: {
    flex: 30,
    position: 'absolute',
  },
  // Top
  container: {
    flex: 100,
    position: 'relative',
  },
});
