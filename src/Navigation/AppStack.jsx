import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from '../Screen/Details';
import ROUTES from '../Constant/Routes';
import DrawerNavigation from './DrawerNavigation';
import COLORS from '../Constant/Colors';
import Profile from '../Screen/Profile';
import Collection from '../Screen/Collection';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const {width} = useWindowDimensions();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          color: COLORS.black,
          fontSize: width > 850 ? 30 : 20,
        },
      }}>
      <Stack.Screen
        name="Tab Nav"
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTES.DETAILS} component={Details} />
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen
        name={ROUTES.COLLECTION}
        component={Collection}
        options={{headerBackTitleVisible: false}}
      />
    </Stack.Navigator>
  );
}
