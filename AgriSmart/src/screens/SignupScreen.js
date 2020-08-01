import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="SignUp for AgriSmart "
        errorMessage={state.errorMessage}
        onSubmit={({ phoneno, password }) => signup({ phoneno, password })}
        submitButtonText="Get OTP"
      ></AuthForm>
      <Spacer></Spacer>

      <NavLink
        text="Already have a account Sign in instead"
        routeName="Signin"
      ></NavLink>
    </View>
  );
};
SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginHorizontal: 15,
    marginVertical: 5,
  },
  container: {
    justifyContent: "center",
    flex: 1
  },
});
export default SignupScreen;
