import {createDrawerNavigator} from 'react-navigation-drawer';
import React,{useContext} from 'react'
import {  SafeAreaView } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import { Context } from "../context/AuthContext";
import Spacer from '../components/Spacer';
import { navigate } from '../navigationRef';
import TransporterHomeScreen from '../screens/TransporterHomeScreen';
import FarmerHomeScreen from '../screens/FarmerHomeScreen';
import { Text,View, Image,Button ,StyleSheet,TouchableOpacity, AsyncStorage} from 'react-native';

const DrawerNavigation = createDrawerNavigator(
    {
        "Farmer Home": FarmerHomeScreen,
        "Transporter Home": TransporterHomeScreen,
    },
    {
      initialRouteName: "Farmer Home",
      contentComponent:(props) => {
        const {signout}=useContext(Context);
        
      return(

          <View style={{flex:1, align: "center"}}>
              <SafeAreaView forceInset={{ horizontal: 'never' }}>
                <Spacer></Spacer>
                <DrawerItems {...props} />
                <TouchableOpacity style={styles.button} onPress={()=>{signout()}}><Text style={styles.buttonText} >Logout</Text></TouchableOpacity>
              </SafeAreaView>
          </View>
        )
      },
     
      contentOptions: {
        activeTintColor: "red"
      }
    }
  );

  const styles=StyleSheet.create({
    titleText:{
      fontSize:20,// change to 20 again 
      textAlign:"center",
      fontWeight:"bold",
      fontFamily:"Cochin"
    },
    button:{
      width:150,
      left:60,
      backgroundColor:'red',
      borderRadius:25,
      marginVertical:8,
      paddingVertical:8,
      elevation: 6
    },
    buttonText:{
        fontSize:14,
        fontWeight:'500',
        color:"#ffffff",
        textAlign:'center'
    },
  })

  export default DrawerNavigation