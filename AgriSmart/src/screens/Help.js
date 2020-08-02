import React, { Component }  from 'react';
import { Text, StyleSheet, View, Linking, Platform, TouchableOpacity } from "react-native";
import {SafeAreaView} from 'react-navigation';
import DrawerButton from '../components/DrawerButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-paper'
const HelpScreen = ({navigation}) => {

 const makeCallFire = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${101}';
    } else {
      phoneNumber = 'telprompt:${101}';
    }

    Linking.openURL(phoneNumber);
  };
  const makeCallAmb = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${102}';
    } else {
      phoneNumber = 'telprompt:${102}';
    }

    Linking.openURL(phoneNumber);
  };
  const makeCallPolice = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${100}';
    } else {
      phoneNumber = 'telprompt:${100}';
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
        <DrawerButton navigation = {navigation}/>
        <Text style = {styles.title}>Emergency calling</Text>
        
        <View style={styles.container} >



        <TouchableOpacity onPress={() => makeCallPolice()} activeOpacity={0.7} style={styles.touchableButton} >
         <Card style={{height:30, flexDirection:"row"}}>
           <View style={{flexDirection:"row"}}>
         <MIcon name="pistol" size={30} color="#900" style={styles.ic}/>
          <Text style={styles.TextStyle}>
          

         Police

             </Text>
             </View>
             </Card>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => makeCallFire()} activeOpacity={0.7} style={styles.touchableButton} >
         <Card style={{height:30, flexDirection:"row"}}>
           <View style={{flexDirection:"row"}}>
           <Icon name="fire-extinguisher" size={30} color="#900" style={styles.ic} />
          <Text style={styles.TextStyle}>
          

          Fire Brigade

             </Text>
             </View>
             </Card>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => makeCallAmb()} activeOpacity={0.7} style={styles.touchableButton} >
         <Card style={{height:30, flexDirection:"row"}}>
           <View style={{flexDirection:"row"}}>
           <Icon name="ambulance" size={30} color="#900" style={styles.ic} />
          <Text style={styles.TextStyle}>
        
Ambulance
             </Text>
             </View>
             </Card>
        </TouchableOpacity>
       
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton: {
    padding: 10,
    backgroundColor: "#ffffff",
    marginBottom:10,
    elevation: 8,
  },
  TextStyle: {
    fontSize: 18,
    textAlign:"left",
    width:300,
    paddingLeft:10,
  },
  title:{
    textAlign:"center",
    paddingTop:70,
    fontWeight:"bold",
    fontSize:25
  },
  ic:{
    color:"#424874",
  }
});

export default HelpScreen;
