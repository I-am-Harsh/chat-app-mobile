import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class Menu extends Component {
    constructor(props){
        super(props);

        this.state = {
            room : []
        }
    }

    async componentDidMount(){
        await AsyncStorage.getItem('rooms')
        .then(result => {
            if(result != null){
                this.setState({
                    room : JSON.parse(result) 
                })
            }
        })
    }

    

    render(){
        return(
            <ScrollView style = {Styles.main}>
                {
                    this.state.room.length > 0 ?
                    this.state.room.map((item, index) => {
                        return(
                            <ListItem 
                                key = {index}
                                title = {item}
                                bottomDivider
                                chevron
                                onPress = {() => {this.props.navigation.navigate('2')}}
                                titleStyle = {{fontSize : 20}}
                                badge = {{value : 3}}
                                containerStyle = {{padding : 30}}
                            />
                        )
                    })
                    :
                    <Text>Please add some chats</Text>
                }
                <Button onPress = {() => this.props.navigation.navigate('2')}>
                    Chat
                </Button>
            </ScrollView>
        );
    }

}

const Styles = StyleSheet.create({
    main : {
        flex : 1
    },
    chatTile : {
        paddingTop : 20,
        paddingBottom : 20
    }
})

export default Menu;