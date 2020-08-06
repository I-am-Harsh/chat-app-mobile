import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme as DarkNav, DefaultTheme as DefaultNav, NavigationContainer } from '@react-navigation/native';
import { DefaultTheme as DefaultPaper, Provider as PaperProvider, DarkTheme as DarkPaper } from 'react-native-paper';
import { connect } from 'react-redux';


import { AppBarHeader, ChatBarHeader } from './HeaderComponent'
import Login from './LoginComponent';
import Setting, { ChangeName } from './SettingComponent';
import Menu from './MenuComponent';
import Chat from './ChatComponent';
import ChatTest from './ChatTest';

import chalk from 'chalk';

const ctx = new chalk.Instance({ level: 3 });

const mapStateToProps = state => {
    return {
      rooms : state.rooms,
      darkMode : state.darkMode
    }
}


const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();
const MenuStack = createStackNavigator();
const ChatTestStack = createStackNavigator();

class Main extends Component {
    constructor(props) {
        super(props);
    }

    SettingStackScreen = () => {
        return (
            <SettingStack.Navigator
                headerMode='screen'
            >
                <SettingStack.Screen
                    name='Setting'
                    component={Setting}
                    options={
                        ({ navigation }) => ({
                            header: () => <AppBarHeader title='Setting' navigation={navigation} />
                        })
                    }
                />
                <SettingStack.Screen
                    name='Change Name'
                    component={ChangeName}
                    options={
                        ({ navigation }) => ({
                            header: () => <ChatBarHeader title='Change Name' navigation={navigation} disableOption={true} />
                        })
                    }
                />
            </SettingStack.Navigator>
        );
    }




    MenuStackScreen = () => {
        return (
            <MenuStack.Navigator
                initialRouteName='Chat Test'
                headerMode='screen'
                screenOptions={{
                    header: ({ navigation }) => <AppBarHeader title='Chats' navigation={navigation}/>
                }}
            >
                {/* pick a room */}
                <MenuStack.Screen
                    name='Menu'
                    component={Menu}
                />

                {/* {
                    this.props.rooms.length !== 0 &&
                    this.props.rooms.map((item, index) => {
                        return (
                            <MenuStack.Screen
                                name={item.toString()}
                                key={index}
                                component={Chat}
                                options={
                                    () => ({
                                        header: ({ navigation }) => (
                                            <ChatBarHeader navigation={navigation} title={item} />
                                        )
                                    })
                                }
                            />
                        )
                    })
                } */}
                {
                    Object.keys(this.props.rooms).map(key => {
                        return(
                            <MenuStack.Screen
                                name={key.toString()}
                                key={key}
                                component={Chat}
                                options={
                                    () => ({
                                        header: ({ navigation }) => (
                                            <ChatBarHeader navigation={navigation} title={key} />
                                        )
                                    })
                                }
                            />
                        );
                    })
                }
                <MenuStack.Screen
                    name={'Chat Test'}
                    key={100}
                    component={Chat}
                    options={
                        () => ({
                            header: ({ navigation }) => (
                                <ChatBarHeader navigation={navigation} title={'Chat Test'} />
                            )
                        })
                    }
                />
            </MenuStack.Navigator>
        );
    }


    HomeStackScreen = () => {
        return (
            <HomeStack.Navigator
                headerMode='screen'
                screenOptions={{
                    header: ({ navigation }) => <AppBarHeader title='Join a Room' navigation={navigation} disableOption={true} />
                }}
            >
                <HomeStack.Screen
                    name='Join a Room'
                    component={Login}
                />
            </HomeStack.Navigator>
        )
    }

    ChatTest = () => {
        return (
            <ChatTestStack.Navigator
                headerMode='screen'
                screenOptions={{
                    header: ({ navigation }) => <ChatBarHeader navigation={navigation} title={'Chat Test'} />
                }}
            >
                <ChatTestStack.Screen
                    name='Chat Test'
                    component={ChatTest}
                />
            </ChatTestStack.Navigator>
        )
    }


    render() {

        const MainDrawer = createDrawerNavigator();
        const Drawer = () => {
            var route;
            if(this.props.rooms.length >= 1){
                route = 'Menu'
            }
            else{
                route = 'Join a Room'
            }
            return (
                <MainDrawer.Navigator
                    initialRouteName = {route}
                >
                    <MainDrawer.Screen
                        name='Join a Room'
                        component={this.HomeStackScreen}
                    />
                    <MainDrawer.Screen
                        name='Menu'
                        component={this.MenuStackScreen}
                    />
                    <MainDrawer.Screen
                        name='Setting'
                        component={this.SettingStackScreen}
                    />
                    {/* <MainDrawer.Screen
                        name='Chat Test'
                        component={this.ChatTest}
                    /> */}
                </MainDrawer.Navigator>
            );
        }

        return (
            <PaperProvider theme = {this.props.darkMode ? DarkPaper : DefaultPaper}>
                <NavigationContainer theme = {this.props.darkMode ? MyTheme : DefaultNav}>
                    <StatusBar 
                        translucent 
                        backgroundColor = {this.props.darkMode ? '#121212' : '#6200ee'}
                        barStyle = {this.props.darkMode ? 'light-content' : 'dark-content'}
                    />
                    <Drawer />
                </NavigationContainer>
            </PaperProvider>
        );
    }
}
  
const Dark = {
    ...DarkPaper,
    colors : {
        background : '#121212'
    }
};

const MyTheme = {
    ...DarkNav,
    colors: {
      ...DarkNav.colors,
      primary: 'red',
      background : '#121212'
    },
  };


export default connect(mapStateToProps)(Main);