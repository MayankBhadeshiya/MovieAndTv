import { View, Text } from 'react-native'
import React from 'react'
import Login from '../Screen/Login'
import Signup from '../Screen/Signup'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ROUTES from '../Constant/Routes'

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.SIGNUP} component={Signup} />
    </Stack.Navigator>
  );
}