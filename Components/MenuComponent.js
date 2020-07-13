import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { FlatList } from 'react-native-gesture-handler';


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

    deleteRoom = async (index) => {
        await AsyncStorage.getItem('rooms')
        .then(result => {
            var newRoom = JSON.parse(result);
            newRoom.splice(index,1);
            this.setState({
                rooms : newRoom
            })
            AsyncStorage.setItem('rooms',JSON.stringify(newRoom));
        })
    }

    deleteAllRooms = () => {
        AsyncStorage.removeItem('rooms');
        this.setState({
            rooms : []
        })
    }
    

    render(){

        const renderChatItem = ({item, index}) => {
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
                                    onPress: (index) => this.deleteRoom(index)
                                }
                            ],
                            { cancelable: true }
                        );
                        
                    }
                }
            ]
            return(
                <ScrollView style = {Styles.main}>    
                    <Swipeout right = { rightButton } autoClose key = {index}>
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
                </ScrollView>
            )
        }

        if(this.state.rooms.length > 0){
            return(
                <FlatList data = {this.state.rooms} renderItem = {renderChatItem} keyExtractor = {item => item}/>
            );
        }
        else{
            return(
                <View style = {{flex : 1}}>
                    <Text style = {Styles.emptyText}>
                        Please add some rooms
                    </Text>
                    <Button style ={Styles.button} mode='contained' onPress = {() => this.props.navigation.navigate('Join a Room')} >
                        Add Rooms
                    </Button>
                </View>
            );
        }
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
    },
    button : {
        flexDirection : "row", 
        width : '50%', 
        justifyContent : 'center',
        alignSelf : 'center'

    }
})

export default Menu;