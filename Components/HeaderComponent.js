import React, { useState } from 'react';
import { Button, Menu, Divider, Provider, Appbar } from 'react-native-paper';


const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
{/* <Appbar.Action icon={MORE_ICON} onPress={() => openMenu()} /> */}


export const AppBarHeader = (props) => {
    var title = String;
    var disableOption = Boolean;
    
    title = props.title;
    var disableOption = false;
    if(props.disableOption){
        disableOption = true
    }

    const [visible, setVisible] = React.useState(false);
    const openMenu = () => {
        setVisible(true);
    }
    const closeMenu = () => setVisible(false);

    return(
        <Appbar.Header>
            <Appbar.Action icon = 'menu' onPress = {() => props.navigation.toggleDrawer()} />
            <Appbar.Content title = {title}/>
            { 
                disableOption ? 
                    null 
                    : 
                    // <Appbar.Action icon={MORE_ICON} onPress={() => openMenu()} />
                    null
                    
                    
            }
            <Provider>
                <Menu
                    visible = {visible}
                    onDismiss = {closeMenu}
                    anchor = {
                        <Appbar.Action icon={MORE_ICON} onPress={() => openMenu()} style = {{alignSelf : 'flex-end'}} color = 'white' />
                    }
                    
                >
                    <Menu.Item onPress={() => {props.deleteAllRooms()}} title="Delete all Rooms" />
                    <Menu.Item onPress={() => {}} title="Item 2" />
                    <Divider />
                    <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
            </Provider>
        </Appbar.Header>
    );
}

export const ChatBarHeader = (props) => {
    var title = String;
    title = props.title;

    var disableOption = false;
    if(props.disableOption){
        disableOption = true
    }
    
    return(
        <Appbar.Header>            
            <Appbar.BackAction onPress = {() => props.navigation.goBack()}/>
            <Appbar.Content title = {title}/>
            { disableOption ? null : <Appbar.Action icon={MORE_ICON} onPress={() => {}} />}
        </Appbar.Header>
    );
}

 
