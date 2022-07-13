import React from 'react';
import {Text} from 'react-native';
import {Profile} from './screens';
import {HomeStack, CartStack} from './stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function ProductsNavigation(props) {
  // const {route, navigation} = props;
  // const {Hello} = route.params;
  // console.log('Ahihi', Hello);
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: () => {
            if (route.name === 'HomeStack') {
              return <Icon name="home" size={20} />;
            } else if (route.name === 'CartStack') {
              return <Icon name="shopping-cart" size={20} />;
            } else if (route.name === 'Profile') {
              return <Icon name="user" size={20} />;
            }
          },
          tabBarLabel: ({focused}) => {
            if (route.name === 'HomeStack' && focused) {
              return <Text>Home</Text>;
            } else if (route.name === 'CartStack' && focused) {
              return <Text>Cart</Text>;
            } else if (route.name === 'Profile' && focused) {
              return <Text>Profile</Text>;
            }
            return null;
          },
          headerShown: false,
        })}>
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="CartStack" component={CartStack} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
}
