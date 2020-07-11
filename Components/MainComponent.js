import React, {Component} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {AppBarHeader, ChatBarHeader} from './HeaderComponent'
import Home from './HomeComponent';
import Setting, { ChangeName } from './SettingComponent';
import Menu from './MenuComponent';
import Chat from './ChatComponent';


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
const MenuStackScreen = () => {
    return(
        <MenuStack.Navigator
            initialRouteName = 'Menu'
            headerMode = 'screen'
            screenOptions = {{
                header : ({navigation}) => <AppBarHeader title = 'Menu' navigation = {navigation}/>
            }}
        >
            {/* pick a room */}
            <MenuStack.Screen 
                name = 'Menu'
                component = {Menu}
                // options = {
                //     ({navigation}) => ({
                //         header : () => <AppBarHeader title = 'Menus'/>
                //     })
                // }
            />

            {/* Menu */}
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
            header : ({navigation}) => <AppBarHeader title = 'Home' navigation = {navigation} />
            }}
        >
            <HomeStack.Screen
                name = 'Home'
                component = {Home}
            />
        </HomeStack.Navigator>
    )
}

const MainDrawer = createDrawerNavigator();
const Drawer = () => {
    return(
        <MainDrawer.Navigator
            initialRouteName="Setting"
        >
            <MainDrawer.Screen
                name = 'Home'
                component = {HomeStackScreen}
            />
            <MainDrawer.Screen
                name = 'Menu'
                component = {MenuStackScreen}
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
    }

    render(){
        return(
            <Drawer/>
        );
    }

}


export default Main;