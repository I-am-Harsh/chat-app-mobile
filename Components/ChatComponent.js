import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

class Chat extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <View style = {{margin : 50}}>
                <Text>
                    This is chat
                </Text>
                <Button onPress = {() =>this.props.navigation.navigate('Setting')}>
                    Setting
                </Button>
            </View>
        );
    }

}

export default Chat;