import React from 'react';
import { Appbar } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
export const AppBarHeader = () => {
    return(
        <Appbar.Header>
            <Appbar.Content title = 'Rooms'/>
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>
    );
}

export const ChatBarHeader = ({navigation}) => {
    return(
        <Appbar.Header>
            <Appbar.BackAction onPress = {() => navigation.goBack()}/>
            <Appbar.Content title = "Chat"/>
        </Appbar.Header>
    );
}

 
