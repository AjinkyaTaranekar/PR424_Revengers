import React, { useContext } from "react";
import { View, StyleSheet ,Text,ImageBackground,Image,Dimensions,TextInput} from "react-native";
import NavLink from "../components/NavLink";
import AuthForm from "../components/AuthForm";
import { Context } from "../context/AuthContext";

// import bgImage from '../assets/images/Khet.jpg'
const SigninScreen = () => {
  const { state, signin } = useContext(Context);
  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In AgriSmart"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      ></AuthForm>
      <NavLink
      
        text=" Dont have a account ? SignUp Instead"
        routeName="Signup"
      ></NavLink>
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};


const styles = StyleSheet.create({
  
  container:{
    flex:1,
    justifyContent:"center"
  }

});
export default SigninScreen;
