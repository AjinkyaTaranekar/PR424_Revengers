import React from 'react';
import { View, Text, StyleSheet ,Dimensions} from "react-native";
import DrawerButton from '../components/DrawerButton';
import Spacer from '../components/Spacer';


const ContactUsScreen = ({navigation}) => {

  return (

    <View>
        <DrawerButton navigation = {navigation}/> 
        <View style = {styles.container}>
           <Text>Owner : Ajinkya Taranekar</Text> 
           <Spacer></Spacer>

           <Text>email : ajinkyaTaranekar@gmail.com</Text> 
           <Spacer></Spacer>

           <Text>Contact Number : 8839434083</Text> 
          <Spacer></Spacer>
          <Text>For Any Inquiries Contact email : ritiknandawl021@gmail.com</Text>
        </View>
    </View>
   
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    marginTop:windowWidth/2
  },
  textStyle:{
    
  }
});

export default ContactUsScreen;
