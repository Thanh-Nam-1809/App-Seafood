import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import {hardData} from '../../../constants';
const {IMAGES, COLORS} = hardData;

export default function Splash(props) {
  const {navigation} = props;
  const {navigate} = navigation;
  setTimeout(() => {
    navigate('OnBroading');
  }, 3000);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.background} />
      <Image resizeMode="cover" style={styles.image} source={IMAGES.splash} />
      <ActivityIndicator size="large" color={COLORS.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    width: 50,
    height: 50,
  },
  image: {
    width: 300,
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
