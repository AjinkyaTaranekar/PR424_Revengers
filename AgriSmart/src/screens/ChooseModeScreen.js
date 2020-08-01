import React, { useState } from "react";
import { SafeAreaView, AsyncStorage } from 'react-native';
import { Image } from "react-native-elements";
import { Divider, Icon, Text,Layout, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
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

const ChooseModeScreen = () => {
  const navigateDetails = async () => {
    await AsyncStorage.setItem("mode",mode);
    
    if (mode == "farmer")
      navigate('Home');
    else
      navigate('DriverVerification');
  };
  
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const sentences = {
    'en': ['I\'m a Farmer', 'I\'m a Transporter'],
    'hi': ['मैं एक किसान हूँ', 'मैं एक ट्रांसपोर्टर हूं'],
    'mr': ['मी एक शेतकरी आहे', 'मी ट्रान्सपोर्टर आहे'],
    'ta': ['நான் ஒரு விவசாயி', 'நான் ஒரு டிரான்ஸ்போர்ட்டர்'],
    'te': ['నేను రైతును', 'నేను ట్రాన్స్పోర్టర్'],
    'gu': ['હું ખેડૂત છું', 'હું ટ્રાન્સપોર્ટર છું'],
    'kn': ['ನಾನು ಕೃಷಿಕ', 'ನಾನು ಟ್ರಾನ್ಸ್‌ಪೋರ್ಟರ್'],
    'pa': ['ਮੈਂ ਇੱਕ ਕਿਸਾਨ ਹਾਂ', 'ਮੈਂ ਟਰਾਂਸਪੋਰਟਰ ਹਾਂ'],
  };
  value();
  const navigateBack = () => {
    navigate('UploadProfilePic'); 
  };
    const [mode, setMode] = new useState("");

    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center'}}>
        <TopNavigation accessoryLeft={BackAction}/>
        <Divider/>
        <Layout style={{flex: 1, justifyContent: 'center'}}>
          <Layout style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Image 
                source={require('../assets/images/farmer.png')}  
                style={{width: 125, height: 125, borderRadius: 125/ 2}} 
            />
            <Button 
                status = {mode == 'farmer' ? 'success' : 'primary'}
                style={{height: 5 ,width: 180, alignSelf: "center"}} 
                onPress={newMode => setMode("farmer")}>
                  {sentences[language][0]}
            </Button>
          </Layout>
          <Layout style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Image 
                source={require('../assets/images/transporter.png')}  
                style={{width: 125, height: 125, borderRadius: 125/ 2}} 
            />
            <Button 
                status = {mode == 'transporter' ? 'success' : 'primary'}
                style={{height: 5 ,width: 180, alignSelf: "center"}} 
                onPress={newMode => setMode("transporter")}>
                  {sentences[language][1]}
            </Button>
          </Layout>
          <Button 
            disabled = {mode ? false : true }
            appearance='ghost'
            style={{alignSelf: "center", position: 'absolute', bottom: 50, right: 50}} 
            onPress={navigateDetails}
            accessoryRight={ForwardIcon}>
          </Button>
        </Layout>
      </SafeAreaView>
  
    );
};

export default ChooseModeScreen;