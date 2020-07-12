import React, {Component} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {AppBarHeader, ChatBarHeader} from './HeaderComponent'
import Login from './LoginComponent';
import Setting, { ChangeName } from './SettingComponent';
import Menu from './MenuComponent';
import Chat from './ChatComponent';
import chalk from 'chalk';

const ctx = new chalk.Instance({level : 3});

var rooms = [];


const SettingStack = createStackNavigator();
const SettingStackScreen = () => {
    return(
        <SettingStack.Navigator
            headerMode = 'screen'
        >
            <SettingStack.Screen
                name = 'Setting'
                component = {Setting}
                options = {
                    ({navigation}) => ({
                        header : () => <AppBarHeader title = 'Setting' navigation = {navigation}/>
                    })
                }
            />
            <SettingStack.Screen
                name = 'Change Name'
                component = {ChangeName}
                options = {
                    ({navigation}) => ({
                        header : () => <ChatBarHeader title = 'Change Name' navigation = {navigation} disableOption = {true}/>
                    })
                }
            />

        </SettingStack.Navigator>
    );
}



const MenuStack = createStackNavigator();
const MenuStackScreen = (props) => {
    console.log(ctx.blueBright('Menu Screen props : ', props));
    return(
        <MenuStack.Navigator
            initialRouteName = 'Menu'
            headerMode = 'screen'
            screenOptions = {{
                header : ({navigation}) => <AppBarHeader title = 'Chats' navigation = {navigation}/>
            }}
        >
            {/* pick a room */}
            <MenuStack.Screen 
                name = 'Menu'
                component = {Menu}
            />

            
            {
                props.rooms.length > 0 ? 
                props.rooms.map((item,index) => {
                    return(
                        <MenuStack.Screen
                            name = {item.toString()}
                            key = {index}
                            component = {Chat}
                            options = {
                                () => ({
                                    header : ({navigation}) => (
                                        <ChatBarHeader navigation = {navigation} title = {item}/>
                                    )
                                })
                            }
                        />
                    )
                })
                :
                console.log('gg')
            }
            <MenuStack.Screen
                name = 'Chat'
                component = {Chat}
                options = {
                    () => ({
                        header : ({navigation}) => (
                            <ChatBarHeader navigation = {navigation} title = 'Harsh'/>
                        )
                    })
                }
            />
        </MenuStack.Navigator>
    );
}

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
    return(
        <HomeStack.Navigator
            headerMode = 'screen'
            screenOptions = {{
            header : ({navigation}) => <AppBarHeader title = 'Join a Room' navigation = {navigation} disableOption = {true} />
            }}
        >
            <HomeStack.Screen
                name = 'Join a Room'
                component = {Login}
            />
        </HomeStack.Navigator>
    )
}

const MainDrawer = createDrawerNavigator();
const Drawer = (props) => {
    console.log('Drawer : ', props.rooms);
    const MenuScreen = (props) => <MenuStackScreen rooms = {props.rooms}/>
    return(
        <MainDrawer.Navigator
            initialRouteName="Join a Room"
        >
            <MainDrawer.Screen
                name = 'Join a Room'
                component = {HomeStackScreen}
            />
            <MainDrawer.Screen
                name = 'Menu'
                component = {MenuScreen}
            />
            <MainDrawer.Screen
                name = 'Setting'

                component = {SettingStackScreen}
            />
        </MainDrawer.Navigator>
    );
}

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            rooms : []
        }
    }

    async componentDidMount(){
        console.log('Main Component');
        await AsyncStorage.getItem('rooms')
        .then(result => {
            this.setState({
                rooms : JSON.parse(result)
            })
        })
        // console.log(this.state.rooms);
    }

    render(){
        return(
            <Drawer rooms = {this.state.rooms}/>
        );
    }

}


export default Main;