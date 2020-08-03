import React from 'react';
import Application from './src/routes/mainRoute'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, AsyncStorage } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './src/theme-context';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {setNavigator, navigate} from './src/navigationRef';
import { Component, Fragment } from 'react';
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';


async function requestLocationPermission(){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'AgriSmart',
          'message': 'AgriSmart want access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

class App extends Component<Props> {
  state = {
    theme : 'light',
    currentLat: 0,
    currentLong: 0,
  }
  getToken = async () => {
    let fcmToken = false
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
        console.log(notification.data)
        firebase.notifications().displayNotification(notification);
        this.displayNotification(notification.data)
      });
  };
  async initalState(){
    await requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        this.setState({...this.state,
            currentLat: position.coords.latitude,
            currentLong : position.coords.longitude,
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 500000,
        maximumAge: 0,
      },
    );

  }
  sendRequest = async (body,farmerFcm) => {
    const FIREBASE_API_KEY = "AAAAaTaihNQ:APA91bGXXZmDPPHMinrSOX5T8eab-6t9uLka0anuk8EsDBBpDZOCrSI8oRHsmrdPlxW6Xzm8O8p-Iuygc2WTLWmAZktBKAYgFZEJMYgfxaSqqDMqa_1bJ8CrQpgIlljiDkR-pMws4ofW"
    console.log("initial", driverFCM)
    const message = {
      registration_ids: [
        farmerFcm
      ],
      notification: {
        title: "AgriSmart",
        body: body,
        vibrate: 1,
        sound: 1,
        show_in_foreground: true,
        priority: "high",
        content_available: true,
      },
    }
    console.log("now here")
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "key=" + FIREBASE_API_KEY,
    })
    console.log("now here here")
    
    let response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers,
      body: JSON.stringify(message),
    })
    console.log("now here 3")
    //response = await response.json()
    console.log(response)
    
  }
  requestAccepted = (data) => {
    console.log("accepted")
    navigate('Navigate',{farmerAvailable: { "name": data.title, "contactDetails": { "phoneno": data.mobile,"permanentOTP" : data.otp},
    "locations": {
        "origin": {latitude: data.OLat ,longitude: data.OLon},"destination": {latitude: data.DLat,longitude: data.OLon},
    },
    "shippingDetails": {
      "grainType": data.load,"weight": data.weight,
    }}, driver: [{"locations":{origin: {latitude: currentLat, longitude: currentLong}}}]});
    this.sendRequest("Driver Accepted \n Happy Journey",data.farmerFCM)
  };

  requestRejected = (data) => {
    console.log("rejected")
  };

  displayNotification(data) {
    Alert.alert(
      "Farmer " + data.title +" has made a request!", "Mobile Number: " + data.mobile + "\n" + "From: " + data.OLat + ',' + data.OLon + "\n" + "To: " + data.DLat + ',' + data.DLon  + "\n" ,
      [
        { text: 'Accept', onPress: () => this.requestAccepted(data) },
        { text: 'Reject', onPress: () => this.requestRejected(data) },
      ],
      { cancelable: false },
    );
  }
  removeNotificationListeners = () => {
    this.onUnsubscribeNotificaitonListener();
  };

  componentDidMount() {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
    .setDescription('My apps test channel');

    // Create the channel{"_android": {"_actions": [], "_autoCancel": undefined, "_badgeIconType": undefined, "_bigPicture": undefined, "_bigText": undefined, "_category": undefined, "_channelId": undefined, "_clickAction": undefined, "_color": undefined, "_colorized": undefined, "_contentInfo": undefined, "_defaults": undefined, "_group": "campaign_collapse_key_8654936965679127399", "_groupAlertBehaviour": undefined, "_groupSummary": undefined, "_largeIcon": undefined, "_lights": undefined, "_localOnly": undefined, "_notification": [Circular], "_number": undefined, "_ongoing": undefined, "_onlyAlertOnce": undefined, "_people": [], "_priority": undefined, "_progress": undefined, "_remoteInputHistory": undefined, "_shortcutId": undefined, "_showWhen": undefined, "_smallIcon": {"icon": "ic_launcher"}, "_sortKey": undefined, "_tag": "campaign_collapse_key_8654936965679127399", "_ticker": undefined, "_timeoutAfter": undefined, "_usesChronometer": undefined, "_vibrate": undefined, "_visibility": undefined, "_when": undefined}, "_body": "Just Testing", "_data": {}, "_ios": {"_attachments": [], "_notification": [Circular]}, "_notificationId": "0:1596402014738886%1f0696df1f0696df", "_sound": undefined, "_subtitle": undefined, "_title": "Hello"}
    firebase.notifications().android.createChannel(channel);
    this.initalState();
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