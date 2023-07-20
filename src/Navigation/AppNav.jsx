import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import {userActions} from '../Redux/userslice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../Constant/Colors';

export default function AppNav() {
  const activeuser = useSelector(state => state.userReducer.activeUsers);
  const dispatch = useDispatch();
  const connected = useSelector(state => state.userReducer.conection);

  const [isLoding, setisLoding] = useState(true);

  const getData = async () => {
    try {
      setisLoding(true)
      const allUsers = await AsyncStorage.getItem('allUsers');
      if (allUsers !== null) {
        dispatch(userActions.setUsers(JSON.parse(allUsers)));
      }
      const activeUser = await AsyncStorage.getItem('activeUser');
      if (activeUser !== null) {
        dispatch(userActions.setActiveUser(JSON.parse(activeUser)));
      }
      setisLoding(false)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    const unsubscribe = NetInfo.addEventListener(s => {
      dispatch(userActions.connect(s.isConnected));
    });
    return () => {
      unsubscribe();
    };
  }, []);
  if (!connected) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet</Text>
        <Text style={styles.subtext}>Please turn on your Internet</Text>
      </View>
    );
  }
  if (isLoding) {
    return (
      <View style={styles.indicatorcontainer}>
        <Text style={styles.welcome}>Welcome</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      {activeuser === '' ? <AuthStack /> : <AppStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  subtext: {
    fontSize: 20,
  },
  indicatorcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  welcome:{
    color: COLORS.white,
    fontSize: 70,
    fontWeight:'bold'
  },
});
