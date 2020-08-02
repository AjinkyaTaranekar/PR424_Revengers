import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import DrawerButton from '../components/DrawerButton';


const InviteAFriendScreen = ({navigation}) => {

  return (
    <View style = {styles.container}>
        <DrawerButton navigation = {navigation}/> 
        <Text>This is InviteAFriend Page</Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default InviteAFriendScreen;
