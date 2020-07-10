import React, {Component} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, Button} from 'react-native';
import { Appbar } from 'react-native-paper';
import Home from './HomeComponent';
import Setting from './SettingComponent';
import Chat from './ChatComponent';
import {AppBarHeader, ChatBarHeader} from './HeaderComponent'


const ChatStack = createStackNavigator();
const ChatStackScreen = () => {
    return(
        <ChatStack.Navigator
            initialRouteName = 'Chat'
            headerMode = 'screen'
        >
            <ChatStack.Screen 
                name = 'Chat'
                component = {Chat}
                options = {
                    ({navigation}) => ({
                        header : AppBarHeader
                    })
                }
            />
            <ChatStack.Screen
                name = 'Setting'
                component = {Setting}
                options = {
                    ({navigation}) => ({
                        header : ChatBarHeader,
                    })
                }
            />
        </ChatStack.Navigator>
    );
} 

const MainDrawer = createDrawerNavigator();
const Drawer = () => {
    return(
        <MainDrawer.Navigator
            initialRouteName="Chat"
        >
            <MainDrawer.Screen
                name = 'Home'
                component = {Home}

            />
            <MainDrawer.Screen
                name = 'Chat'
                component = {ChatStackScreen}
            />
            <MainDrawer.Screen
                name = 'Setting'
                component = {Setting}
            />
        </MainDrawer.Navigator>
    );
}

class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Drawer/>
        );
    }

}


export default Main;