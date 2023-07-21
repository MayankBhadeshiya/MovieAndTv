import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ROUTES from '../Constant/Routes';
import About from '../Screen/About';
import Profile from '../Screen/Profile';
import COLORS from '../Constant/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../components/CustomDrawer';
import TabNavigation from './TabNavigation';
import {useWindowDimensions} from 'react-native';
const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const {width} = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props}></CustomDrawer>}
      screenOptions={{
        drawerActiveTintColor: COLORS.primary,
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          color: COLORS.black,
          fontSize: width > 850 ? 30 : 20,
        },
      }}>
      <Drawer.Screen
        name="tab nav"
        component={TabNavigation}
        options={{
          headerShown: false,
          drawerLabel: 'Home',
          drawerIcon: ({color, size}) => (
            <Ionicons
              name="ios-home-outline"
              color={color}
              size={size}></Ionicons>
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.ABOUT}
        component={About}
        options={{
          drawerIcon: ({color, size}) => (
            <Ionicons
              name="ios-information-circle-outline"
              color={color}
              size={size}></Ionicons>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
