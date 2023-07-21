import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ROUTES from '../Constant/Routes';
import Movies from '../Screen/Movies';
import COLORS from '../Constant/Colors';
import {useNavigation} from '@react-navigation/native';
import Tv from '../Screen/Tv';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {fontSize: width > 850 ? 30 : 20},
        tabBarLabelStyle: {fontSize: width > 850 ? 20 : 13},
        tabBarActiveTintColor: COLORS.primary,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
              name="menu"
              color={COLORS.primary}
              size={24}
              style={{marginLeft: 15}}></MaterialCommunityIcons>
          </TouchableOpacity>
        ),
      }}>
      <Tab.Screen
        name={ROUTES.MOVIES}
        component={Movies}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="movie-open-outline"
              color={color}
              size={size}></MaterialCommunityIcons>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.TV}
        component={Tv}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons
              name="live-tv"
              color={color}
              size={size}></MaterialIcons>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
