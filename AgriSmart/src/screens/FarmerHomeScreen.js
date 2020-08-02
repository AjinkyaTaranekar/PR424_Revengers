import React, { useState,useContext } from 'react';
import { Context as AuthContext } from "../context/AuthContext";
import { Input } from "react-native-elements";
import { TouchableOpacity, View,StyleSheet } from 'react-native';
import MapForm from '../components/MapForm';
import { DrawerActions } from 'react-navigation-drawer';
import { Text, Icon, Button, Modal, Card, Datepicker, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { navigate } from '../navigationRef';
import Spacer from '../components/Spacer';
<<<<<<< HEAD
import { navigate } from '../navigationRef';
=======
import notify from '../services/NotificationService';
>>>>>>> 4ed81d06c0e6a293f1c717c1d5016067df1ae352

const today = new Date();
const dayAfterTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = React.useState(initialDate);
  return { date, onSelect: setDate };
};
const FarmerHomeScreen = ({navigation}) => {

  const {  updateCoords,updateshippingDetails } = useContext(AuthContext);
  const [origin, setOrigin] = new useState({});
  const [dest, setDest] = new useState({});
  const [distance, setDistance] = new useState(0);
  const [visible, setVisible] = React.useState(false);
  const [weight, setWeight] = new useState("");
  const [name, setName] = new useState("");
  const minMaxPickerState = useDatepickerState();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const load = [ "Grains", "Fruits/Vegetable"];

  OriginDest = () => {
    setVisible(true);
    console.log(origin,dest,distance);
  };
  createBooking = (date,weight,index) => {
    console.log('inside CreateBooking');
    setVisible(false);
    updateshippingDetails(date,weight,index);
    navigate('FindTransporter',{origin: origin, destination: dest, distance: distance, weight: weight, load: load[selectedIndex-1], date: minMaxPickerState.date});
    notify.onPressSendNotification("Ride With AgriSmart","Searching for available trucks 🚚🚚");
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
        onPress = {() => {OriginDest(); updateCoords({origin,dest})}}
      >Confirm Locations</Button>
           <View>

      <TouchableOpacity style={styles.chatBot} onPress={navigate("ChatBot")}>
        <Text style={{fontSize:50,alignContent:"center"}}>🤖</Text>
      </TouchableOpacity>
      </View>
      
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
            <SelectItem title='Fruit / Vegetable'/>
          </Select>
          <Spacer></Spacer>
          <Text h4>Enter load name</Text>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            status='primary'
            placeholder="Enter load name"
            value={name}
            onChangeText={(newName) => setName(newName)}
          ></Input>
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
          <Spacer></Spacer>
          
  
          <Button disabled={weight && selectedIndex && minMaxPickerState.date ? false: true} onPress={() => {createBooking(minMaxPickerState.date,weight,selectedIndex)}}>
            Create Booking
          </Button>
         
        </Card>
      </Modal>
 
    </View>
  );
};

export default FarmerHomeScreen;

const styles=StyleSheet.create({
  chatBot:{
    position:"absolute",
    bottom:3,
    right:0,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:80,
    height:80,
    backgroundColor:'black',
    borderRadius:40,
}
})

// date food type weight