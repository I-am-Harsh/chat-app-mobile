import React from 'react';
import { Appbar } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';



export const AppBarHeader = (props) => {
    var title = String;
    var disableOption = Boolean;
    
    title = props.title;
    var disableOption = false;
    if(props.disableOption){
        disableOption = true
    }

    return(
        <Appbar.Header>
            <Appbar.Action icon = 'menu' onPress = {() => props.navigation.toggleDrawer()} />
            <Appbar.Content title = {title}/>
            { disableOption ? null : <Appbar.Action icon={MORE_ICON} onPress={() => {}} />}
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

 
