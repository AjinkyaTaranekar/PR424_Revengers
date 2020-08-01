import React, {useContext} from 'react';
import { View, Text, StyleSheet } from "react-native";
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {Context as AuthContext} from '../context/AuthContext';
const AccountScreen = () => {
  const {signout} = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
      <View>
        <Button title="Sign out" onPress={signout} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 100,
    flex: 1,
    justifyContent: 'center',
  },
});

export default AccountScreen;
