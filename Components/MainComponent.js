import React, { Component } from 'react';
import { SafeAreaView} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
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
                // initialRouteName='Chat Test'
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

                {
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

    render() {

        const MainDrawer = createDrawerNavigator();
        const Drawer = () => {
            return (
                <MainDrawer.Navigator
                    initialRouteName = "Menu"
                    // drawerStyle = {{backgroundColor : 'black'}}
                    
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