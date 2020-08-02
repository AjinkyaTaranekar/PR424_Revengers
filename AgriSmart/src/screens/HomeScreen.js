import React, {useContext} from 'react';
import { View, Text, StyleSheet } from "react-native";
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {Context as AuthContext} from '../context/AuthContext';
import MapView from 'react-native-maps';
const HomeScreen = () => {
  return (
    <View style = {{flex: 1}}>
      <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
        enableZoomControl={true}
        showsUserLocation = {true}
        zoomEnabled = {true}
        scrollEnabled = {true}
        showsMyLocationButton ={true}
        
        initialRegion={{
          latitude: 22.78825,
          longitude: 75.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 100,
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
