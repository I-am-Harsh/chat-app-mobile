import React, { Component } from 'react';
import { Animated, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';


class Menu extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms : []
        }
    }

    async componentDidMount(){
        await AsyncStorage.getItem('rooms')
        .then(result => {
            if(result != null){
                this.setState({
                    rooms : JSON.parse(result) 
                })
            }
        })
    }

    
    

    render(){
        const rightButton = [
            {
                text: 'Delete', 
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you wish to delete the room?',
                        [
                            { 
                                text: 'Cancel', 
                                onPress: () => console.log('Not Deleted'),
                                style: ' cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () => console.log('delted')
                            }
                        ],
                        { cancelable: true }
                    );
                    
                }
            }
        ]
        return(
            <ScrollView style = {Styles.main}>
                {
                    this.state.rooms.length > 0 ?
                    this.state.rooms.map((item, index) => {
                        return(
                            <Swipeout right = {rightButton} autoClose key = {index}>
                                <ListItem 
                                    title = {item}
                                    bottomDivider
                                    chevron
                                    onPress = {() => {this.props.navigation.navigate(item)}}
                                    titleStyle = {{fontSize : 20}}
                                    badge = {{value : 3}}
                                    containerStyle = {{padding : 30}}
                                />
                            </Swipeout>
                        )
                    })
                    :
                    <Text style = {Styles.emptyText}>Please add some chats</Text>
                }
                <Button onPress = {() => this.props.navigation.navigate('Chat')}>
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
    },
    emptyText : {
        fontSize : 30,
        fontWeight : 'bold',
        margin : 20,
        textAlign : "center"
    }
})

export default Menu;