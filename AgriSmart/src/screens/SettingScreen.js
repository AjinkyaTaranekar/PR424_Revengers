import React from 'react';
import { View, Text, StyleSheet , SectionList} from "react-native";
import DrawerButton from '../components/DrawerButton';
import { Divider } from 'react-native-paper';
const SettingScreen = ({navigation}) => {

  return (
    <View style = {styles.container}>
      <DrawerButton navigation = {navigation}/>
      <View style={{marginTop:80}}>
        
      <SectionList
          sections={[
            {title: 'Account', data: ['Edit Profile', 'Change Password', 'Change Mode']},
            {title: 'Others Settings', data: ['Activity', 'Push Notifications', 'Night Mode ', 'Theme', 'Sound', 'Language', 'Terms of Use', ]},
          ]}
        
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={Divider}
        />
        
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
   },
   sectionHeader: {
     padding: 10,
     fontSize: 20,
     fontWeight: 'bold',
     backgroundColor: '#f7f7f7',
     height:45
   },
   item: {
     padding: 10,
     fontSize: 16,
     height: 44,
     backgroundColor: '#f4f6ff',
   },
});

export default SettingScreen;
