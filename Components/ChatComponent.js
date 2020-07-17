import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Platform, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, TextInput } from 'react-native-paper';
import chalk from 'chalk';
import { ScrollView } from 'react-native-gesture-handler';

const ctx = new chalk.Instance({level : 3});
const log = (text) => console.log(ctx.cyanBright(text));

class Chat extends Component {
    constructor(props){
        super(props);

        this.state = {
            name : ''
        }
    }

    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('name')
          if(value !== null) {
            this.setState({
                name : value
            })
          }
        } catch(e) {
          log('Error');
        }
    }

    componentDidMount = async () => {
        this.getData();

    }
    
    render(){
        return(
            <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
                <SafeAreaView style = {Styles.main}>
                    <View style = {Styles.chatbox}>
                        <ScrollView>
                            <Text style = {Styles.messageSelf}>
                                message 1
                            </Text>
                            <Text style = {Styles.messageOpp}>
                                message 2
                            </Text>
                        </ScrollView>
                        <View style = {Styles.chatInputArea}>
                            <TextInput label = 'Send a message' style = {Styles.input} ></TextInput>
                            <Button style = {Styles.button} mode = 'contained' >Send</Button>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}

const Styles = StyleSheet.create({
    main : {
        margin : 20,
        flex : 1
    },

    chatInputArea : {
        position : 'absolute',
        flexDirection : "row",
        bottom : 5
    },

    chatbox : {
        flex : 1,
        borderBottomColor : 'black',
    },

    input : {
        flex : 25,
        borderRadius : 5,
        height : 20      
    },
    button : {
        flex : 1
    },
    messageSelf : {
        margin : 10,
        fontSize : 15,
        backgroundColor : 'green'
    },
    messageOpp : {
        alignSelf : 'flex-end',
        margin : 10,
        fontSize : 15
    }
})

export default Chat;