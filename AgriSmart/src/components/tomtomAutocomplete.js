/*
Simple integration of the TomTom Fuzzy Search API with the React Native Autocomplete Input Module
Adopted from MIT-licensed example code at https://github.com/l-urence/react-native-autocomplete-input/tree/master/example

The MIT License (MIT)
React Native Autocomplete Example Copyright (c) 2015 Laurence
Tomtom API Integration Copyright (c) 2018 Brendan Greenley  

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
*/

import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity,View, Button } from 'react-native';

const TOMTOM_API_KEY = 'xRKxItGb3D5FZQMYh7rTe1YwvKlEmkCZ';
var name = "";
export default class TomTomAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      placeQuery: '',
      currentLat: 22.2355,
      currentLon: 75.325348,
    };
  }

  onPressFn(name, lat, lon) {
    this.setState({placeQuery : name, places : []});
    this.props.notifyChange({"name": name, "lat": lat, "lon": lon });
  }

  componentDidMount() {}

  async findPlace(query, lat, lon, autocomplete, maxResults) {
    let apiUrl =
      'https://api.tomtom.com/search/2/search/' +
      encodeURIComponent(query) +
      '.JSON?key=' +
      TOMTOM_API_KEY +
      '&typeahead=' +
      autocomplete +
      '&limit=' +
      maxResults;
    if (lat && lon) {
      apiUrl += '&lat=' + lat + '&lon=' + lon + '&countrySet=IN';
    }
    console.log(apiUrl,lat,lon);
    let placeResults = await fetch(apiUrl)
      .then(resp => resp.json())
      .then(resp => {
        try {
          let results = resp.results;
          //console.log(results);
          let places = [];
          for (let val of results) {
            if ('poi' in val) {
              places.push({
                name: val.poi.name,
                address: val.address.freeformAddress,
                lat: val.position.lat,
                lon: val.position.lon,
              });
            } else {
              places.push({
                name: val.address.freeformAddress,
                address: val.address.freeformAddress,
                lat: val.position.lat,
                lon: val.position.lon,
              });
            }
          }
          //console.log(places);
          return places;
        } catch (error) {
          return [];
        }
      });
    this.setState({ places: placeResults });
  }

  render() {
    return (
      <View style = {{
        margin: 25,
        flex: 1, 
        flexDirection: 'row',
        position: 'absolute',
        top: this.props.position,
    }}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode={'always'}
          containerStyle={{
              width: 305,
          }}
          listContainerStyle = {{
            zIndex: 0,
            elevation: 3,
          }}
          data={this.state.places}
          defaultValue={this.state.placeQuery}
          onChangeText={text =>
            this.findPlace(
              text,
              this.state.currentLat,
              this.state.currentLon,
              true,
              5
            )
          }
          placeholder= {this.props.text}
          renderItem={
              ({ item }) => (
                    <TouchableOpacity onPress={() => this.onPressFn(item.name, item.lat, item.lon)}>
                    <Text style={styles.itemText}>
                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                        { '\n' + item.address}
                    </Text>
                    </TouchableOpacity>)
            }
        />
        <Button style = {{color: 'red', right: 20, position: 'absolute'}} onPress={() => this.setState({placeQuery : '', places : []})} title = "X">
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  itemText: {
    fontSize: 15,
    margin: 2,
  },
});

