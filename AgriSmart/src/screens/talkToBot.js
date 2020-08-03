import { StyleSheet, Text, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import React,{useEffect,useState,useCallback} from 'react'
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../../env';

export default talkToBot = () => {
    console.log("Here you can talk to Veronica")
    
    const BOT_USER = {
      _id: 2,
      name: 'AgriBot',
      avatar: 'https://cdn.dribbble.com/users/722835/screenshots/4082720/bot_icon.gif'
    };
    
    
    const [messages, setMessages] = useState([{
      _id: 1,
      text: 'Hi I am Veronica Your Personal Assistant Say Hi!',
      createdAt: new Date(),
      user: BOT_USER
    },]);

    useEffect(() => {
      Dialogflow_V2.setConfiguration(
        dialogflowConfig.client_email,
        dialogflowConfig.private_key,
        Dialogflow_V2.LANG_ENGLISH_US,
        dialogflowConfig.project_id
      );
      // setMessages([])
      console.log("TEST",messages)
    }, [messages])


    const onSend = useCallback((newMessage=[]) => {
      console.log(messages);
      console.log(newMessage);
      setMessages(prevMessages => [...newMessage,...prevMessages])
      let message = newMessage[0].text;
      Dialogflow_V2.requestQuery(
        message,
        result => handleGoogleResponse(result),
        error => console.log(error)
      );
    },[messages])


    const handleGoogleResponse = (result)=> {
      let text = result.queryResult.fulfillmentMessages[0].text.text[0];
      sendBotResponse(text);
    }

    const sendBotResponse = (text) =>{
      console.log(messages)
        let msg = {
          _id: messages.length + 1,
          text,
          createdAt: new Date(),
          user: BOT_USER
        };
        setMessages(prevMessages => [msg,...prevMessages])
      }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          messages={messages}
          onSend={message => onSend(message)}
          user={{
            _id: 1
          }}
        />
      </View>
    )
}
