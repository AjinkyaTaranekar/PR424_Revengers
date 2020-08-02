import {createDrawerNavigator} from 'react-navigation-drawer';
import FarmerHomeScreen from '../screens/FarmerHomeScreen'
import Help from '../screens/Help'
import InviteAFriend from '../screens/InviteAFriend'
import  PreviousRideTrip from '../screens/PreviousRideTrip'
import SettingScreen from '../screens/SettingScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import React,{useContext} from 'react'
import { Text,View, Image,Button ,StyleSheet,TouchableOpacity, AsyncStorage} from 'react-native';
import {  SafeAreaView } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import { Context } from "../context/AuthContext";
import Spacer from '../components/Spacer';
import { navigate } from '../navigationRef';
import TransporterHomeScreen from '../screens/TransporterHomeScreen';
import AccountScreen from '../screens/AccountScreen';
import ResolveVerificationDetailsScreen from '../screens/ResolveVerificationDetails';
var mode = 'farmer';
const getMode = async () => {
  try {
    mode = await AsyncStorage.getItem("mode");
    console.log(mode);
    return mode;
  } catch (error) {
    return "error";
  }
};

const DrawerNavigation = createDrawerNavigator(
    {
    
        "👨‍🌾   Farmer Home": FarmerHomeScreen,
        "🚚   Transporter Home": TransporterHomeScreen,
        "👨   Account":AccountScreen,
        "📜   Previous Rides":PreviousRideTrip,
        "⚙️   Setting":SettingScreen,
        "📲   Invite":InviteAFriend,
        "📞   Contact" :ContactUsScreen,
        "🆘   Help":Help
    },
    {
      initialRouteName: mode == 'farmer' ? "👨‍🌾   Farmer Home" : "🚚   Transporter Home",
      contentComponent:(props) => {
        const {signout}=useContext(Context);
        
      return(

          <View style={{flex:1, align: "center"}}>
              <SafeAreaView forceInset={{ horizontal: 'never' }}>
                <Spacer></Spacer>
                <Image 
                  source={require('../assets/images/farmer.png')}  
                  style={{width: 70, height: 70, borderRadius: 70/ 2, alignSelf: "center"}} 
                />
                <Text style={styles.titleText} >Namaste  🙏  </Text>
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