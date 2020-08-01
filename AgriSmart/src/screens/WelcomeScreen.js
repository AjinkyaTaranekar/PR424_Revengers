import React from 'react';
import { SafeAreaView, AsyncStorage, Image } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
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

const WelcomeScreen = () => {
  const navigateDetails = () => {
    navigate('Signup');
  };
  
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const AppIcon = () => (
    <Image style={{width: 45, height: 45}}
      source={require('../assets/images/appIcon.jpeg')}
    />
  );
  
  const sentences = {
    'en': ['Your ride, on Demand', 'Load your truck and transport to market with AgriSmart. It connects you with a reliable ride in minutes. One tap and a truck comes directly to you.', 'Register'],
    'hi': ['आपकी सवारी, डिमांड पर', 'अपने ट्रक और परिवहन को एग्रीस्मार्ट के साथ बाजार में लोड करें। यह आपको मिनटों में एक विश्वसनीय सवारी से जोड़ता है। एक क्लिक और एक ट्रक सीधे आपके पास आता है।', 'रजिस्टर करें'],
    'mr': ['मागणीनुसार आपली राइड', 'आपला ट्रक लोड करा आणि अ‍ॅग्रीस्मार्टसह बाजारपेठेत वाहतूक करा. हे आपल्याला मिनिटांत विश्वासार्हतेने जोडते. एक क्लिक आणि एक ट्रक थेट आपल्याकडे येतो.', 'नोंदणी करा'],
    'ta': ['உங்கள் சவாரி, தேவைக்கேற்ப', 'உங்கள் டிரக்கை ஏற்றி, அக்ரிஸ்மார்ட் மூலம் சந்தைக்கு கொண்டு செல்லுங்கள். இது நிமிடங்களில் நம்பகமான சவாரி மூலம் உங்களை இணைக்கிறது. ஒரு கிளிக் மற்றும் ஒரு டிரக் உங்களுக்கு நேரடியாக வரும்.', 'பதிவு'],
    'te': ['మీ రైడ్, డిమాండ్ మీద', 'మీ ట్రక్కును లోడ్ చేసి, అగ్రిస్‌మార్ట్‌తో మార్కెట్‌కు రవాణా చేయండి. ఇది నిమిషాల్లో నమ్మకమైన ప్రయాణంతో మిమ్మల్ని కలుపుతుంది. ఒక క్లిక్ మరియు ట్రక్ మీకు నేరుగా వస్తుంది.', 'నమోదు'],
    'gu': ['તમારી સવારી, માંગ પર', 'તમારા ટ્રકને લોડ કરો અને એગ્રીસ્માર્ટથી બજારમાં પરિવહન કરો. તે તમને મિનિટમાં વિશ્વસનીય સવારી સાથે જોડે છે. એક ક્લિક અને એક ટ્રક સીધા તમારી પાસે આવે છે.', 'નોંધણી કરો'],
    'kn': ['ನಿಮ್ಮ ಸವಾರಿ, ಬೇಡಿಕೆಯ ಮೇರೆಗೆ', 'ನಿಮ್ಮ ಟ್ರಕ್ ಅನ್ನು ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಅಗ್ರಿಸ್ಮಾರ್ಟ್ನೊಂದಿಗೆ ಮಾರುಕಟ್ಟೆಗೆ ಸಾಗಿಸಿ. ಇದು ನಿಮಿಷಗಳಲ್ಲಿ ವಿಶ್ವಾಸಾರ್ಹ ಸವಾರಿಯೊಂದಿಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ. ಒಂದು ಕ್ಲಿಕ್ ಮತ್ತು ಟ್ರಕ್ ನಿಮಗೆ ನೇರವಾಗಿ ಬರುತ್ತದೆ.', 'ನೋಂದಣಿ'],
    'pa': ['ਤੁਹਾਡੀ ਸਵਾਰੀ, ਡਿਮਾਂਡ ਤੇ', 'ਆਪਣੇ ਟਰੱਕ ਨੂੰ ਲੋਡ ਕਰੋ ਅਤੇ ਐਗਰਿਸਮਾਰਟ ਨਾਲ ਮਾਰਕੀਟ ਵਿੱਚ ਆਵਾਜਾਈ. ਇਹ ਤੁਹਾਨੂੰ ਮਿੰਟਾਂ ਵਿਚ ਇਕ ਭਰੋਸੇਯੋਗ ਰਾਈਡ ਨਾਲ ਜੋੜਦਾ ਹੈ. ਇਕ ਕਲਿੱਕ ਅਤੇ ਇਕ ਟਰੱਕ ਸਿੱਧਾ ਤੁਹਾਡੇ ਕੋਲ ਆ ਜਾਂਦਾ ਹੈ.', 'ਰਜਿਸਟਰ'],
  };
  value();
  const navigateBack = () => {
    navigate('LanguageSelection'); 
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title={evaProps => <Text {...evaProps} style={{fontSize: 20, fontStyle: 'italic'}}>AgriSmart</Text>} alignment='center' accessoryLeft={AppIcon} accessoryRight={BackAction}/>
      <Divider/>
      <Image 
        style={{width: 375, height: 350}}
        source={require('../assets/images/welcome.png')}
      />
      
      <Layout style={{ flex: 1}}>
        <Text category = 'h3' style = {{margin: 5}}>{sentences[language][0]}</Text>
        <Text style = {{margin: 15}}>{sentences[language][1]}</Text>
        <Button 
          style={{height: 5 ,width: 180, alignSelf: "center"}} 
          onPress={navigateDetails}
          accessoryRight={ForwardIcon}>
            {sentences[language][2]}
        </Button>
      </Layout>
  
    </SafeAreaView>
  );
};

export default WelcomeScreen;