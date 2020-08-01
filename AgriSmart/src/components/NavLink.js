import React, { useContext } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Spacer from "./Spacer";

import { withNavigation } from "react-navigation";
import { Context } from "../context/AuthContext";

const NavLink = ({ navigation, text, routeName }) => {
  const {  clearErrorMessage } = useContext(Context);
  return (
    <TouchableOpacity
      onPress={() => {
        clearErrorMessage();
        return navigation.navigate(routeName);
      }}
    >
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
});

export default withNavigation(NavLink);
