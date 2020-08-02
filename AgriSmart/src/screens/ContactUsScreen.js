import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import DrawerButton from '../components/DrawerButton';


const ContactUsScreen = ({navigation}) => {

  return (
    <View styles = {styles.container}>
        <DrawerButton navigation = {navigation}/> 
        <Text>This is Contact Us Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ContactUsScreen;
