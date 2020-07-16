import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Card, TextInput, Button, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import chalk from 'chalk';

const ctx = new chalk.Instance({level : 3});
const log = (text) => console.log(ctx.cyanBright(text));

const mapStateToProps = state => {
    return {
      rooms : state.rooms
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRoom : (name) => dispatch(addRoom(name))
})

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            password : '',
            first : false,
            errorRoomName : false,
            errorPass : false,
            snackbar : true,
            // when server return false
            wrongPass : false
        }
    }
    rooms = [];
    async componentDidMount(){
        // await AsyncStorage.removeItem('rooms')

        // get rooms array
        await AsyncStorage.getItem('rooms')
        .then(result => {
            if(result != null){
                this.rooms = JSON.parse(result)
            }
            else{
                this.setState({first : true})
            }
        })
        // console.log(ctx.red("Rooms in Login: " ,this.rooms))
    }

    reset = () => {
        this.setState({
            name : ''
        })
    }

    addRoom = async () => { 
        this.rooms.push(this.state.name);
        const roomArray = JSON.stringify(this.rooms)
        await AsyncStorage.setItem('rooms' ,roomArray);
        this.props.updateRoom(this.rooms);    
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
    
    confirmCreds = () => {
        // API call
        if(this.checkEmpty()){
            this.toggleSnack();
            
        }
        else{
            if(!this.state.first){
                if(this.rooms.includes(this.state.name)){
                    if(Platform.OS === 'android'){
                        this.toggleSnack();
                        ToastAndroid.show('Room Already Joined', ToastAndroid.SHORT);
                        this.reset()
                    }
                }
                else{
                    if(true){
                        if(Platform.OS === 'android'){
                            ToastAndroid.show('Room Joined', ToastAndroid.SHORT);
                        }
                        this.addRoom();
                    }
                }
            }
            else{
                this.addRoom();
            }
        }
    }

    toggleSnack = () => {
        this.setState({
            snackbar : !this.state.snackbar
        })
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
                                
                            />
                            <TextInput
                                label="Password"
                                mode = 'outlined'
                                secureTextEntry
                                onSubmitEditing = {() => {this.confirmCreds()}}
                                value = {this.state.password}
                                onChange = {(text) => this.setState({password : text.nativeEvent.text, errorPass : false})}
                                error = {this.state.errorPass}
                                onFocus = {() => this.setState({password : ''})}
                            />
                        </Card.Content>
                        <Button mode="contained" style = {Styles.button} 
                            onPress={() => this.confirmCreds()}
                            >
                            Join
                        </Button>
                    </Card>
                    <Snackbar
                        visible = {this.state.snackbar}
                        onDismiss={() => this.toggleSnack()}
                        style = {{}}
                    >
                        {
                            this.state.wrongPass ? 
                            'Wrong password' 
                            : 
                            'Input cant be empty'
                        }
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
