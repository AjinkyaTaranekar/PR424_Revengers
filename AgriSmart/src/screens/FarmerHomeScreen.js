import React, { useState } from 'react';
import { Input } from "react-native-elements";
import { TouchableOpacity, View } from 'react-native';
import MapForm from '../components/MapForm';
import { DrawerActions } from 'react-navigation-drawer';
import { Text, Icon, Button, Modal, Card, Datepicker, IndexPath, Select, SelectItem } from '@ui-kitten/components';
<<<<<<< HEAD
<<<<<<< HEAD
import { navigate } from '../navigationRef';
import Spacer from '../components/Spacer';
import notify from '../services/NotificationService';
=======
import Spacer from '../components/Spacer';
>>>>>>> parent of 81cdeaf... Dialog flow implemented partially
=======
import Spacer from '../components/Spacer';
import { navigate } from '../navigationRef';
>>>>>>> parent of 347fa81... added chatbot support initial

const today = new Date();
const dayAfterTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return { date, onSelect: setDate };
};
const FarmerHomeScreen = ({navigation}) => {

  const [origin, setOrigin] = new useState({});
  const [dest, setDest] = new useState({});
  const [distance, setDistance] = new useState(0);
  const [visible, setVisible] = React.useState(false);
  const [weight, setWeight] = new useState("");
<<<<<<< HEAD
<<<<<<< HEAD
  const [name, setName] = new useState("");
=======
  const [volume, setVolume] = new useState("");
>>>>>>> parent of 347fa81... added chatbot support initial
=======
>>>>>>> parent of b309ab7... Merge branch 'master' of https://github.com/AjinkyaTaranekar/PR424_Revengers
  const minMaxPickerState = useDatepickerState();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const load = [ "Grains", "Fruits", "Vegetable"];

  OriginDest = () => {
    setVisible(true);
    console.log(origin,dest,distance);
  };
  createBooking = (date,weight,index) => {
    console.log('indise CreateBooking');
    setVisible(false);
  };
  
  return (
    <View style={{flex:1}}>
      <MapForm 
        askedOriginLocation={(loc) => setOrigin(loc)}
        askedDestLocation={(loc) => setDest(loc)}
        getDistance = {(newDistance) => setDistance(newDistance)}
        userMode = "farmer"/>
      <TouchableOpacity
          activeOpacity={0.7}
          onPress= {() => (navigation.dispatch(DrawerActions.toggleDrawer()))}
          style={{
              position: 'absolute',
              left: 25,
              top: 40,
            }}>
          <Icon
              fill='#8F9BB3'
              name='menu-outline'
              style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 30,
                }}
          />  
      </TouchableOpacity>
      <Button 
        disabled={Object.keys(origin).length === 0 && Object.keys(dest).length === 0 ? true: false}
        style={{alignSelf: "center", position: 'absolute', bottom: 50}}
        onPress = {() => {OriginDest()}}
      >Confirm Locations</Button>
      <Modal
        visible={visible}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style = {{ minHeight: 350, minWidth: 300 }}>
          <Text h4>Select type of load</Text>
          <Select
            status='primary'
            value={load[selectedIndex-1]}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <SelectItem title='Grains'/>
            <SelectItem title='Fruit'/>            
            <SelectItem title='Vegetable'/>
          </Select>
          <Spacer></Spacer>
          <Text h4>Select date of delivery</Text>
          <Datepicker
            placeholder='Select Date'
            min={today}
            max={dayAfterTomorrow}
            {...minMaxPickerState}
          />
          <Spacer></Spacer>
          <Text h4>Enter the load(weight) in kg</Text>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            status='primary'
            placeholder="Enter weight"
            value={weight}
            keyboardType={'numeric'}
            onChangeText={(newWeight) => setWeight(newWeight)}
          ></Input>
          <Text h4>Enter the volume in m^3</Text>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            status='primary'
            placeholder="Enter volume"
            value={volume}
            keyboardType={'numeric'}
            onChangeText={(newVolume) => setVolume(newVolume)}
          ></Input>
          <Spacer></Spacer>
          
          <Button disabled={weight && selectedIndex && volume && minMaxPickerState.date ? false: true} onPress={() => {createBooking(minMaxPickerState.date,weight,selectedIndex)}}>
            Create Booking
          </Button>
        </Card>
      </Modal>
    </View>
  );
};

export default FarmerHomeScreen;


// date food type weight