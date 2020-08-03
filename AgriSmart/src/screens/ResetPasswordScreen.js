import React,{useState} from 'react'
import { Button, Card, Modal} from '@ui-kitten/components';
import { View,TextInput ,StyleSheet,Dimensions} from "react-native";
import { Text } from "react-native-elements";
import Spacer from '../components/Spacer';
import { navigate } from '../navigationRef';
 const ResetPasswordScreen=() =>{
  const secureTextEntry = true;

    const [phoneno, setPhoneno] =useState("");
 
  
  const [newpassword, setNewPassword] = useState("");
  const [cnfnewpassword, setCnfNewPassword] = useState("");
const onSubmit=(phoneno,newpassword)=>{
// call API to update password and navigate

navigate('farmerFlow')
}
    return (
        <View>
          <Text>Reset Password</Text>
          <Spacer></Spacer>
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
             <Spacer></Spacer>
              
                <Spacer></Spacer>
                  <TextInput style={styles.input}
                    secureTextEntry={secureTextEntry}
                    lable="NewPassword"
                    placeholder="New Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={newpassword}
                    onChangeText={(newPassword) => setNewPassword(newPassword)}
                    placeholderTextColor={'rgba(255,255,255,1)'}
                    underlineColorAndroid='transparent'
            >
                </TextInput>
                <Spacer></Spacer>
            
                  <TextInput style={styles.input}
                    secureTextEntry={secureTextEntry}
                    lable="Password"
                    placeholder="Confirm New Password"r
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={cnfnewpassword}
                    onChangeText={(newPassword) => setCnfNewPassword(newPassword)}
                    placeholderTextColor={'rgba(255,255,255,1)'}
                    underlineColorAndroid='transparent'
            ></TextInput>
             <Spacer></Spacer>
            <Button
              disabled={phoneno && oldpassword && newpassword? false: true}
              onPress={() => onSubmit({ phoneno, newpassword })}
            >Change Password</Button>
             <Spacer></Spacer>
            
        </View>
    )
}

export default ResetPasswordScreen;


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
    marginHorizontal:25
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
