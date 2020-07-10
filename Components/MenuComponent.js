import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

class Menu extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        return(
            <View style = {{margin : 50}}>
                <Text>
                    This is Menu
                </Text>
                <Button onPress = {() => this.props.navigation.navigate('Chat')}>
                    Chat
                </Button>
            </View>
        );
    }

}

export default Menu;