import React from 'react';
import { View, Text } from 'react-native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>PakTask App: Ready!</Text>
    </View>
  );
}