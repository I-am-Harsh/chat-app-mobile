import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import { Button } from 'react-native-paper';
import chalk from 'chalk';

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
                <View style = {Styles.main}>
                    <Text>
                        This is Chat
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const Styles = StyleSheet.create({
    main : {
        margin : 20,
        flex : 1
    }
})

export default Chat;