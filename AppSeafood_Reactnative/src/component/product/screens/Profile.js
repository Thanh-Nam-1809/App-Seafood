import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';

import {hardData} from '../../../constants';
const {COLORS, FONTSIZES, IMAGES} = hardData;

export default function Profile(prop) {
  const [data, setData] = useState({
    email: 'VoThanhNam1809@gmail.com',
    name: 'Vo Thanh Nam',
    old: '18/09/2001',
    phone: '0392525473',
    address: 'HCM',
  });
  return (
    <View style={styles.component}>
      <View style={styles.componentTop}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={IMAGES.user} />
        </View>

        <Text style={styles.email}>{data.email}</Text>
        <View style={styles.view1} />
      </View>
      <View style={styles.componentCenter}>
        <Text style={styles.txtName}>Name: {data.name}</Text>
        <View style={styles.view2} />
        <Text style={styles.txtOld}>Date of birth: {data.old}</Text>
        <View style={styles.view2} />
        <Text style={styles.txtPhone}>Phone: {data.phone}</Text>
        <View style={styles.view2} />
        <Text style={styles.txtAddress}>Address: {data.address}</Text>
      </View>
      <View style={styles.componentBottom}>
        <TouchableOpacity style={styles.btnSignOut}>
          <Text style={styles.txtSignOut}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txtSignOut: {
    fontSize: FONTSIZES.h3,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  btnSignOut: {
    width: '100%',
    backgroundColor: 'aqua',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 16,
  },
  componentBottom: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  view2: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  txtAddress: {
    fontSize: FONTSIZES.h3,
    color: COLORS.white,
    padding: 8,
    fontWeight: 'bold',
  },
  txtPhone: {
    fontSize: FONTSIZES.h3,
    color: COLORS.white,
    padding: 8,
    fontWeight: 'bold',
  },
  txtOld: {
    fontSize: FONTSIZES.h3,
    color: COLORS.white,
    padding: 8,
    fontWeight: 'bold',
  },
  txtName: {
    fontSize: FONTSIZES.h3,
    color: COLORS.white,
    padding: 8,
    fontWeight: 'bold',
  },
  componentCenter: {
    flex: 50,
  },
  view1: {
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  email: {
    fontSize: FONTSIZES.h3,
    color: COLORS.white,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.white,
  },
  title: {
    fontSize: FONTSIZES.h2,
    color: COLORS.white,
    padding: 8,
    fontWeight: 'bold',
  },
  componentTop: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 30,
  },
  component: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
});
