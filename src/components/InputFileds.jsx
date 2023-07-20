import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../Constant/Colors';

export default function InputFileds({
  lable,
  icon,
  inputType,
  keybordType,
  value,
  onChangeText,
}) {
  return (
    <View style={styles.container}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={lable}
          placeholderTextColor={COLORS.lightwhite}
          autoCapitalize="none"
          keyboardType={keybordType}
          style={styles.input}
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}></TextInput>
      ) : (
        <TextInput
          placeholder={lable}
          placeholderTextColor={COLORS.lightwhite}
          autoCapitalize="none"
          keyboardType={keybordType}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}></TextInput>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
    alignItems: 'center',
  },
  input:{flex: 1, paddingVertical: 0, color: COLORS.white}
});
