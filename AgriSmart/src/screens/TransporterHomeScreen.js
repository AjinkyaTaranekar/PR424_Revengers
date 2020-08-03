import React, { useState } from 'react';
import { Input } from "react-native-elements";
import { TouchableOpacity, View, AsyncStorage, ToastAndroid, Image } from 'react-native';
import MapForm from '../components/MapForm';
import { DrawerActions } from 'react-navigation-drawer';
import { Text, Icon, Button, Modal, Card, Datepicker, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { navigate } from '../navigationRef';
import Spacer from '../components/Spacer';
import booking from '../services/BookingService';

const TransporterHomeScreen = ({navigation}) => {
  const [origin, setOrigin] = new useState({});
  const [dest, setDest] = new useState({});
  const [visible, setVisible] = React.useState(false);
  const [pool, setPool] = React.useState(false);
  const [weight, setWeight] = new useState("");
  const [distance, setDistance] = new useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const load = [ "Grains", "Fruits","Vegetable"];
  const [requestMode, setRequestMode] = new useState(true);
  
  OriginDest = () => {
    setVisible(true);
    console.log(origin,dest,distance);
  };
  createBooking = async () => {
    setVisible(false);
    notify.onPressSendNotification("Ride with AgriSmart 🚛", "Searching for  👨‍🌾 farmers Nearby");
    var farmer = booking.findFarmers({latitude: origin.lat, longitude: origin.lon},load[selectedIndex-1],weight);
    console.log("farmer",farmer);
    if(Object.keys(farmer).length !== 0)
      navigate('Navigate',{farmerAvailable: farmer, driver: [{"locations":{origin: {latitude: origin.lat, longitude: origin.lon}}}]});
 };

  const goToPooling = async () => {
    setPool(false);
    const result = booking.pooling();
    notify.onPressSendNotification("Ride with AgriSmart 🚛", "Keep your Driving Licence, \nHappy Journey!! 😄😄");
    const token = await AsyncStorage.getItem('token');
    console.log(token)
    var user,farmer;
    //request = 'false'
    for (let driver of Object.keys(result)){
      if (token == result[driver][0]['token']){
          user = result[driver][0]
          farmer = result[driver].slice(1,-1)
      }
    }
    console.log("driver",user,"\nfarmer",farmer);
    //await AsyncStorage.setItem('poolingRequest', 'false');
    navigate('Pooling',{farmer: farmer, driver: user});
  };
    

  const checkPoolingRequest = async() =>{
    //const request = await AsyncStorage.getItem('poolingRequest');
    
    var request = 'true';
    console.log(request)
    if (request != "true"){
      setPool(false)
      return false;
    }
    setPool(true)
    return true;
  }
  const verifyDriverDetails = async(loc) =>{
    const verify = await AsyncStorage.getItem('verify');
    if (verify != "true"){
      ToastAndroid.show('You didn\'t verfied the details', ToastAndroid.SHORT);
      navigate('DriverVerification');
    }
    setOrigin(loc)
    return true;
  }
  const toggleRequestMode = (req) =>{
    // set driver request based on true or false, it shows availability of him
    console.log(req ^ requestMode)
    setRequestMode(req ^ requestMode)
    
    if (requestMode)
      ToastAndroid.show('Transporter Request off', ToastAndroid.SHORT);
    else
      ToastAndroid.show('Transporter Request on', ToastAndroid.SHORT);
  }
  return (
    <View style={{flex:1}}>
      <MapForm 
        askedOriginLocation={(loc) => verifyDriverDetails(loc)}
        askedDestLocation={(loc) => setDest(loc)} 
        userMode = "transporter"
        getDistance = {(newDistance) => setDistance(newDistance)}/>
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
      <TouchableOpacity
          activeOpacity={0.5}
          onPress= {() => (toggleRequestMode(true))}
          style={{
              position: 'absolute',
              right: 25,
              top: 40,
            }}>
          <Icon
              fill= '#FF6200'
              name='car-outline'
              style={{
                  resizeMode: 'contain',
                  width: 30,
                  height: 30,
                }}
          />  
      </TouchableOpacity>
      <Button 
        disabled={requestMode ? false: true}
        status = 'success'
        style={{left: 25, position: 'absolute', bottom: 50}}
        onPress = {() => checkPoolingRequest()}
      >Check Pooling</Button>
      <Modal
        visible={pool}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <Card disabled={true}>
          <Text style = {{color: 'red', fontSize: 18 ,alignItems:"center", fontWeight: 'bold'}} >Pooling Request has been Made!</Text>
          <Image source = {require('../assets/images/truckWithGoods.gif')} style = {{flex: 1, width: 250, height: 250, resizeMode: 'contain' }}/>
          <Button style={{alignItems:"center",width: 150, position: 'absolute',bottom: 50, left: 15}} onPress={() => goToPooling()}>
            Go to Navigation
          </Button>
          <Spacer></Spacer>
          <Button style={{alignItems:"center",width: 100, position: 'absolute', bottom: 50, right: 15}} status = 'danger' onPress={() => setPool(false)}>
            Go back
          </Button>
        </Card>
      </Modal>
      <Button 
        disabled={!requestMode && Object.keys(origin).length === 0 && Object.keys(dest).length === 0 ? true: false}
        style={{right: 25, position: 'absolute', bottom: 50}}
        onPress = {() => OriginDest()}
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
            <SelectItem title='Fruit / Vegetable'/>
          </Select>
          <Spacer></Spacer>
          <Text h4>Enter the capacity of truck in kg</Text>
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
          
          <Button disabled={weight && selectedIndex ? false: true} onPress={() => createBooking()}>
            Create Booking
          </Button>
        </Card>
      </Modal>
    </View>
  );
};

export default TransporterHomeScreen;