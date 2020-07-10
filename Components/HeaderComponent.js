import React from 'react';
import { Appbar } from 'react-native-paper';
import {Icon} from 'react-native-vector-icons';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


const MenuIcon = (props) => {
    return(
        <Icon 
            name='menu' 
            size={24}
            color='white'
            onPress={() =>
                props.navigation.toggleDrawer()}
        />
    );
}

export const AppBarHeader = (props) => {
    var title = String;
    title = props.title
    return(
        <Appbar.Header>
            <Appbar.Content title = {title} />
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>
    );
}

export const ChatBarHeader = (props) => {
    var title = props.title
    console.log(props);
    return(
        <Appbar.Header>            
            <Appbar.BackAction onPress = {() => props.navigation.goBack()}/>
            <Appbar.Content title = {title}/>
        </Appbar.Header>
    );
}

 
