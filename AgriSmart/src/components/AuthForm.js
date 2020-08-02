 
import React, { useState, useContext} from "react";
import { View,TextInput ,StyleSheet, Image, Alert ,Dimensions,ImageBackground,TouchableOpacity} from "react-native";
import { Text, Input } from "react-native-elements";
import Spacer from "./Spacer";
import { Button, Card, Modal,} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import Icon from 'react-native-vector-icons/MaterialIcons'
const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [phoneno, setPhoneno] = new useState("");
  const [otp, setOtp] = new useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [generatedOTP, setGeneratedOTP] = new useState(Math.floor(1000 + Math.random() * 9000));
  const [forgetPasswd,setNewPassword] = React.useState(false)

  const generatedAOTP = () => {
    setVisible(true);
    console.log(typeof(generatedOTP),generatedOTP);
    var xhr = new XMLHttpRequest();
    const apiKey = 'x1bmoITST5M-JtdVgVvjZqdkgcMe7C8UPdi4X7ofW1'
    xhr.open('GET', `https://api.textlocal.in/send/?apikey=${apiKey}&numbers=91${phoneno}&message=Your+AgriSmart+verification+code+is+${generatedOTP}&sender=TXTLCL`, true); 
    xhr.send();
    var response = xhr.responseText;
    console.log("responser",response);
  };  

  const signUp = (phoneno,password) => {
    setVisible(false);
    onSubmit({ phoneno, password });
  };
  const changePassword = (phoneno,password)=>{
    setNewPassword(false);
    // Tobe defined later
    onSubmit();
  }
  const secureTextEntry = true;
  return (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.backgroundContainer}>
           <View style={styles.logoContainer}>
              <Image source={require('../assets/images/appIcon.jpeg')} style={styles.logo}/>
            <Text style={styles.logoText}>{headerText}</Text>
           </View>
          <View style={styles.inputContainer}>
            <Icon name='account-circle' size={32} style={styles.inputIcon}/>
            <TextInput style={styles.input}
              autoCapitalize="none"
              autoCompleteType="off"
              lable="Enter Mobile Number"
              placeholder="Mobile Number"
              value={phoneno}
              onChangeText={(newPhoneno) => setPhoneno(newPhoneno)}
              keyboardType="numeric"
              placeholderTextColor={'rgba(255,255,255,1)'}
              underlineColorAndroid='transparent'
            />
          </View>
          <Spacer></Spacer>
          <View style={styles.inputContainer}>
            <Icon name='lock' size={32}  style={styles.inputIcon}/>
            <TextInput style={styles.input}
                    secureTextEntry={secureTextEntry}
                    lable="Password"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={(newOtp) => setOtp(newOtp)}
                    placeholderTextColor={'rgba(255,255,255,1)'}
                    underlineColorAndroid='transparent'
            >
              
            </TextInput>
          </View>
          <View>
          {headerText === "Sign In AgriSmart" ?<TouchableOpacity onPress={()=>{
            setNewPassword(true)
          }}>
              <Text style={styles.forgotPassword}>
                Forgot Password
              </Text>
            </TouchableOpacity>:null}
            <Modal
              visible={forgetPasswd}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)}>
              <Card disabled={true}>
                <TextInput  style={styles.input}
                  secureTextEntry={secureTextEntry}
                  lable="Enter OTP"
                  placeholder="Enter OTP"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={otp}
                  onChangeText={(newOtp) => setOtp(newOtp)}
                  placeholderTextColor={'rgba(255,255,255,1)'}
                  underlineColorAndroid='transparent'
                ></TextInput>
                <Spacer/>
                {/* <Button disabled={otp ? false: true} onPress={() => {generatedOTP.toString() == otp ? changePassword(phoneno,password): Alert.alert('Please Enter Correct OTP.')}}>
                  Verify OTP
                </Button> */}
              </Card>
            </Modal>
          </View>
            
          <Spacer>
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <Button
              disabled={phoneno && password ? false: true}
              onPress={submitButtonText == 'Sign In' ? () => onSubmit({ phoneno, password }): generatedAOTP}
            >{submitButtonText}</Button>
            <Modal
              visible={visible}
              backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
              onBackdropPress={() => setVisible(false)}>
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
          </Spacer>
      </ImageBackground>
  );
};

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
  icon: {
    width: 32,
    height: 32,
    position:'absolute',
    top:windowHeight/100,
    left:windowWidth/40
  },
  inputIcon:{
    position:'absolute',
    top:windowHeight/100,
    left:windowWidth/40
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
  
  inputContainer:{
    marginTop:10,
    flexDirection:'row',
    color: 'white'
  },
  forgotPassword:{
    color:"white",
    margin:5,
    fontSize:16,
    fontWeight:"bold"
  }
});

export default AuthForm;