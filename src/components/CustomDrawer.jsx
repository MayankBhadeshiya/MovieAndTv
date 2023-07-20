import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../Constant/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../Redux/userslice';
import {Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../Constant/Routes';

export default function CustomDrawer(props) {
  const dispatch = useDispatch();
  const activeuser = useSelector(state => state.userReducer.activeUsers);
  let userList = useSelector(state => state.userReducer.users);
  userList = userList.filter(user => user.name === activeuser);
  const user = userList[0];
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.constainer}>
      <View style={styles.userContainer}>
        <Avatar
          size={'medium'}
          rounded
          source={require('../IMG/user.png')}
          onPress={() => navigation.navigate(ROUTES.PROFILE)}
        />
        <Text style={styles.username}>{user.name}</Text>
        <Text style={styles.useremail}>{user.email}</Text>
      </View>
      <View style={styles.itemContainer}>
        <View>
          <DrawerItemList {...props} />
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(userActions.logout());
          }}>
          <View style={styles.logoutContainer}>
            <Ionicons
              name="exit-outline"
              size={25}
              color={COLORS.gray}
              style={styles.icon}></Ionicons>
            <Text style={styles.text}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    marginHorizontal: 20,
    borderColor: COLORS.gray,
  },
  icon: {
    paddingStart: 5,
    paddingEnd: 25,
  },
  text: {
    color: COLORS.gray,
    fontWeight: '500',
  },
  userContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  username: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  useremail: {
    color: COLORS.white,
  },
});
