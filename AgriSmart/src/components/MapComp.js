import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import darkTheme from './DarkMapTheme';
import retroMapTheme from './RetroMapTheme';
import { useTheme } from '@ui-kitten/components';
import booking from '../services/BookingService';


export default class Map extends React.Component {
  
  render() {
    const theme = 'light';
    return (
      <View style={{flex: 1}}>
        <MapView
          style={styles.map}
          enableZoomControl={true}
          showsUserLocation = {true}
          zoomEnabled = {true}
          scrollEnabled = {false}
          showsMyLocationButton ={true}
          customMapStyle = {theme != 'light' ? darkTheme : retroMapTheme} 
          region = {this.props.region}
          onRegionChangeComplete={this.props.onRegionChange}
          >
          
          <Marker
            coordinate={{
              latitude: this.props.currentLat,
              longitude: this.props.currentLong,
            }}>
              <Image source={this.props.mode == 'farmer' ? require("../assets/images/farmerMarker.png") : require("../assets/images/transporterMarker.png")} />
            </Marker>
              { Object.keys(this.props.origin).length !== 0 ?
                <Marker
                coordinate={{
                  latitude: this.props.origin.latitude,
                  longitude: this.props.origin.longitude,
                }}
                pinColor = '#256336'
                >
                </Marker> : null}
              { Object.keys(this.props.dest).length !== 0 ?
                <Marker
                  coordinate={{
                    latitude: this.props.dest.latitude,
                    longitude: this.props.dest.longitude,
                  }}>
                </Marker>: null}
                {booking.getNearby({"latitude": this.props.region.latitude, "longitude": this.props.region.longitude}, this.props.mode).map((marker, index) => (
                    <Marker
                        key = {index}
                        coordinate = {{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                    >
                    <Image source={this.props.mode != 'farmer' ? require("../assets/images/farmerIcon.png") : require("../assets/images/truckIcon.png")} style = {{flex: 1, width: 25, height: 25, resizeMode: 'contain' }} />   
                    </Marker>
                  ))
                }
            <Polyline coordinates={this.props.coordinates} strokeColor="#00F" strokeWidth={3}/> 
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});