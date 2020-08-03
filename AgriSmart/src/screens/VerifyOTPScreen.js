import React ,{useState} from 'react'
import { View, StyleSheet ,ImageBackground,Image,Dimensions,TextInput} from "react-native";
import { Button, Card, Modal} from '@ui-kitten/components';
import { Text, Input } from "react-native-elements";
const  VerifyOTPScreen=()=> {
    const [otp, setOtp] = new useState("");
    return (
        <View>
           <Modal
              
              backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
              onBackdropPress={() => setVisible(true)}>
              <Card disabled={true} style = {{ minHeight: 192, minWidth: 200 }}>
                <Text h4>Enter 4 digit code sent to you</Text>
                <Input
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Enter OTP"
                  value={otp}
                  keyboardType={'numeric'}
                  onChangeText={(newOtp) => setOtp(newOtp)}
                ></Input>
                <Button disabled={otp ? false: true} onPress={() => {generatedOTP.toString() == otp ? signUp(phoneno,password): Alert.alert('Please Enter Correct OTP.')}}>
                  Verify and Sign Up
                </Button>
              </Card>
            </Modal>   
        </View>
    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log(windowHeight,windowWidth)
const styles = StyleSheet.create({
  backgroundContainer:{
    flex:1,
    width:windowWidth,
    height:windowHeight,
    justifyContent:"center",
    alignItems:"center",
    opacity:0.8
  },
  
  logoContainer:{
    alignItems:"center",
    marginBottom:70
  },
  logo:{
    width:0.15*windowHeight,
    height:0.15*windowHeight,
    borderRadius:0.075*windowHeight,
    marginBottom:10,
    opacity:1,
  },
  logoText:{
    color:'indigo',
    fontSize:25,
    fontWeight:'bold',
    marginTop:1,
    opacity:0.9,
    fontFamily:'Roboto'
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginHorizontal: 15,
    marginVertical: 5,
  },
  input:{
    width:windowWidth-55,
    height:45,
    borderRadius:25,
    fontSize:16,
    paddingLeft:45,
    backgroundColor:'rgba(0,0,0,0.45)',
    // marginHorizontal:25
  },
  icon:{
    width:windowWidth-55,
    height:45,
  },
  inputContainer:{
    marginTop:10,
    flexDirection:'row',
    color: 'white'
  },
  inputIcon:{
    position:'absolute',
    top:windowHeight/100,
    left:windowWidth/40
  },
  // btnEye:{
  //   position:"absolute",
  //   top:windowHeight/100,
  //   right:windowWidth/40
  // }
});


export default VerifyOTPScreen
