import React, { useState } from "react";
import { SafeAreaView, AsyncStorage } from 'react-native';
import { Image } from "react-native-elements";
import { Divider, Icon, Text, TopNavigation,Layout, TopNavigationAction, Button } from '@ui-kitten/components';
import {navigate} from '../navigationRef';
import Spacer from "../components/Spacer";

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);
const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);
var language = 'en';
const value = async () => {
  try {
    language = await AsyncStorage.getItem("language");
    return language;
  } catch (error) {
    return "error";
  }
};

const DriverVerificationScreen = () => {
  const navigateDetails = () => {
    if (mode == 0)
      navigate('Home');
    else
      navigate('DriverVerification');
  };
  
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const sentences = {
    'en' :  ['Your ride, on Demand', 'Load your truck and transport to market with AgriSmart. It connects you with a reliable ride in minutes. One tap and a truck comes directly to you.', 'Register'],
    'hi': ['आपकी सवारी, डिमांड पर', 'अपने ट्रक और परिवहन को एग्रीस्मार्ट के साथ बाजार में लोड करें। यह आपको मिनटों में एक विश्वसनीय सवारी से जोड़ता है। एक क्लिक और एक ट्रक सीधे आपके पास आता है।', 'रजिस्टर करें'],
    'mr' :  ['Your ride, on Demand', 'Load your truck and transport to market with AgriSmart. It connects you with a reliable ride in minutes. One tap and a truck comes directly to you.', 'Register'],
    'ta': ['आपकी सवारी, डिमांड पर', 'अपने ट्रक और परिवहन को एग्रीस्मार्ट के साथ बाजार में लोड करें। यह आपको मिनटों में एक विश्वसनीय सवारी से जोड़ता है। एक क्लिक और एक ट्रक सीधे आपके पास आता है।', 'रजिस्टर करें'],
    'te' :  ['Your ride, on Demand', 'Load your truck and transport to market with AgriSmart. It connects you with a reliable ride in minutes. One tap and a truck comes directly to you.', 'Register'],
    'gu': ['आपकी सवारी, डिमांड पर', 'अपने ट्रक और परिवहन को एग्रीस्मार्ट के साथ बाजार में लोड करें। यह आपको मिनटों में एक विश्वसनीय सवारी से जोड़ता है। एक क्लिक और एक ट्रक सीधे आपके पास आता है।', 'रजिस्टर करें'],
    'kn' :  ['Your ride, on Demand', 'Load your truck and transport to market with AgriSmart. It connects you with a reliable ride in minutes. One tap and a truck comes directly to you.', 'Register'],
    'pa': ['आपकी सवारी, डिमांड पर', 'अपने ट्रक और परिवहन को एग्रीस्मार्ट के साथ बाजार में लोड करें। यह आपको मिनटों में एक विश्वसनीय सवारी से जोड़ता है। एक क्लिक और एक ट्रक सीधे आपके पास आता है।', 'रजिस्टर करें'],
  };
  value();
  const navigateBack = () => {
    navigate('UploadProfilePic'); 
  };
    const [mode, setMode] = new useState(0);

    return (
      
      <SafeAreaView style={{ flex: 1}}>
        <Divider/>
        <Layout style={{flex: 1, justifyContent: 'center'}}>
          <Layout style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <Image 
                source={require('../assets/images/aadharCard.png')}  
                style={{width: 125, height: 125}} 
            />
            <Button 
                style={{height: 5 ,width: 180, alignSelf: "center"}} 
                onPress={newMode => setMode(0)}>
                  {sentences[language][0]}
            </Button>
          </Layout>
          <Layout style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <Image 
                source={require('../assets/images/drivingLicence.png')}  
                style={{width: 150, height: 100}} 
            />
            <Button 
                style={{height: 5 ,width: 180, alignSelf: "center"}} 
                onPress={newMode => setMode(1)}>
                  {sentences[language][1]}
            </Button>
          </Layout>
          <Spacer></Spacer>
          <Layout style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
            <Image 
                source={require('../assets/images/vehicleRegistration.jpg')}  
                style={{width: 150, height: 100}} 
            />
            <Button 
                style={{height: 5 ,width: 180, alignSelf: "center"}} 
                onPress={newMode => setMode(2)}>
                  {sentences[language][2]}
            </Button>
          </Layout>
        </Layout>
        <Button 
            style={{height: 5 ,width: 180, alignSelf: "center"}} 
            onPress={navigateDetails}
            accessoryRight={ForwardIcon}>
        </Button>
      </SafeAreaView>
  
    );
};

export default DriverVerificationScreen;




