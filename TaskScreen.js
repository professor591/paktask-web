import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TaskScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks will load here from Firestore.</Text>
      <Text>Add auto-fetch logic in src/screens/TaskScreen.js</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  title:{fontSize:18,fontWeight:'bold'}
});
