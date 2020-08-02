import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import DrawerButton from '../components/DrawerButton';
import { Divider, List, ListItem } from '@ui-kitten/components';


const data = new Array(8).fill({
  title: 'Trip',
  description: 'Description of Trip',
});


const PreviousRideTripScreen = ({navigation}) => {

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
    />
  );

  return (
    <View style= {styles.container}>
      <DrawerButton navigation = {navigation}/>
     

      <List
      style={styles.list}
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center"
  
  },
  list:{
    marginTop:100
    
    
  }
});

export default PreviousRideTripScreen;
