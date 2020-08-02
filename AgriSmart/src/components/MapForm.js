import React from 'react';
import { View,Alert, StatusBar } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import TomTomAutoComplete from '../components/tomtomAutocomplete';
import Map from './MapComp';


async function requestLocationPermission(){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'AgriSmart',
          'message': 'AgriSmart want access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

var mode = -1;
var done =false;
class MapForm extends React.Component {
    state = {
        originRegion: {  
        },
        destRegion: {  
        },
        distance: 0,
        currentLat: 0,
        currentLong: 0,
        coordinates: []
    };
    
  
  componentDidMount() {
    this.initalState();
  }

  async initalState(){
    await requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        this.setState({...this.state,
            currentLat: position.coords.latitude,
            currentLong : position.coords.longitude,
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 500000,
        maximumAge: 0,
      },
    );

  }
    getOriginCoords(loc) {
      mode = 0;
      this.setState({ ...this.state,
          originRegion: {
              latitude: loc.lat,
              longitude: loc.lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }
      });
    }

    getDestCoords(loc) {
      mode = 1;
      this.setState({...this.state,
          destRegion: {
              latitude: loc.lat,
              longitude: loc.lon,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }
      });
    }

  onMapRegionChangeOrigin() {
    console.log("origin",this.state.originRegion);
    this.props.askedOriginLocation({"lat": this.state.originRegion.latitude, "lon": this.state.originRegion.longitude});
  }
  onMapRegionChangeDest() {
    console.log("dest",this.state.destRegion);
    this.getCoordinates();
    this.props.getDistance(this.state.distance);
    if (this.props.userMode == 'transporter')
      this.props.askedOriginLocation({"lat": this.state.currentLat, "lon": this.state.currentLong});
    this.props.askedDestLocation({"lat": this.state.destRegion.latitude, "lon": this.state.destRegion.longitude});
  }
  async getCoordinates(){
    var originLat = this.props.userMode == 'farmer' ? this.state.originRegion.latitude : this.state.currentLat;
    var originLong = this.props.userMode == 'farmer' ? this.state.originRegion.longitude : this.state.currentLong;
    let apiUrl =
      'https://api.tomtom.com/routing/1/calculateRoute/' +
       + originLat +',' + originLong + ':'+
       this.state.destRegion.latitude +',' +
       this.state.destRegion.longitude + 
      '/json?key=xRKxItGb3D5FZQMYh7rTe1YwvKlEmkCZ';
    
    if (!done && (Object.keys(this.state.originRegion).length !== 0 || this.state.currentLat && this.state.currentLong)&& Object.keys(this.state.destRegion).length !== 0){
      done = true;
      console.log("called api",apiUrl);
      let route = await fetch(apiUrl)
      .then(resp => resp.json())
      .then(resp => {
        try {
          let coordinates = resp["routes"][0]["legs"][0]["points"];
          console.log(resp['routes'][0]['summary']['lengthInMeters']);
          
          this.setState({...this.state,distance: resp['routes'][0]['summary']['lengthInMeters']});
          let coord = [];
          for (let val of coordinates){
            coord.push({
              latitude: val["latitude"],
              longitude: val["longitude"],
            })
          }
          return coord;
        } catch (error) {
          
          return [];
        }
      });
      this.setState({...this.state,coordinates: route});
  }
}
    render() {
        return (
            <View style={{flex:2}}>
                <StatusBar backgroundColor="rgba(1.0, 0, 0, 0.2)" translucent />     
                {
                    this.state.currentLat && this.state.currentLong  ?
                    <Map
                        region={Object.keys(this.state.originRegion).length === 0 && Object.keys(this.state.destRegion).length === 0 ?
                                 {latitude: this.state.currentLat, longitude: this.state.currentLong, latitudeDelta: 0.0922,longitudeDelta: 0.0421}
                                 :( Object.keys(this.state.originRegion).length !== 0 ? this.state.originRegion : Object.keys(this.state.destRegion).length !== 0 ? this.state.destRegion: {latitude: this.state.currentLat, longitude: this.state.currentLong, latitudeDelta: 0.0922,longitudeDelta: 0.0421})}
                        onRegionChange={(reg) => mode == 0 ? this.onMapRegionChangeOrigin() : this.onMapRegionChangeDest() } 
                        mode={this.props.userMode}
                        currentLat = {this.state.currentLat}
                        currentLong = {this.state.currentLong}
                        coordinates = {this.state.coordinates}
                        origin = {this.props.userMode == 'farmer' ? this.state.originRegion: {latitude: this.state.currentLat, longitude: this.state.currentLong, latitudeDelta: 0.0922,longitudeDelta: 0.0421}}
                        dest = {this.state.destRegion}
                    />: null}
              { this.props.userMode == 'farmer' ? 
                  <TomTomAutoComplete position={75} currentLat = {this.state.currentLat} currentLong = {this.state.currentLong} text={`📌   Enter Pickup Location`} notifyChange={(loc) => this.getOriginCoords(loc)}/>:null}  
                <TomTomAutoComplete position={150} currentLat = {this.state.currentLat} currentLong = {this.state.currentLong} text={`📌   Enter Drop Location`} notifyChange={(loc) => this.getDestCoords(loc)}/>  
          </View>    
        );
    }
}

export default MapForm;