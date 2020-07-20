import React, { useState } from 'react';
import { Button, Menu, Divider, Provider, Appbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import { Dimensions, Platform } from 'react-native';


const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const mapStateToProps = state => {
    return {
      rooms : state.rooms
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRoom : (name) => dispatch(addRoom(name))
})


export const AppBarHeader = (props) => {
    
    // params define
    var title = String;
    var disableOption = Boolean;
    
    // check if params supplied
    title = props.title;
    var disableOption = false;
    if(props.disableOption){
        disableOption = true
    }

    // redux
    const rooms = useSelector(state => state.rooms);
    const dispatch = useDispatch();
    // console.log('App bar header : ', rooms);


    // menu state
    const [visible, setVisible] = useState(false);
    const openMenu = () => {
        setVisible(true);
    }

    // close menu 
    const closeMenu = () => setVisible(false);

    const style = {
        title : {
            ...Platform.select({
                ios : {
                    paddingLeft : Dimensions.get('window').width/5
                }
            })
        }
    }

    return(
        <Appbar.Header>
            <Appbar.Action icon = 'menu' onPress = {() => props.navigation.toggleDrawer()}/>
            <Appbar.Content title = {title} style = {style.title}/>
            <Provider>
                <Menu
                    visible = {visible}
                    onDismiss = {closeMenu}
                    anchor = {
                        <Appbar.Action icon={MORE_ICON} onPress={() => openMenu()} style = {{alignSelf : 'flex-end'}} color = 'white' />
                    }
                    contentStyle = {{zIndex : 2}}
                >
                    <Menu.Item 
                        onPress={() => dispatch({type : 'deleteAllRooms'})} 
                        title="Delete All Rooms"

                    />
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

 
