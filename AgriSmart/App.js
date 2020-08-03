import React from 'react';
import Application from './src/routes/mainRoute'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, AsyncStorage } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './src/theme-context';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator} from './src/navigationRef';
import { Component, Fragment } from 'react';
import firebase from 'react-native-firebase';

class App extends Component<Props> {
  state = {
    theme : 'light'
  }
  getToken = async () => {
    // let fcmToken = await AsyncStorage.getItem('fcmToken');
    let fcmToken = false;

    console.log('fcmtoken',fcmToken)
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('fcmtoken',fcmToken)
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  };

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    console.log("permission",enabled)
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  };

  createNotificationListeners = () => {
    this.onUnsubscribeNotificaitonListener = firebase
      .notifications()
      .onNotification(notification => {
        notification.android.setChannelId('test-channel');
        firebase.notifications().displayNotification(notification);
      });
  };

  removeNotificationListeners = () => {
    this.onUnsubscribeNotificaitonListener();
  };

  componentDidMount() {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
    .setDescription('My apps test channel');

    // Create the channel{"_android": {"_actions": [], "_autoCancel": undefined, "_badgeIconType": undefined, "_bigPicture": undefined, "_bigText": undefined, "_category": undefined, "_channelId": undefined, "_clickAction": undefined, "_color": undefined, "_colorized": undefined, "_contentInfo": undefined, "_defaults": undefined, "_group": "campaign_collapse_key_8654936965679127399", "_groupAlertBehaviour": undefined, "_groupSummary": undefined, "_largeIcon": undefined, "_lights": undefined, "_localOnly": undefined, "_notification": [Circular], "_number": undefined, "_ongoing": undefined, "_onlyAlertOnce": undefined, "_people": [], "_priority": undefined, "_progress": undefined, "_remoteInputHistory": undefined, "_shortcutId": undefined, "_showWhen": undefined, "_smallIcon": {"icon": "ic_launcher"}, "_sortKey": undefined, "_tag": "campaign_collapse_key_8654936965679127399", "_ticker": undefined, "_timeoutAfter": undefined, "_usesChronometer": undefined, "_vibrate": undefined, "_visibility": undefined, "_when": undefined}, "_body": "Just Testing", "_data": {}, "_ios": {"_attachments": [], "_notification": [Circular]}, "_notificationId": "0:1596402014738886%1f0696df1f0696df", "_sound": undefined, "_subtitle": undefined, "_title": "Hello"}
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.removeNotificationListeners();
  }
  
  render() {
    
    const toggleTheme = () => {
      const nextTheme = this.state.theme === 'light' ? 'dark' : 'light';
      this.setState({theme: nextTheme});
    };

    // Application is comming from  mainRoute
    return (
      <>
        <IconRegistry icons={EvaIconsPack}/>
        <ThemeContext.Provider value={{ ...this.state.theme, toggleTheme }}>
          <ApplicationProvider {...eva} theme={eva[this.state.theme]}>
            <AuthProvider>
              <Application
                ref={navigator => {
                  setNavigator(navigator);
                }}
              />
            </AuthProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </>
    );
  };
}
export default App;