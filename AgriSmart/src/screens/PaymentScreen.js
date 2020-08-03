import React, {Component} from 'react';
import { BackHandler, ToastAndroid, Linking, Platform, StyleSheet, AsyncStorage, Image} from 'react-native';
import {Text, Layout, Card, Button, Modal} from '@ui-kitten/components';
import MapView, {Marker, Polyline} from 'react-native-maps';
import retroMapTheme from '../components/RetroMapTheme';
import Spacer from '../components/Spacer';

var done=false;
      
class PaymentScreen extends Component {
    state = {
      otp: '',
      coordinates: [],
      distance: 0
    };

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        const otp = await AsyncStorage.getItem('permanentOTP');
        this.setState({otp: otp});
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        ToastAndroid.show('Booking Done, can\'t go back...', ToastAndroid.SHORT);
        return true;
    }
    async getCoordinates(driver,farmer){
      let originFarm = '', destFarm = '';
      for( let f of farmer){
        originFarm+=':'+ f['locations']['origin']['latitude'] +',' + f['locations']['origin']['longitude'] 
        destFarm+=':'+ f['locations']['destination']['latitude'] +',' + f['locations']['destination']['longitude'] 
      }
      
      let originApiUrl =
        'https://api.tomtom.com/routing/1/calculateRoute/' +
         + driver['latitude'] +',' + driver['longitude'] + originFarm +
        '/json?key=GDmNUPAsOc3i4OPn4PAjRSzTlVplJUo5&computeBestOrder=true';
      var last = {}
      var distance = 0;
      console.log(originApiUrl)
      if (!done){
        done = true;
        console.log("called api",originApiUrl);
        let originRoute = await fetch(originApiUrl)
        .then(resp => resp.json())
        .then(resp => {
          try {
            let coordinates = resp["routes"][0]["legs"];  
            let coord = [];
            for( var i = 0; i<coordinates.length; i++){
              for (let val of coordinates[i]["points"]){
                coord.push({
                  latitude: val["latitude"],
                  longitude: val["longitude"],
                })
                last = {
                  latitude: val["latitude"],
                  longitude: val["longitude"],  
                }
              }
            }
            return coord;
          } catch (error) {
            return [];
          }
        });
        let destApiUrl =
        'https://api.tomtom.com/routing/1/calculateRoute/' +
         + last['latitude'] +',' + last['longitude'] + destFarm + 
        '/json?key=GDmNUPAsOc3i4OPn4PAjRSzTlVplJUo5&computeBestOrder=true';
        
        console.log("called api",destApiUrl);
        
        let destRoute = await fetch(destApiUrl)
        .then(resp => resp.json())
        .then(resp => {
          try {
            let coordinates = resp["routes"][0]["legs"];  
            let coord = [];
            for( var i = 0; i<coordinates.length; i++){
              for (let val of coordinates[i]["points"]){
                coord.push({
                  latitude: val["latitude"],
                  longitude: val["longitude"],
                })
                last = {
                  latitude: val["latitude"],
                  longitude: val["longitude"],  
                }
              }
            }
            distance+=resp['routes'][0]['summary']['lengthInMeters']
            return coord;
          } catch (error) {
            
            return [];
          }
        });
        let route = originRoute.concat(destRoute);
        this.setState({...this.state,distance: distance});      
        this.setState({...this.state,coordinates: route});
    }
  }
    render() {
      const makeCallToDriver = (phoneNumber) => {
        if (Platform.OS === 'android') 
          phoneNumber = 'tel:${'+phoneNumber+'}';
        else 
          phoneNumber = 'telprompt:${'+phoneNumber+'}';
        Linking.openURL(phoneNumber);
      };
      const {params} = this.props.navigation.state; 
      this.getCoordinates(params.driver['locations']['origin'], params.farmer)
      const date = new Date();
      const tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      var visible = true
      const setVisible = (bit) => (
        visible = bit
      )
      return (
        <Layout style={{flex: 1,justifyContent: 'center'}}>
            {
              (params.mode == 'pool' && +params.date <= +tomorrow )?(
                <Modal
                  visible={visible}
                  backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)',}}
                  onBackdropPress={() => setVisible(false)}>
                  <Card disabled={true}>
                    <Text>Slot will be available on following date </Text>
                    <Text style={{color: 'red', fontWeight: "bold"}}>{date.toString()}</Text>
                    <Text>Stay Tuned!!</Text>
                    <Button onPress={() => setVisible(false)}>
                      DISMISS
                    </Button>
                  </Card>
                  </Modal>
              ): null
            }
            <MapView
              style = {{...StyleSheet.absoluteFillObject}}
              enableZoomControl={true}
              showsUserLocation = {true}
              zoomEnabled = {true}
              scrollEnabled = {false}
              showsMyLocationButton ={true}
              customMapStyle = {retroMapTheme}
              region = {{
                latitude: params.driver['locations']['origin']['latitude'],
                longitude: params.driver['locations']['origin']['longitude'],
                latitudeDelta: 0.09536,
                longitudeDelta: 0.03024
              }}
            >
              <Marker
                  coordinate = {{
                      latitude: params.driver['locations']['origin']['latitude'],
                      longitude: params.driver['locations']['origin']['longitude']
                  }}
              >
              <Image source={require("../assets/images/truckIcon.png")} style = {{flex: 1, width: 50, height: 50, resizeMode: 'contain' }} />   
              </Marker>
              {params.farmer.map((marker, index) => (
                    <Marker
                        key = {index}
                        coordinate = {{
                            latitude: marker['locations']['origin']['latitude'],
                            longitude: marker['locations']['origin']['longitude']
                        }}
                    >
                    <Image source={require("../assets/images/farmerIcon.png")} style = {{flex: 1, width: 25, height: 25, resizeMode: 'contain' }} />   
                    </Marker>
                  ))
              }
              {params.farmer.map((marker, index) => (
                    <Marker
                        key = {index}
                        coordinate = {{
                            latitude: marker['locations']['destination']['latitude'],
                            longitude: marker['locations']['destination']['longitude']
                        }}
                    >
                    </Marker>
                  ))
              }
              <Polyline coordinates={this.state.coordinates} strokeColor="#00F" strokeWidth={3}/> 
            </MapView>

            <Card style={{borderColor: 'grey', margin: 20, position: 'absolute',width:315, bottom: -10}}>
              <Text category='h6'>Driver Details: - </Text>
              <Text style = {{color: 'red', fontSize: 18}} >Name ---{">"} <Text style = {{color: 'red', fontSize: 22}} >{params.driver['name']}</Text></Text>
              <Text style = {{ fontSize: 18}} >Pay Rs. <Text style = {{color: 'blue' , fontSize: 16}} >{params.price}</Text></Text>      
              <Spacer></Spacer>
              <Button style = {{ color: 'blue'}} onPress = {() => makeCallToDriver(params.driver['contactDetails']['phoneno'])}>{`📞 Call Transporter `+params.driver['contactDetails']['phoneno']}</Button>
              <Spacer></Spacer>
              <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style = {{ fontSize: 14}}>Tell the OTP to the {`\n`} transporter, when arrived.</Text>
                <Text category='h4' style = {{color: 'red', fontWeight: 'bold'}}>{this.state.otp? this.state.otp : '007'}</Text>  
              </Layout>
            </Card>
        </Layout>
      );    
    }
}

export default PaymentScreen;