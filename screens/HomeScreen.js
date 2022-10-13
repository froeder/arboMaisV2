import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { signOut } from 'firebase/auth';
//Import styles
import styles from './Styles';

import { auth } from '../config';

export const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };


  return (
    <View style={styles.container}>
      <Button title='Sair' onPress={handleLogout} />
    </View>
  );
};
