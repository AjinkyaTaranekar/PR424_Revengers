import React, {Component} from 'react';
import { BackHandler, ToastAndroid, Linking, Platform, StyleSheet, AsyncStorage, Image, Alert} from 'react-native';
import {Text, Layout, Card,Divider, List, ListItem, Button, Modal} from '@ui-kitten/components';
import MapView, {Marker, Polyline} from 'react-native-maps';
import darkTheme from '../components/DarkMapTheme';
import Spacer from '../components/Spacer';
import getDirections from 'react-native-google-maps-directions';
import { Input } from 'react-native-elements';

var done=false;

class PoolingFarmerNavigationScreen extends Component {
    state = {
      otp: [],
      visible: false,
      phoneno: '',
      permanentOtp: [],
      originRoute: [],
      lastOrigin: {},
      lastDest: {},
      destRoute: [],
      originWayPoint: [],
      destWayPoint: [],
      distance: 0
    };

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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
      var originWayPoint = [], destWayPoint = [];
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
              originWayPoint.push({
                latitude: coordinates[i]["points"][0]["latitude"],
                longitude: coordinates[i]["points"][0]["longitude"],
              });
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
        console.log(originRoute)
        this.setState({...this.state,lastOrigin: last});      
        
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
              destWayPoint.push({
                latitude: coordinates[i]["points"][0]["latitude"],
                longitude: coordinates[i]["points"][0]["longitude"],
              });
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
        console.log("dest route", destRoute)
        this.setState({...this.state,lastDest: last});
        this.setState({...this.state,distance: distance});      
        this.setState({...this.state,originRoute: originRoute});
        this.setState({...this.state,destRoute: destRoute});      
        this.setState({...this.state,originWayPoint: originWayPoint});
        this.setState({...this.state,destWayPoint: destWayPoint});
    }
  }
    render() {
      
      const makeCallToFarmer = (phoneNumber) => {
        if (Platform.OS === 'android') 
          phoneNumber = 'tel:${'+phoneNumber+'}';
        else 
          phoneNumber = 'telprompt:${'+phoneNumber+'}';
        Linking.openURL(phoneNumber);
      };
      const {params} = this.props.navigation.state; 
      this.getCoordinates(params.driver['locations']['origin'], params.farmer)
      console.log(params.farmer)
      console.log(params.driver)
      
      const handlegetDirections = (origin,destination,waypoints) =>{
        // console.log(origin)
        // console.log(destination)
        const data = {
          source: {
           latitude  : origin['latitude'],
           longitude : origin['longitude']
          },
          destination: {
            latitude: destination['latitude'],
            longitude: destination['longitude']
          },
          params: [
            {
              key: "travelmode",
              value: "driving"        // may be "walking", "bicycling" or "transit" as well
            },
            {
              key: "dir_action",
              value: "navigate"       // this instantly initializes navigation using the given travel mode
            }
          ],
          waypoints: waypoints,
        }
        getDirections(data)
      }
  
      const getVerifcation = (otp,phoneno) =>{
        console.log("got",otp,phoneno)
        this.setState({...this.state,permanentOtp: [otp]});
        this.setState({...this.state,phoneno: [phoneno]});      
        this.setState({...this.state,visible: true});    
        console.log("here",this.state.permanentOtp,this.state.phoneno,this.state.visible)
      }

      const renderItemAccessory = (props) => (
        <Button  size='tiny'>Verify</Button>
      );

      const renderItemIcon = (props) => (
        <Image {...props} source={require("../assets/images/farmerIcon.png")} style = {{width: 25, height: 25, resizeMode: 'contain' }} />   
      );

      const renderItem = ({ item, index }) => (
        <ListItem
            title={`${index + 1}. ${item['name']}`}
            description = {`${item['contactDetails']['phoneno']}`}
            accessoryLeft={renderItemIcon}
            accessoryRight={renderItemAccessory}
            onPress={() => getVerifcation(item['contactDetails']['permanentOTP'], item['contactDetails']['phoneno'])}
        />
      );

      return (
        <Layout style={{flex: 1,justifyContent: 'center'}}>
            <MapView
              style = {{...StyleSheet.absoluteFillObject}}
              enableZoomControl={true}
              showsUserLocation = {true}
              zoomEnabled = {true}
              scrollEnabled = {false}
              showsMyLocationButton ={true}
              customMapStyle = {darkTheme}
              region = {{
                latitude: params.driver['locations']['origin']['latitude'],
                longitude: params.driver['locations']['origin']['longitude'],
                latitudeDelta: 0.09936,
                longitudeDelta: 0.03524
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
              <Polyline coordinates={this.state.originRoute} strokeColor="#00F" strokeWidth={2}/> 
              <Polyline coordinates={this.state.destRoute} strokeColor="#F00" strokeWidth={2}/> 
            </MapView>
            
            <Button style={{alignItems:"center",width: 175, position: 'absolute',bottom: 175, left: 5}} onPress={() => handlegetDirections(params.driver['locations']['origin'],this.state.lastOrigin,this.state.originWayPoint)}>
              Navigate To Farmers
            </Button>
            <Button style={{alignItems:"center",width: 150, position: 'absolute', bottom: 175, right: 5}} status = 'danger' onPress={() => handlegetDirections(this.state.lastOrigin,this.state.lastDest,this.state.originWayPoint)}>
              Navigate To Drop
            </Button>
            <Card style={{borderColor: 'grey', margin: 15, position: 'absolute',width:325, bottom: -10}}>
              <Text category='h6'>Pooled Farmer Details: - </Text>
              <List
                style={{maxHeight: 192}}
                data={params.farmer}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
                />
            </Card>
            <Modal
              visible={this.state.visible}
              backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
              <Card disabled={true} style = {{ minHeight: 192, minWidth: 200 }}>
                <Text h4>Enter 4 digit, given by farmer</Text>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Enter OTP"
                  value={this.state.otp}
                  keyboardType={'numeric'}
                  onChangeText={(newOtp) => this.setState({...this.state, otp: newOtp})}
                ></Input>
                <Button disabled={this.state.otp ? false: true} onPress={() => {this.state.permanentOtp[0] == this.state.otp ? ToastAndroid.show("Farmer Verified", ToastAndroid.SHORT): Alert.alert('Please Enter Correct OTP.')}}>
                  Verify and Sign Up
                </Button>
                <Spacer></Spacer>
                <Button style = {{ color: 'blue'}} onPress = {() => makeCallToFarmer(this.state.phoneno[0])}>{`📞 Call Farmer `+this.state.phoneno[0]}</Button>  
              </Card>
            </Modal>
        </Layout>
      );    
    }
}

export default PoolingFarmerNavigationScreen;
