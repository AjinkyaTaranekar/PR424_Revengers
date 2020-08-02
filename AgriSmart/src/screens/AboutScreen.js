import React from 'react';
import { View, Text, StyleSheet } from "react-native";

import {SafeAreaView} from 'react-navigation';


const HomeScreen = () => {

  return (
    <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
      <View>
          <Text>This is About Page</Text>

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

export default HomeScreen;
