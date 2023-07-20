import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../Constant/Colors';
import InputFileds from '../components/InputFileds';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ROUTES from '../Constant/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../Redux/userslice';

export default function Login({navigation}) {
  const {width} = useWindowDimensions();
  const outercontainer = {
    width: width > 400 ? 400 : width -40,
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errmsg, setErrmsg] = useState('');

  const signupnavigationhandler = () => {
    navigation.navigate(ROUTES.SIGNUP);
  };
  const userList = useSelector(state => state.userReducer.users);
  const dispatch = useDispatch();
  const loginhandler = () => {
    const hasuser = userList.filter(user => user.email === email);
    if (hasuser.length) {
      if (hasuser[0].password === password) {
        dispatch(userActions.login(email));
        setEmail('');
        setPassword('');
        setErrmsg('');
      } else {
        setErrmsg('Wrong password');
      }
    } else {
      setErrmsg('User not found');
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      automaticallyAdjustKeyboardInsets={true}>
      <SafeAreaView style={outercontainer}>
        <View style={styles.wView}>
          <Text style={styles.wText}>Login</Text>
        </View>
        <View></View>
        <View style={styles.container}>
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
          <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.button} onPress={loginhandler}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          {errmsg !== '' && <Text style={styles.errormsg}>{errmsg}</Text>}
        </View>
        <View style={styles.line}>
          <Text>already have an account ? </Text>
          <TouchableOpacity onPress={signupnavigationhandler}>
            <Text style={styles.Signuplink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
  },
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
  Signuplink: {
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
