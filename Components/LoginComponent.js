import React, {Component} from 'react';
import {View, Text, StyleSheet, ToastAndroid, Platform} from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import chalk from 'chalk';

const ctx = new chalk.Instance({level : 3});
const log = (text) => console.log(ctx.cyanBright(text));


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : '',
            password : '',
            first : false
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
        // console.log(ctx.blue(this.state.first))
        // console.log(ctx.red("Rooms : " ,this.rooms))
    }

    reset = () => {
        this.setState({
            name : ''
        })
    }

    addRoom = () => { 
        this.rooms.push(this.state.name);
        const roomArray = JSON.stringify(this.rooms)
        AsyncStorage.setItem('rooms' ,roomArray);
        this.props.navigation.navigate('Menu');
    }
    
    confirmCreds = () => {
        // API call
        if(!this.state.first){
            if(this.rooms.includes(this.state.name)){
                if(Platform.OS === 'android'){
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
            log('Added room first');
            this.addRoom();
        }
    }

    render(){
        
        return(
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
                            onChange = {(text) => this.setState({name : text.nativeEvent.text})}
                        />
                        <TextInput
                            label="Password"
                            mode = 'outlined'
                            secureTextEntry
                            onSubmitEditing = {() => {}}
                            onChange = {(text) => this.setState({password : text.nativeEvent.text})}
                        />
                    </Card.Content>
                    <Button mode="contained" style = {Styles.button} onPress={() => this.confirmCreds()}>
                        Join
                    </Button>
                </Card>
            </View>       
        );
    }

    
}

const Styles = StyleSheet.create({
    main : {
        marginTop : 20,
        marginLeft : 20,
        marginRight : 20,
        fontSize : 50
    },
    button : {
        margin : 16,
        fontSize : 20
    }
})
export default Login;
