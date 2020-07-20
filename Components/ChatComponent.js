import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Platform, TextInput, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { IconButton } from 'react-native-paper';
import chalk from 'chalk';
import { ScrollView } from 'react-native-gesture-handler';

const ctx = new chalk.Instance({ level: 3 });
const log = (text) => console.log(ctx.cyanBright(text));

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            // text: 'Line1\nLine2\nLine3 Line1\nLine2\nLine3Line1\nLine2\nLine3 Line1\nLine2\nLine3Line1\nLine2\nLine3 Line1\nLine2\nLine3Line1\nLine2\nLine3 Line1\nLine2\nLine3',
            text : '',  
            height: 35,
            temp: [1, 2, 3, 4, 5, 6]
        }
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('name')
            if (value !== null) {
                this.setState({
                    name: value
                })
            }
        } catch (e) {
            log('Error');
        }
    }

    componentDidMount = async () => {
        this.getData();
    }

    render() {
        return (
            <SafeAreaView style={Styles.main}>
                <ScrollView
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
                    contentContainerStyle = {{paddingBottom : 55}}
                >
                    {
                        this.state.temp.map(index => {
                            return (
                                <View key={index}>
                                    <View>
                                        <Text>Name 1</Text>
                                        <View style={Styles.messageBox} >
                                            <Text>
                                                me
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ alignSelf: 'flex-end' }}>Name 2</Text>
                                        <View style={Styles.messageBoxOpp}>
                                            <Text>
                                                message 1 message 1 message 1 message 1 message 1message 1 message 1 message 1 message 1 message 1
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    }
                </ScrollView>
                <View style={Styles.chatInputArea}>
                    <TextInput
                        placeholder='Send a message'
                        style={[Styles.input, { height: Math.min(100, this.state.height) }]}
                        value={this.state.text}
                        onChange={(text) => this.setState({ text: text.nativeEvent.text })}
                        placeholderTextColor='black'
                        multiline
                        onContentSizeChange={(event) => this.setState({ height: event.nativeEvent.contentSize.height })}
                        numberOfLines={4}
                    />
                    <IconButton icon = 'send' onPress = {() => {}} style = {Styles.button}></IconButton>
                    {/* <Button>Send</Button> */}
                </View>
            </SafeAreaView>
        );
    }


}

const Styles = StyleSheet.create({
    main: {
        flex: 1,
        ...Platform.select({
            ios : {
                marginLeft : 10,
                marginRight : 10
            }
        })
    },

    scrollview : {
        // backgroundColor : 'lightgrey'
    },
    chatInputArea: {
        position: 'absolute',
        flexDirection: "row",
        ...Platform.select({
            android: {
                bottom : 0
            },
            ios: {
                bottom : 20
            }
        }),
        // zIndex : 2,
        backgroundColor : 'powderblue',
        borderRadius : 30

    },
    input: {
        flex : 3,
        marginRight: 5,
        fontSize: 15,
        paddingLeft: 10,
        minHeight: 30,
        marginTop : 10,
        marginLeft : 10,
        marginBottom : 5
    },
    button: {
        flex : 1,
        alignSelf: 'center',
        marginRight: 5,
        borderRadius : 30
    },
    messageBox: {
        alignSelf: 'flex-start',
        padding: 12,
        backgroundColor: 'lightgrey',
        maxWidth: '65%',
        marginBottom: 10,
        borderRadius : 15
    },
    messageBoxOpp: {
        alignSelf: 'flex-end',
        padding: 12,
        backgroundColor: 'lightgrey',
        maxWidth: '65%',
        marginBottom: 10,
        borderRadius : 15
    }
})


export default Chat;