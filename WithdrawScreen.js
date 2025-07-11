import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function WithdrawScreen() {
  const [method, setMethod] = useState('');
  const [amount, setAmount] = useState('');

  const submitWithdraw = () => {
    Alert.alert('Request sent', `Method: ${method}\nAmount: Rs. ${amount}`);
    // TODO: Save request to Firestore for admin approval
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Withdraw Funds</Text>
      <TextInput placeholder="Method (JazzCash/EasyPaisa/Bank)" style={styles.input} value={method} onChangeText={setMethod} />
      <TextInput placeholder="Amount" style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <TouchableOpacity style={styles.button} onPress={submitWithdraw}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  title:{fontSize:24,fontWeight:'bold',marginBottom:12},
  input:{width:'100%',borderWidth:1,borderRadius:8,padding:12,marginBottom:12},
  button:{backgroundColor:'#1d4ed8',padding:12,borderRadius:8,width:'100%',alignItems:'center'},
  buttonText:{color:'#fff'}
});
