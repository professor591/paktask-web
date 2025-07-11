import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getAuth, signInWithPhoneNumber, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginScreen({ navigation }) {
  const recaptchaVerifier = useRef(null);
  const [phone, setPhone] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [code, setCode] = useState('');

  const sendVerification = async () => {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier.current);
      setVerificationId(confirmationResult.verificationId);
      Alert.alert('OTP sent');
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  const confirmCode = async () => {
    try {
      const credential = GoogleAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      navigation.replace('Dashboard');
    } catch (err) {
      Alert.alert('Invalid code.');
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.title}>PakTask Login</Text>
      {verificationId ? (
        <>
          <TextInput
            placeholder="Enter OTP"
            style={styles.input}
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity style={styles.button} onPress={confirmCode}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="+92xxxxxxxxxx"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.button} onPress={sendVerification}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => navigation.replace('Dashboard')}>
        <Text style={styles.skip}>Skip (for email/Google login demo)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  input: { width:'100%', borderWidth:1, borderRadius:8, padding:12, marginBottom:12 },
  button: { backgroundColor:'#1d4ed8', padding:12, borderRadius:8, width:'100%', alignItems:'center' },
  buttonText: { color:'#fff', fontWeight:'bold' },
  skip: { marginTop:20, color:'#6b7280' }
});
