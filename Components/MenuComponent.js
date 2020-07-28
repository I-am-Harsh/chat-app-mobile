import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from "react-native";
import { Button, Snackbar } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { deleteSingleRoom, snackbarToggle } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
      rooms : state.rooms,
      snackbar : state.snackbar
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteSingleRoom : (index) => dispatch(deleteSingleRoom(index)),
    snackbarToggle : (current) => dispatch(snackbarToggle(current))
})

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            rooms : [],
            visible : false
        }
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
                                    onPress: (index) => this.props.deleteSingleRoom(index)
                                }
                            ],
                            { cancelable: true }
                        );
                        
                    }
                }
            ]
            var dark = false
            return(
                
                // <Swipeout right = { rightButton } autoClose key = {index}>
                    <ListItem 
                        title = {item}
                        bottomDivider
                        chevron
                        onPress = {() => {this.props.navigation.navigate(item)}}
                        titleStyle = {{fontSize : 20, color : dark ? 'white' : 'black' }}
                        badge = {{value : 3}}
                        containerStyle = {{padding : 30}}
                    />
                // </Swipeout>
            
            )
        }

        if(this.props.rooms.length > 0){
            return(
                // <ScrollView style = {Styles.main}>
                <View style = {{flex : 1}}>
                    <FlatList 
                        data = {this.props.rooms} 
                        renderItem = {renderChatItem} 
                        keyExtractor = {item => item}
                        
                    />
                    <Snackbar
                        visible = {this.props.snackbar}
                        onDismiss={() => this.props.snackbarToggle()}
                    >
                        Room Joined
                    </Snackbar>
                </View>
                    // </ScrollView>
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

export default connect(mapStateToProps,mapDispatchToProps)(Menu);