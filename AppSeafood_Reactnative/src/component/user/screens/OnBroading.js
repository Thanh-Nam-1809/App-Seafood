import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';

import {hardData} from '../../../constants';
const {DATAS, COLORS, FONTSIZES} = hardData;
const {slides} = DATAS;

const {width, height} = Dimensions.get('window');

const Slide = ({item}) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={item.image} style={[styles.slodeImage]} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desrciption}>{item.desrciption}</Text>
    </View>
  );
};

export default function OnBroading(props) {
  const {navigation} = props;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();

  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && styles.indicator2,
              ]}
            />
          ))}
        </View>
        <View style={styles.btnContaienr}>
          {currentSlideIndex === slides.length - 1 ? (
            <View style={styles.starteContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace('Login')}>
                <Text style={styles.txtStarted}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.btnContainer2}>
              <TouchableOpacity
                onPress={skip}
                style={[styles.btn, styles.btn2]}>
                <Text style={styles.txtSkip}>SKIP</Text>
              </TouchableOpacity>
              <View style={styles.view} />
              <TouchableOpacity style={styles.btn} onPress={goToNextSlide}>
                <Text style={styles.txtNext}>NEXT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;

    const next = () => {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    };

    nextSlideIndex !== slides.length ? next() : null;
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <StatusBar backgroundColor={COLORS.background} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        pagingEnabled
        contentContainerStyle={{height: height * 0.75}}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  txtNext: {
    fontWeight: 'bold',
    color: COLORS.background,
    fontSize: 15,
  },
  view: {
    width: 12,
  },
  txtSkip: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.white,
  },
  txtStarted: {
    fontWeight: 'bold',
    color: COLORS.background,
    fontSize: 15,
  },
  starteContainer: {
    height: 50,
  },
  btn2: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer2: {
    flexDirection: 'row',
  },
  btnContaienr: {
    marginBottom: 15,
  },
  indicator2: {
    backgroundColor: COLORS.white,
    width: 25,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: COLORS.Green,
    marginHorizontal: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerContainer: {
    height: height * 0.25,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  desrciption: {
    color: COLORS.white,
    fontSize: FONTSIZES.h6,
    width,
    textAlign: 'center',
    lineHeight: 23,
    paddingHorizontal: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: FONTSIZES.h1,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  slodeImage: {
    height: 300,
    width,
    resizeMode: 'contain',
  },
  slideContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
