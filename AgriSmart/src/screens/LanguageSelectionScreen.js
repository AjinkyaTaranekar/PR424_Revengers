import React from 'react';
import { SafeAreaView } from 'react-native';
import { ImageBackground, StyleSheet } from 'react-native';
import { Button, Divider, TopNavigation, Drawer, DrawerItem, Icon } from '@ui-kitten/components';
import { AsyncStorage } from "react-native"
import {navigate} from '../navigationRef';

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward'/>
);

const Header = (props) => (
  <React.Fragment>
    <ImageBackground
      style={[props.style, styles.header]}
      source={require('../assets/images/indianLanguage.jpg')}
    />
    <Divider/>
  </React.Fragment>
);

const LanguageSelectionScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  var languages = {
    'null': ['en', 'Select a Language: '],
    1: ['en','Select a Language: ', 'English'],
    2: ['hi','भाषा चुनें: ', 'हिन्दी'], 
    3: ['mr','एक भाषा निवडा:', 'मराठी'],
    4: ['kn', 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ: ','ಕನ್ನಡ'],
    5: ['ta','ஒரு மொழியைத் தேர்ந்தெடுக்கவும்:','தமிழ்'],
    6: ['te','భాషను ఎంచుకోండి:','తెలుగు'], 
    7: ['gu','ભાષા પસંદ કરો: ','ગુજરાતી'],
    8: ['pa','ਕੋਈ ਭਾਸ਼ਾ ਚੁਣੋ: ','ਪੰਜਾਬੀ']
  };

  const navigateDetails = () => {
    console.log(languages[selectedIndex]);
    AsyncStorage.setItem("language", languages[selectedIndex][0]);
    navigate('Welcome');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title= {languages[selectedIndex][1]} subtitle = {languages[selectedIndex][2]} alignment='center'/>
      <Divider/>
      <Drawer
        header={Header}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <DrawerItem
          title='English'
          accessoryRight={ForwardIcon}
        />
        <DrawerItem
          title='हिन्दी'
          accessoryRight={ForwardIcon}
        />
        <DrawerItem
          title='मराठी'
          accessoryRight={ForwardIcon}
        />
        <DrawerItem
          title='ಕನ್ನಡ'
          accessoryRight={ForwardIcon}
        />
        <DrawerItem
          title='தமிழ்'
          accessoryRight={ForwardIcon}
        />
        <DrawerItem
          title='తెలుగు'
          accessoryRight={ForwardIcon}
        />
        <DrawerItem
          title='ગુજરાતી'
          accessoryRight={ForwardIcon}
        />
        <DrawerItem
          title='ਪੰਜਾਬੀ'
          accessoryRight={ForwardIcon}
        />
      </Drawer>
      <Button 
        disabled={selectedIndex ? false: true}
        appearance='ghost'
        style={{ alignSelf: "center", position: 'absolute', bottom: 15, right: 25}} 
        onPress={navigateDetails}
        accessoryRight={ForwardIcon}>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 125,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default LanguageSelectionScreen;