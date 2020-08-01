import React, { useState } from "react";
import { SafeAreaView, AsyncStorage } from 'react-native';
import { Input } from "react-native-elements";
import { Divider, Icon, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import {navigate} from '../navigationRef';

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

const NameInputScreen = () => {
  const navigateDetails = () => {
    // send name to database.
    navigate('UploadProfilePic');
  };
  
  const sentences = {
    'en': ['Enter your Name'],
    'hi': ['अपना नाम दर्ज करें'],
    'mr': ['आपले नांव लिहा'],
    'ta': ['உங்கள் பெயரை உள்ளிடவும்'],
    'te': ['మీ పేరు రాయుము, మీ పేరు రాయండి'],
    'gu': ['તમારું નામ દાખલ કરો'],
    'kn': ['ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ'],
    'pa': ['ਆਪਣਾ ਨਾਮ ਦਰਜ ਕਰੋ'],
  };
  
  value();
  
  const [name, setName] = new useState("");

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center"}}>
      <Text category = 'h3' style = {{margin: 5}}>{sentences[language][0]}</Text>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        lable="name"
        placeholder="name"
        value={name}
        onChangeText={(newName) => setName(newName)}
      ></Input>
      <Button 
        style={{height: 5 ,width: 180, alignSelf: "center"}} 
        onPress={navigateDetails}
        accessoryRight={ForwardIcon}>
      </Button>
    </SafeAreaView>

  );
};

export default NameInputScreen;




