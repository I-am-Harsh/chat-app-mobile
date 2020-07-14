import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from "react-native";
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
      rooms : state.rooms
    }
  }

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            rooms : [],
            visible : false
        }
    }

    async componentDidMount(){
        
        // test redux
        console.log(this.props.rooms)


        await AsyncStorage.getItem('rooms')
        .then(result => {
            if(result != null){
                console.log(result);
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

    render(){
        const renderChatItem = ({item, index}) => {
            const rightButton = [
                {
                    text: 'Delete', 
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Room?',
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
                
            )
        }

        if(this.state.rooms.length > 0){
            return(
                <ScrollView style = {Styles.main}>
                    <FlatList data = {this.state.rooms} renderItem = {renderChatItem} keyExtractor = {item => item}/>
                    </ScrollView>
            );
            // <Snackbar
            //     visible={visible}
            //     onDismiss={onDismissSnackBar}
            //     action={{
            //     label: 'Undo',
            //     onPress: () => {
            //         // Do something
            //     },
            //     }}>
            //     Hey there! I'm a Snackbar.
            // </Snackbar>
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
                    {/* <Snackbar
                        visible={visible}
                        onDismiss={onDismissSnackBar}
                        action={{
                        label: 'Undo',
                        onPress: () => {
                            // Do something
                        },
                        }}>
                        Hey there! I'm a Snackbar.
                    </Snackbar> */}
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

export default connect(mapStateToProps)(Menu);