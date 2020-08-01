import React, { useState } from "react";
import { SafeAreaView, AsyncStorage } from 'react-native';
import { Image, Input } from "react-native-elements";
import { Divider, Icon, Text, TopNavigation,Layout, TopNavigationAction, Button, IndexPath, Select, SelectItem} from '@ui-kitten/components';
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
  const navigateDetails = async () => {
      await AsyncStorage.setItem('verify',"true");
      navigate('Home');
  };
  const [aadharNo, setAadharNo] = new useState("");
  const [drivingLic, setDrivingLic] = new useState("");
  const [vehicleReg, setVehicleReg] = new useState("");
  const [capacity, setCapacity] = new useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const load = [ "Grains", "Fruits/Vegetable"];

  
  
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
    return (
      
      <SafeAreaView style={{ flex: 1}}>
        <TopNavigation accessoryLeft={BackAction}/>
        <Layout style={{flex: 1}}>
        <Text category = "h7">Enter your Aadhar Number</Text>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              status='primary'
              placeholder="Aadhar Number"
              value={aadharNo}
              keyboardType={'numeric'}
              onChangeText={(newAadharNo) => setAadharNo(newAadharNo)}
            ></Input>
          <Text category = "h7">Enter your driving licence number</Text>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              status='primary'
              placeholder="Driving Licence Number"
              value={drivingLic}
              keyboardType={'numeric'}
              onChangeText={(newDrivingLic) => setDrivingLic(newDrivingLic)}
            ></Input>
          <Text category = "h7">Enter your vehicle registration number</Text>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              status='primary'
              placeholder="Vehicle Registration Number"
              value={vehicleReg}
              keyboardType={'numeric'}
              onChangeText={(newVehicleReg) => setVehicleReg(newVehicleReg)}
            ></Input>
          <Text category = "h7">Enter your truck capacity in kg</Text>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              status='primary'
              placeholder="Truck Capacity"
              value={capacity}
              keyboardType={'numeric'}
              onChangeText={(newCapacity) => setCapacity(newCapacity)}
            ></Input>
          <Text category = "h7">Select type of load</Text>
          <Select
            status='primary'
            value={load[selectedIndex-1]}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <SelectItem title='Grains'/>
            <SelectItem title='Fruit / Vegetable'/>
          </Select>
          <Spacer></Spacer>
           
        </Layout>
        <Button 
            appearance='ghost'
            style={{alignSelf: "center", position: 'absolute', bottom: 25, right: 25}} 
            onPress={navigateDetails}
            accessoryRight={ForwardIcon}>
        </Button>
      </SafeAreaView>
  
    );
};

export default DriverVerificationScreen;