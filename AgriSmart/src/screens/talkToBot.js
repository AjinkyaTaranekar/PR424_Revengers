import { StyleSheet, Text, View, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import React from 'react'

export default function talkToBot() {
    const [messages,onSend] = React.useState([
        {
            _id: 1,
            text: `Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?`,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'FAQ Bot',
              avatar: 'https://i.imgur.com/7k12EPD.png'
            }
          }
    ])
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          messages={messages}
          onSend={message => onSend(messages.push(message))}
          user={{
            _id: 1
          }}
        />
      </View>
    )
}
