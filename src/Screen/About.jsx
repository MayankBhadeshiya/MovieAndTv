import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This app is created by Mayank Bhadeshiya during React native Exam At RadixWeb</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems: 'center',
    },
    text:{
        textAlign: 'center',
    }
})