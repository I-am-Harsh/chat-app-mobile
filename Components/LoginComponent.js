import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Card, TextInput, Button, Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { addRoom, snackbarToggle, deleteAllRooms } from '../redux/ActionCreators';
import chalk from 'chalk';

const ctx = new chalk.Instance({level : 3});


const mapStateToProps = state => {
    return {
      rooms : state.rooms
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRoom : (name) => dispatch(addRoom(name)),
    snackbarToggle : () => dispatch(snackbarToggle()),
    deleteAllRooms : () => dispatch(deleteAllRooms())
})

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            password : '',
            errorRoomName : false,
            errorPass : false,
            snackbar : false,
            // when server return false
            wrongPass : false,
            snackBarText : ''
        }
        this.passwordRef = React.createRef()
    }

    reset = () => {
        this.setState({
            name : '',
            password : ''
        })
    }

    checkEmpty = () => {
        if(this.state.name == ''){
            this.setState({
                errorRoomName : true
            })
            return true;
        }
        if(this.state.password == ''){
            this.setState({
                errorPass : true
            })
            return true;
        }

        return false;
    }

    isEmpty(obj) {
        for(var i in obj) return false; 
        return true;
    }
    

    checkIfRoomJoined = () => {
        console.log('rooms : ', this.props.rooms);
        let result = Object.keys(this.props.rooms).some((current)  => current === this.state.name)
        console.log(result);
        return result
    }

    // componentDidMount(){
    //     this.checkIfRoomJoined()
    // }
    
    confirmCreds = () => {
        // API call

        // check if empty credentials
        if(this.checkEmpty()){
            // if empty
            // show message 
            this.toggleSnack('Please fill the red fields.');
        }
        else{
            if(!this.isEmpty(this.props.rooms)){
                console.log('gg');
                if(this.checkIfRoomJoined()){
                    console.log('room already joined ')
                    this.toggleSnack('Room already joined');
                    this.reset()
                }
                else{
                    console.log('lmao');
                    this.reset();
                    this.props.addRoom(this.state.name);
                    this.props.navigation.navigate('Menu');
                    this.props.snackbarToggle();
                }
            }
            else{
                console.log('rip');
                this.props.addRoom(this.state.name);
                this.props.navigation.navigate('Menu');
                this.props.snackbarToggle();
            }
        }
    }

    toggleSnack = (text) => {
        if(text == null){
            this.setState({
                snackbar : !this.state.snackbar
            })
        }
        else{
            this.setState({
                snackbar : !this.state.snackbar,
                snackBarText : text
            })
        }
    }

    
    render(){
        
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <View style = {Styles.main}>
                    <Card>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }}/>
                        <Card.Title title = 'Login/Create Room' subtitle = "If the room doesn't exist one will be created"/>
                        <Card.Content>
                            <TextInput
                                label="Room Name"
                                mode = 'outlined'
                                style = {{marginBottom : 10}}
                                value = {this.state.name}
                                onChange = {(text) => this.setState({name : text.nativeEvent.text, errorRoomName : false})}
                                error = {this.state.errorRoomName}
                                onSubmitEditing = {() => this.passwordRef.current.focus()}
                                blurOnSubmit={false}
                                returnKeyType = 'next'
                            />
                            <TextInput
                                ref = {this.passwordRef}
                                label="Password"
                                mode = 'outlined'
                                secureTextEntry
                                onSubmitEditing = {() => {this.confirmCreds()}}
                                value = {this.state.password}
                                onChange = {(text) => this.setState({password : text.nativeEvent.text, errorPass : false})}
                                error = {this.state.errorPass}
                                onFocus = {() => this.setState({password : ''})}
                                returnKeyType = "go"
                            />
                        </Card.Content>
                        <Button mode="contained" style = {Styles.button} 
                            onPress = {() => this.confirmCreds()}
                            // onPress = {() => this.props.snackbarToggle(false)}
                            >
                            Join
                        </Button>
                    </Card>
                    <Snackbar
                        visible = {this.state.snackbar}
                        onDismiss={() => this.toggleSnack()}
                        style = {{}}
                    >
                        {this.state.snackBarText}
                    </Snackbar>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    
}

const Styles = StyleSheet.create({
    main : {
        marginTop : 20,
        marginLeft : 20,
        marginRight : 20,
        fontSize : 50,
        flex : 1
    },
    button : {
        margin : 16,
        fontSize : 20
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);
