import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TextInput, SafeAreaView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import chalk from 'chalk';

const ctx = new chalk.Instance({ level: 3 });

const mapStateToProps = state => {
    return {
      rooms : state.rooms,
      darkMode : state.darkMode
    }
}

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
        this.scrollView = React.createRef();
    }

    scrollToEndonKeyboardOpen = (e) => {        
        this.scrollView.current.scrollTo(
            {
                y : e.endCoordinates.screenY + 100, 
                animated : true
            }
        )
    }

    sendChat = () => {
        console.log('presesd');
        let newTemp = [...this.state.temp]
        newTemp.push(newTemp.length + 1)
        this.setState({
            temp : newTemp
        })
    }

    componentDidMount(){
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.scrollToEndonKeyboardOpen);
        this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.scrollView.current.scrollToEnd());
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHide.remove();
    }

    render() {
        const dark = this.props.darkMode
        return (
            <KeyboardAvoidingView 
                keyboardVerticalOffset = { 0 } 
                style = {{ flex: 1, paddingRight : 10, paddingLeft : 10}}
                behavior={Platform.OS === "ios" ? "padding" : null}
            >
                <SafeAreaView style={Styles.main}>
                    <ScrollView
                        ref = {this.scrollView} 
                        onContentSizeChange={() => this.scrollView.current.scrollToEnd()}
                        contentContainerStyle = {Styles.scrollviewContent}
                    >
                        {
                            this.state.temp.map(index => {
                                return (
                                    <View key={index}>
                                        <View>
                                            <Text style = {{color : dark ? 'white' : 'black', marginBottom : 5}}>
                                                Name 1
                                            </Text>
                                            <View style={Styles.messageBox} >
                                                <Text>
                                                    test message 
                                                </Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ alignSelf: 'flex-end',color : dark ? 'white' : 'black', marginBottom : 5 }}>
                                                Name 2
                                            </Text>
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
                            style={[Styles.input, { height: Math.min(80, this.state.height) }]}
                            value={this.state.text}
                            onChange={(text) => this.setState({ text: text.nativeEvent.text })}
                            placeholderTextColor='black'
                            multiline
                            onContentSizeChange={(event) => this.setState({ height: event.nativeEvent.contentSize.height })}
                            numberOfLines={4}
                            onFocus = {() => this.scrollView.current.scrollToEnd({animated: true})}
                        />
                        <IconButton icon = 'send' 
                            // onPress = {() => this.scrollView.current.scrollToEnd({animated: false})} 
                            onPress = { () => this.sendChat()}
                            style = {Styles.button}
                            color = 'black'
                        />
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
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

    scrollviewContent : {
        ...Platform.select({
            ios : {
                paddingBottom : 30
            },
            android : {
                paddingBottom : 10
            }
        })
    },
    chatInputArea: {
        flexDirection: "row",
        backgroundColor : 'powderblue',
        borderRadius : 30,
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
        marginRight: 5,
        borderRadius : 30,  
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


export default connect(mapStateToProps)(Chat);