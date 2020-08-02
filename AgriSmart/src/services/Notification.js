import PushNotification from "react-native-push-notification"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import {Platform} from "react-native"

class Notification{
    configure = (onRegister,onNotification,onOpenNotification) => {
        PushNotification.configure({
            onRegister : function(token){
                onRegister(token)
                console.log("[Notification] TOKEN:", token)
            },
            onNotification: function (notification) {
                console.log("[Notification] onNOTIFICATION:", notification);

                if(Platform.OS === 'ios') {
                    if(notification.data.openedInForeground) {
                        notification.userInteraction = true
                    }
                }
                else {
                    notification.userInteraction =true
                }

                if(notification.userInteraction) {
                    onOpenNotification(notification)

                }
                else {
                    onNotification(notification)
                }
            
                //onlu
                if(Platform.OS=='ios')
                {
                    if(!notification.data.openedInForeground){
                        notification.finish('backgroundFetchResultNoData')
                    }
                }
                else {
                    notification.finish('backgroungFetchResultNoData')
                }
               
              },


        })
    }


    _buildAndroidNotification = (id, title, message, data= {}, options={}) =>{
        return {
            id: id,
            autoCancel:true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon : options.smallIcon || "ic_launcher",
            bigText : message ||'',
            subText : title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority : options.priority || "high",
            importance: options.importance || "high",
            data: data


        }
    } 

    _buildIOSNotification = (id, title, message, data= {}, options={}) =>{
        return {
            alertAction: options.alertAction ||" view",
            category : options.category|| "",
            userInfo : {
                id: id,
                item: data
            }
         }
    }

    showNotification = (id, title, message, data = {} , options= {} ) => {
        PushNotification.localNotification({
            /*Android*/
            ...this._buildAndroidNotification(id, title, message,data,options),
            /*ios*/
            ...this._buildIOSNotification(id,title,message, data, options ),
            /* Both ios and android*/
            title:title || "",
            message : message || "",
            playSound : options.playSound|| false,
            soundName: options.soundName || 'default',
            userInteraction : false //if notification was opened by user 

        })
    }

    cancelAllLocalNotification = () => {
        if(Platform.OS ==='ios') {
            PushNotificationIOS.removeAllDeliveredNotifications()
        }  else {
            PushNotification.cancelLocalNotifications()
        }
    }

    unRegister = () => {
        PushNotification.unregister()
    }
 
}


export const notification = new Notification()