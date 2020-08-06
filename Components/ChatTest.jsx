import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { IconButton } from 'react-native-paper';
import chalk from 'chalk';
import { ScrollView } from 'react-native-gesture-handler';

const ctx = new chalk.Instance({ level: 3 });

class ChatTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            // text: 'Line1\nLine2\nLine3 Line1\nLine2\nLine3Line1\nLine2\nLine3 Line1\nLine2\nLine3Line1\nLine2\nLine3 Line1\nLine2\nLine3Line1\nLine2\nLine3 Line1\nLine2\nLine3',
            text : '',  
            height: 35,
            temp: [1, 2, 3, 4, 5, 6,8,9,546,312,324,234,521,43,534,53,533,15]
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style = {{flex : 1}}>
                <SafeAreaView style = {styles.main}>
                    <ScrollView style = {styles.messageArea} >
                        {
                            this.state.temp.map(index => {
                                return(
                                    <Text key = {index} style = {{marginBottom : 60}}>
                                        asd
                                    </Text>
                                );
                            })
                        }
                    </ScrollView>
                    <View style = {styles.chatInputs}>
                        <TextInput
                            placeholder = 'Send a message'
                            placeholderTextColor='black'
                            style = {[styles.textInput, , { height: Math.min(100, this.state.height) }]}
                            multiline
                            numberOfLines={4}
                            onContentSizeChange = {(event) => this.setState({ height: event.nativeEvent.contentSize.height })}
                        />
                        <IconButton icon = 'send' 
                            onPress = {() => {}} 
                            style = {styles.button}
                            color = 'black'
                        />
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    main : {
        flex : 1,
        // justifyContent : 'center'
    },
    messageArea : {
        backgroundColor : 'green',
        height : '90%'
    },
    chatInputs : {
        flex : 1,
        flexDirection : 'row',
        backgroundColor : 'red',
        height : '10%',
        paddingBottom : 10,
        justifyContent : 'center',
        borderRadius : 20
    },
    textInput : {
        width : '80%',
        marginTop : 10,
        minHeight: 30
    },
    sendButton : {
        width : '20%'
        
    }
})

export default ChatTest;