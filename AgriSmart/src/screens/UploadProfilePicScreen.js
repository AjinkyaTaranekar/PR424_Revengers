import React, { useState } from "react";
import { SafeAreaView, AsyncStorage } from 'react-native';
import { Image } from "react-native-elements";
import { Divider, Icon, Text, TopNavigation, TopNavigationAction, Button, Layout } from '@ui-kitten/components';
import {navigate} from '../navigationRef';

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

const UploadProfilePicScreen = () => {
  const navigateDetails = () => {
    // set profile pic in database 
    navigate('ChooseMode');
  };
  
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const sentences = {
    'en': ['Upload Profile Picture'],
    'hi': ['प्रोफ़ाइल चित्र अपलोड करें'],
    'mr': ['प्रोफाइल चित्र अपलोड करा'],
    'ta': ['சுயவிவரப் படத்தைப் பதிவேற்றுக'],
    'te': ['ప్రొఫైల్ చిత్రాన్ని అప్‌లోడ్ చేయండి'],
    'gu': ['પ્રોફાઇલ ચિત્ર અપલોડ કરો'],
    'kn': ['ಪ್ರೊಫೈಲ್ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ'],
    'pa': ['ਪ੍ਰੋਫਾਈਲ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ'],
  };
  value();
  const navigateBack = () => {
    navigate('NameInput'); 
  };

  const uploadImage = () => {
    //upload image, and set image in avatar 
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
      <TopNavigation accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={{flex: 1, justifyContent: 'center'}}>
        <Layout style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
          <Image 
              source={require('../assets/images/avatar.png')}  
              style={{width: 125, height: 125, borderRadius: 125/ 2}} 
          />
          <Button 
              style={{height: 5 ,width: 180, alignSelf: "center"}} 
              onPress={uploadImage}>
                {sentences[language][0]}
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

export default UploadProfilePicScreen;




