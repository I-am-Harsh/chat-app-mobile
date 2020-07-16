import React, { Component } from 'react';
import {Alert} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { AppBarHeader, ChatBarHeader } from './HeaderComponent'
import Login from './LoginComponent';
import Setting, { ChangeName } from './SettingComponent';
import Menu from './MenuComponent';
import Chat from './ChatComponent';
import chalk from 'chalk';

const ctx = new chalk.Instance({ level: 3 });

const mapStateToProps = state => {
    return {
      rooms : state.rooms
    }
}


const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();
const MenuStack = createStackNavigator();

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            screenName: false
        }
    }


    async componentDidMount() {
        // AsyncStorage.removeItem('rooms');
        await AsyncStorage.getItem('rooms')
            .then(result => {
                this.setState({
                    rooms: JSON.parse(result)
                })
            })
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
                initialRouteName='Menu'
                headerMode='screen'
                screenOptions={{
                    header: ({ navigation }) => <AppBarHeader title='Chats' navigation={navigation} deleteAllRooms = {this.deleteAllRooms} />
                }}
            >
                {/* pick a room */}
                <MenuStack.Screen
                    name='Menu'
                    component={Menu}
                    initialParams = {{test : 'rip'}}
                />


                {
                    this.state.rooms != null &&
                    this.state.rooms.map((item, index) => {
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
                }
                <MenuStack.Screen
                    name='Chat'
                    component={Chat}
                    options={
                        () => ({
                            header: ({ navigation }) => (
                                <ChatBarHeader navigation={navigation} title='Harsh' />
                            )
                        })
                    }
                />
            </MenuStack.Navigator>
        );
    }


    HomeStackScreen = () => {
        const LoginWithFunction = (props) => {

            const updateRoom = (rooms) => {
                this.setState({
                    rooms: rooms
                })
                // console.log(ctx.greenBright('Room Update called : ', this.state.rooms));
            }

            return (
                <Login rooms={this.state.rooms} updateRoom={updateRoom} {...props} />
            )
        }
        return (
            <HomeStack.Navigator
                headerMode='screen'
                screenOptions={{
                    header: ({ navigation }) => <AppBarHeader title='Join a Room' navigation={navigation} disableOption={true} />
                }}
            >
                <HomeStack.Screen
                    name='Join a Room'
                    component={LoginWithFunction}
                />
            </HomeStack.Navigator>
        )
    }

    deleteAllRooms = () => {
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
                    onPress: () => {
                        AsyncStorage.removeItem('rooms')
                        this.setState({
                            rooms : []
                        })
                    }
                    
                }
            ],
            { cancelable: true }
        );
        
        console.log('deleted');
    }


    render() {

        const MainDrawer = createDrawerNavigator();
        const Drawer = () => {
            return (
                <MainDrawer.Navigator
                    initialRouteName="Menu"
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
                </MainDrawer.Navigator>
            );
        }

        return (
            <Drawer />
        );
    }

}


export default connect(mapStateToProps)(Main);