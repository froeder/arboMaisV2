import React from 'react';
import styles from '../screens/Styles';
import { View } from './View';
import { Text } from "react-native";

export const ViewItemTree = ({ title, description }) => {

  return <View isSafe={false} style={styles.section_values}>
              <Text style={styles.bold}>{title} </Text>
              <Text style={styles.identification_text}>
                {description}
              </Text>
            </View>;
};
