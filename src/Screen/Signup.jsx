import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../Constant/Colors';
import InputFileds from '../components/InputFileds';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ROUTES from '../Constant/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../Redux/userslice';

export default function Signup({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpasswod, setConfirmpasswod] = useState('');
  const [errmsg, setErrmsg] = useState('');

  const loginnavigationhandler = () => {
    navigation.navigate(ROUTES.LOGIN);
  };
  const userList = useSelector(state => state.userReducer.users);
  const dispatch = useDispatch();
  const handleSignUp = () => {
    if (name.trim().length < 1) {
      setErrmsg('Please enter name');
    } else if (email.trim().length < 2 || !email.includes('@')) {
      setErrmsg('Please enter valid email');
    } else if (password.trim().length < 6) {
      setErrmsg('password must be 6 character long');
    } else if (password !== confirmpasswod) {
      setErrmsg("password doesn't match");
    } else {
      const alreadyEmail = userList.find(user => user.email === email);
      if (alreadyEmail) {
        setErrmsg('Email already used');
      } else {
        dispatch(userActions.signup({name, email, password, imageURL:''}));
        navigation.navigate(ROUTES.LOGIN);
        setName('');
        setConfirmpasswod('');
        setEmail('');
        setPassword('');
        setErrmsg('');
      }
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.wView}>
        <Text style={styles.wText}>Sign Up</Text>
      </View>
      <View style={styles.container}>
        <InputFileds
          lable={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color={COLORS.white}
              style={styles.icon}></Ionicons>
          }
          value={name}
          onChangeText={text => setName(text)}></InputFileds>
        <InputFileds
          lable={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color={COLORS.white}
              style={styles.icon}></MaterialIcons>
          }
          keybordType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}></InputFileds>
        <InputFileds
          lable={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color={COLORS.white}
              style={styles.icon}></Ionicons>
          }
          inputType="password"
          value={password}
          onChangeText={text => setPassword(text)}></InputFileds>
        <InputFileds
          lable={'Confirm Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color={COLORS.white}
              style={styles.icon}></Ionicons>
          }
          inputType="password"
          value={confirmpasswod}
          onChangeText={text => setConfirmpasswod(text)}></InputFileds>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {errmsg !== '' && <Text style={styles.errormsg}>{errmsg}</Text>}
      </View>
      <View style={styles.line}>
        <Text>already have an account ? </Text>
        <TouchableOpacity onPress={loginnavigationhandler}>
          <Text style={styles.loginlink}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  wView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  icon: {marginRight: 5},
  buttoncontainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderRadius: 10,
    paddingVertical: 5,
  },
  buttonText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginlink: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  errormsg: {
    marginTop: 10,
    fontSize: 15,
    color: COLORS.warning,
    fontWeight: 'bold',
  },
});
