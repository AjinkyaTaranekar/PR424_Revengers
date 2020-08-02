import React, { useState,useContext } from 'react';
import { Button, Icon, List, ListItem, Text, Modal, Card } from '@ui-kitten/components';
import { StyleSheet, Image } from 'react-native';
import Spacer from '../components/Spacer';
import { navigate } from '../navigationRef';
import notify from '../services/NotificationService'
import { Context as AuthContext} from "../context/AuthContext";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, Tab, Layout } from '@ui-kitten/components';
import booking from '../services/BookingService';

const { Navigator, Screen } = createMaterialTopTabNavigator();
var origin,dest,distance,load,weight,date;
const QuickBookingScreen = () => {
  const {  bookShipping } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const book = (mode) =>{
      bookShipping(mode);
      notify.onPressSendNotification(mode+" Booking Mode", "Booking Confirmed 💯💯");
      setVisible(true);    
    }
    var price = parseInt(distance)*30/1000 + parseInt(weight)*50/100;
    price = Math.ceil(price + price*18/100);
    const goToPayment = () => {
        setVisible(false);
        var driver = booking.findDrivers({latitude: origin.lat, longitude: origin.lon},load,weight);
        console.log(driver);
        if(Object.keys(driver).length !== 0)
          navigate('Payment',{driver: driver, farmer: [{"locations":{origin: {latitude: origin.lat, longitude: origin.lon}, destination: {latitude: dest.lat, longitude: dest.lon}}}], price: price, mode: 'quick', date: date});
    }

    return (
        <Layout style={{ flex: 1 }} >
            <Spacer></Spacer>
            <Spacer></Spacer>
            <Card style={{borderColor:'red', borderRadius: 25, margin:10}}>
              <Text style = {{color: 'red', fontSize: 16, fontWeight: "bold"}} >Quick Booking</Text>
              <Text style = {{color: 'red', fontSize: 12}} >Quick Booking is a form of shipping, in that it allows you to ship your product in a single truck.</Text>
              <Text style = {{color: 'red', fontSize: 12}} >In short, we will only deliver your good.</Text>
            </Card>
    
            <Spacer></Spacer>
            <Text style = {{color: 'gray', fontSize: 16}}>Your Journey:-</Text>
            <Card style={{borderColor:'gray', borderRadius: 25, margin:10}}>
              <Text style = {{color: 'green', fontSize: 14}} >Origin ---{">"} <Text style = {{color: 'green', fontSize: 12}} >{origin['lat'] + `,` + origin['lon']}</Text></Text>
              <Text style = {{color: 'red', fontSize: 14}} >Destination ---{">"} <Text style = {{color: 'red', fontSize: 12}} >{dest['lat'] + `,` + dest['lon']}</Text></Text>
              <Text style = {{ fontSize: 14}} >Distance ---{">"} <Text style = {{fontSize: 12}} >{parseInt(distance)/1000}</Text> Km</Text>
              <Spacer></Spacer>
              <Text style = {{ fontSize: 14}} >Weight ---{">"} <Text style = {{fontSize: 12}} >{weight}</Text> Kg</Text>
              <Text style = {{ fontSize: 14}} >Load ---{">"} <Text style = {{fontSize: 12}} >{load}</Text></Text>
              <Text style = {{ fontSize: 14}} >Delivery Date ---{">"} <Text style = {{fontSize: 12}} >{date.toString()}</Text></Text>
            </Card>
        
            <Button style={{alignSelf: "center", position: 'absolute', bottom: 50}} onPress={() => book("Quick")}>{`Quick Booking Rs. ` + price}</Button>
            <Modal
                visible={visible}
                backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <Card disabled={true} style = {{ minHeight: 300, minWidth: 300 }}>
                <Text category = "h4">Booking Successfull!!</Text>
                <Image source = {require('../assets/images/bookingSuccessful.gif')}/>
                <Button onPress={() => goToPayment()}>
                    {'Pay Rs. ' + price}
                </Button>
                </Card>
            </Modal>
        </Layout>   
    );
};

const PoolingScreen = () => {
  const {  bookShipping } = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);
  var price = parseInt(distance)*30/1000 + parseInt(weight)*50/100;
  price = Math.ceil(price + price*18/100);
  var pooledPrice = Math.ceil(price - price*15/100);
  const dayAfterTomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2);
  const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    
  const book = (mode) =>{
    bookShipping(mode);
    notify.onPressSendNotification("Pooling Booking Mode", "Booking Confirmed 💯💯");
    setVisible(true);    
  }

  const goToPayment = () => {
      setVisible(false);
      var driver = booking.findDrivers({latitude: origin.lat, longitude: origin.lon},load,weight);
      console.log(driver);
      navigate('Payment',{driver: driver, farmer: {origin: {latitude: origin.lat, longitude: origin.lon}, destination: {latitude: dest.lat, longitude: dest.lon}}, price: pooledPrice, mode: mode, date: tomorrow});
  }

  return(
      <Layout style={{ flex: 1, alignItems: 'center' }}>
        <Spacer/>
        <Card style={{borderColor:'red', borderRadius: 25, margin:10}}>
          <Text style = {{color: 'red', fontSize: 16, fontWeight: "bold"}} >Pooling</Text>
          <Text style = {{color: 'red', fontSize: 12}} >Pool distribution is a form of shipping, in that it allows you to ship your product along with other orders in a single truck.</Text>
          <Text style = {{color: 'red', fontSize: 12}} >In short, we will deliver your goods, along with some other farmers good in same time.</Text>
        </Card>
    
        <Text style = {{color: 'gray', fontSize: 16}}>Your Journey:-</Text>
            
        <Card style={{borderColor:'gray', borderRadius: 25, margin:10}}>
              <Text style = {{color: 'green', fontSize: 14}} >Origin ---{">"} <Text style = {{color: 'green', fontSize: 12}} >{origin['lat'] + `,` + origin['lon']}</Text></Text>
              <Text style = {{color: 'red', fontSize: 14}} >Destination ---{">"} <Text style = {{color: 'red', fontSize: 12}} >{dest['lat'] + `,` + dest['lon']}</Text></Text>
              <Text style = {{ fontSize: 14}} >Distance ---{">"} <Text style = {{fontSize: 12}} >{parseInt(distance)/1000}</Text> Km</Text>
              <Spacer></Spacer>
              <Text style = {{ fontSize: 14}} >Weight ---{">"} <Text style = {{fontSize: 12}} >{weight}</Text> Kg</Text>
              <Text style = {{ fontSize: 14}} >Load ---{">"} <Text style = {{fontSize: 12}} >{load}</Text></Text>
              <Text style = {{ fontSize: 14}} >Delivery Date ---{">"} <Text style = {{fontSize: 12}} >{dayAfterTomorrow.toString()}</Text></Text>
              <Spacer></Spacer>
              <Text style = {{color: 'red', fontSize: 12}} >*Transporter Details will be shared tomorrow.</Text>
              <Text style = {{color: 'red', fontSize: 14}}>**Slot Available:- <Text style = {{color: 'gray', fontSize: 12}} >{tomorrow.toString()}</Text> </Text>  
        </Card>
        
        

        <Button style={{alignSelf: "center", position: 'absolute', bottom: 40 }} onPress={() => book("pool")}>{`Pool Book Rs. ` + pooledPrice}</Button>
        <Modal
          visible={visible}
          backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
          <Card disabled={true} style = {{ minHeight: 300, minWidth: 300 }}>
          <Text category = "h4">Booking Successfull!!</Text>
          <Image source = {require('../assets/images/bookingSuccessful.gif')}/>
          <Button onPress={() => goToPayment()}>
            Pay Rs.
            <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color:'white'}}>  
              {price} </Text> {pooledPrice}
          </Button>
          </Card>
      </Modal>
    </Layout>
  );
}
const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='Quick Booking'/>
    <Tab title='Pooling Goods'/>
  </TabBar>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <TopTabBar {...props} />}>
    <Screen name='QuickBooking' component={QuickBookingScreen}/>  
    <Screen name='Pooling' component={PoolingScreen}/>
  </Navigator>
);

export default  FindTransporterScreen = ({navigation}) => {
    const {params} = navigation.state;
    origin = params.origin;
    dest = params.destination;
    distance = params.distance;
    load = params.load;
    weight = params.weight;
    date = params.date;
    return(
        <NavigationContainer>
          <Spacer/>
          <TabNavigator/>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
    maxHeight: 500,
    },
});