import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
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
      <Text>Árvores adicionadas</Text>
      <Button title='Sair' onPress={handleLogout} />
    </View>
  );
};
