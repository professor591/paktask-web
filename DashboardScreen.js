import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function DashboardScreen({ navigation }) {
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    const init = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, { bonus: 50, wallet: 50 });
        setBonus(50);
      } else {
        setBonus(snap.data().bonus || 0);
      }
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PakTask</Text>
      <Text style={styles.bonus}>Your Bonus: Rs. {bonus}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tasks')}>
        <Text style={styles.buttonText}>View Tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Withdraw')}>
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Admin')}>
        <Text style={styles.buttonText}>Admin Panel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',padding:20},
  title:{fontSize:24,fontWeight:'bold',marginBottom:12},
  bonus:{fontSize:18,marginBottom:20},
  button:{backgroundColor:'#1d4ed8',padding:12,borderRadius:8,width:'100%',alignItems:'center',marginBottom:10},
  buttonText:{color:'#fff'}
});
