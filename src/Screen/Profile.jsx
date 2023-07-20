import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import COLORS from '../Constant/Colors';

export default function Profile() {
  let userList = useSelector(state => state.userReducer.users);
  const activeuser = useSelector(state => state.userReducer.activeUsers);
  userList = userList.filter(user => user.name === activeuser);
  const user = userList[0];
  return (
    <View>
      <Text style={styles.header}> Currently logged user </Text>
      <View style={styles.container}>
        <Text style={styles.name}>
          Name :- <Text style={styles.tint}>{user.name}</Text>
        </Text>
        <Text style={styles.email}>
          Email :- <Text style={styles.tint}>{user.email}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 15,
    marginVertical: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginVertical: 5,
  },
  email: {
    marginVertical: 5,
  },
  tint: {
    color: COLORS.primary,
    fontSize: 16,
  },
});
