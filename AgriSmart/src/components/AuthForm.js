import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "./Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = new useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <Spacer>
        <Text h4>{headerText}</Text>
      </Spacer>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        lable="Email"
        placeholder="Email"
        value={email}
        onChangeText={(newEmail) => setEmail(newEmail)}
      ></Input>
      <Spacer></Spacer>
      <Input
        secureTextEntry
        lable="Password"
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)}
      ></Input>

      <Spacer>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        ></Button>
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginHorizontal: 15,
    marginVertical: 5,
  },
});

export default AuthForm;

/*

*/
