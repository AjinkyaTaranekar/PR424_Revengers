import  React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {notification} from './Notification'

class NotificationService extends Component {
  constructor(props){
    super(props)
    this.localNotify = null
  }
  componentDidMount() {
  this.localNotify = notification
  /*this.localNotify.configure(this.onRegister,this.onNotification,this.onOpenNotification)*/

  }
  onRegister(token){
    console.log("[Notification] Registered: ", token)
  }
  onNotification(notify) {
    console.log("[Notification] onNotification: ", notify)
  }
  onOpenNotification(notify) {
    console.log("[Notification] onOpenNotification: ", notify)
    alert("open Notification")
  }
  onPressSendNotification= (header,subject) => {
    this.localNotify = notification;
    const options = {
      soundName: 'default',
      playSound: true,
      vibrate: true

    }
    this.localNotify.showNotification(
      1,
      header,
      subject,
      {}, //data
      options //options

    )

  }
  render() {
    let {container,button} = styles 
    return (
      <View style = {container}>
        <TouchableOpacity
         style= {button}
         onPress = {this.onPressSendNotification}
         >
        <Text>Send Notification</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: "center",
    justifyContent : "center"
  },
  button : {
    alignItems:"center",
    backgroundColor: "#DDDDDD",
    padding:10,
    width: 200,
    marginTop:10
  }
})
const notify = new NotificationService()
export default notify;