import React, {useContext,useState} from 'react';
import { DrawerActions } from 'react-navigation-drawer';
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,TouchableOpacity
} from 'react-native'
import { Icon } from '@ui-kitten/components';

import {SafeAreaView} from 'react-navigation';
import {Context as AuthContext} from '../context/AuthContext';
import DrawerButton from '../components/DrawerButton';
const AccountScreen = ({navigation}) => {

  const [state, setstate] = useState({edit:true})
  const {updateUserProfile} = useContext(AuthContext)

  return (
    <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
      <View style={{flex:1}} >
      <DrawerButton navigation = {navigation}/>
      <View  style={{
            left: "auto",
            top:80,
            alignItems:"center",
            justifyContent:"center",
            paddingBottom:50,
            paddingTop:50
      }}>

     
      <TextInput
          style={styles.input}
          placeholder='Name'
          autoCapitalize="none"
          placeholderTextColor='#adad85'
          onChangeText={val => setstate({...state,name:val})}
          editable={state.edit}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='#adad85'
          onChangeText={val => setstate({...state,password:val})}
          editable={state.edit}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='#adad85'
          onChangeText={val => setstate({...state,email:val})}
          editable={state.edit}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='#adad85'
          onChangeText={val => setstate({...state,phoneno:val})}
          keyboardType={"number-pad"}
          editable={state.edit}
        />
        <TextInput
          style={styles.input}
          placeholder='Aadhar Number'
          autoCapitalize="none"
          placeholderTextColor='#adad85'
          onChangeText={val => setstate({...state,aadharno:val})}
          keyboardType={"number-pad"}
          editable={state.edit}
        />
            <View>
                <TouchableOpacity
                  onPress={()=>updateUserProfile({ phoneno:state.phoneno, password:state.password, email:state.email, aadharno:state.aadharno, name:state.name })}
                  style={styles.appSaveButtonContainer}
                  onPress={()=>updateUserProfile({ phoneno:state.phoneno, password:state.password, email:state.email, aadharno:state.aadharno, name:state.name })}
                  accessibilityLabel="Learn more about this purple button"
                >    
                  <Text style={styles.appButtonText}>Save Changes</Text>  
                </TouchableOpacity>
            </View>
            <View>    
                <TouchableOpacity
                  onPress={()=>setstate({...state,edit:true})}
                  style={styles.appEditButtonContainer}
                  onPress={()=>updateUserProfile({ phoneno:state.phoneno, password:state.password, email:state.email, aadharno:state.aadharno, name:state.name })}
                  accessibilityLabel="Learn more about this purple button"
                >    
                  <Text style={styles.appButtonText}>Edit</Text>  
                </TouchableOpacity>
            </View>
        </View>
  
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    backgroundColor: '#e6ffe6',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 10,
    fontSize: 18,
    fontWeight: '500',
    padding:10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appSaveButtonContainer: {
    elevation: 8,
    backgroundColor: "#5DADE2",
    borderRadius: 10,
    marginTop:100,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position:'absolute',
    left:10
  },
  appEditButtonContainer: {
    elevation: 8,
    backgroundColor: '#5DADE2',
    borderRadius: 10,
    marginTop:100,
    paddingVertical: 10,
    paddingHorizontal: 45,
    position:'absolute',
    right:10
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
  }
})

export default AccountScreen;
