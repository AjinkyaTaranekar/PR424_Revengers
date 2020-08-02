import React ,{useState}from 'react';
import { StyleSheet,SafeAreaView,TouchableOpacity,View,Dimensions,TextInput,Linking} from "react-native";
import { Text, TopNavigation,Divider, Card ,Button} from '@ui-kitten/components';
import Spacer from '../components/Spacer';
import getDirections from 'react-native-google-maps-directions';

const {height, width} = Dimensions.get('window');
var otpVerify = NaN;
const handlegetDirections = (origin,destination) =>{
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
  }
  getDirections(data)
}

const verifyOtp = (farmer) =>{
  
  // console.log("Ritik "+otpVerify,+" "+farmer["contactDetails"]["permanentOTP"])
  if (farmer["contactDetails"]["permanentOTP"] == otpVerify)
    return true;
  return false;
  // hidden=true
}
const makeCallToFamer = (phoneNumber) => {
  if (Platform.OS === 'android') 
    phoneNumber = 'tel:${'+phoneNumber+'}';
  else 
    phoneNumber = 'telprompt:${'+phoneNumber+'}';
  Linking.openURL(phoneNumber);
};

// add a card showing farmer details like name, contact and so on, access them using farmer variable, schema available in bookingService.js
const NavigateToFarmerScreen = ({navigation}) => {
  const [hidden,toggleHidden] = useState(false)
  // console.log(hidden)
  const {params} = navigation.state;
  const driver = params.driver;
  const farmer = params.farmerAvailable;
  // console.log("params ",params)
  // console.log("driver is ",driver)
  // console.log("farmer is ",farmer)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spacer></Spacer>
      <TopNavigation title= "Navigation" alignment='center'/>
      <Divider/>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handlegetDirections(driver[0]['locations']['origin'],farmer['locations']['origin'])} style={styles.button}>
          <Text style={styles.buttonText}>Get Directions To farmer</Text>
        </TouchableOpacity>
        {
                hidden?
                <TouchableOpacity  onPress={() => handlegetDirections(farmer['locations']['origin'],farmer['locations']['destination'])} style={styles.button}>
                  <Text style={styles.buttonText}>Get Directions To destination</Text>
                </TouchableOpacity>
                :
                null
        }
            <Card style={styles.cardStyle}>
              <Text category='h6'>Farmer Details: - </Text>
              <Text style = {{color: 'red', fontSize: 18,alignItems:"center"}} >Name ---{">"} <Text style = {{color: 'red', fontSize: 22}} >{farmer['name']}</Text></Text>
              <Text style = {{color: 'red', fontSize: 18,alignItems:"center"}} >GrainType ---{">"} <Text style = {{color: 'red', fontSize: 22}} >{farmer['shippingDetails']['grainType']}</Text></Text>
              <Button style = {{ color: 'blue'}} onPress = {() => makeCallToFamer(farmer['contactDetails']['phoneno'])}>{`📞 Call Farmer `+farmer['contactDetails']['phoneno']}</Button>
              <Spacer></Spacer>
            </Card>
          <View style={styles.verify}>
            <TextInput
              style={styles.inputBox}
              onChangeText={(otp)=>{
                otpVerify = otp 
              }}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Enter OTP"
              selectionColor="#fff"
              keyboardType="numeric"      
            />
            <TouchableOpacity style={styles.button} onPress={()=>{
              if(verifyOtp(farmer) === true){
                toggleHidden(true)
              }else{
                alert('Please Enter The correct otp')
              }
            }}>
            <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
      </View>
     </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardStyle:{
    borderColor:'grey',
    position:"relative"

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    position:"absolute",
    top:height/5,
    left:width/10
  },
  button:{
    width:300,
    backgroundColor:'#4f83cc',
    borderRadius:25,
    marginVertical:10,
    paddingVertical:12
  },
  buttonText:{
      fontSize:16,
      fontWeight:'500',
      color:"#ffffff",
      textAlign:'center'
  },
  inputBox:{
    width: 300,
    backgroundColor:"grey",
    borderRadius:25,
    paddingHorizontal:16,
    fontSize:16,
    color:"blue",
    
  },
  verify:{
    marginVertical:height/3,
    marginBottom:20,
    position:"relative",
    bottom:height/5
  }
});

export default NavigateToFarmerScreen;
