import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AdminScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel (Only you)</Text>
      <Text>Approve withdrawal requests, manage tasks, etc.</Text>
      <Text>Implement Firestore queries in src/screens/AdminScreen.js</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  title:{fontSize:24,fontWeight:'bold',marginBottom:12}
});
