import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import chalk from 'chalk';
import { darkMode } from '../redux/ActionCreators';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
      dark : state.darkMode
    }
}
  
const mapDispatchToProps = (dispatch) => ({
    darkMode : (mode) => dispatch(darkMode(mode))
})

const ctx = new chalk.Instance({ level: 3 });
const log = (text) => console.log(ctx.cyanBright(text));

class ChangeUI extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log('Dark : ', this.props.dark);
    }

    render(){
        return(
            <View>
                <Button onPress = {() => {this.props.darkMode(true)}}>
                    Dark Mode
                </Button>
            </View>
        );
    }
}

export const changeUI = connect(mapStateToProps, mapDispatchToProps)(ChangeUI);

export class ChangeName extends Component {

    state = {
        name: ''
    }

    componentDidMount() {
        this.getData();
    }

    changeName = () => {
        Keyboard.dismiss();
        AsyncStorage.setItem('name', this.state.name);
    }

    // get data from storage
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('name')
            if (value !== null) {
                console.log(ctx.green('getData'))
                this.setState({name : value});
                console.log(ctx.blackBright(this.state.name))
            }
        }
        catch (e) {
            log('Error');
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={Styles.main}>
                    <Text style={Styles.padding}>
                        This name will appear when you will chat.
                    </Text>
                    <TextInput
                        label='Screen Name'
                        mode='outlined'
                        value={this.state.name}
                        onChange={(text) => this.setState({name : text.nativeEvent.text})}
                        onSubmitEditing={(text) => this.changeName(text)}
                    />
                    <Button mode='outlined'
                        style={{ marginTop: 10, borderWidth: 2 }}
                        onPress={() => this.changeName()}
                    >
                        Change
                    </Button>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}



class Setting extends Component {

    list = [
        {
            title: 'Change Name',
            icon: 'contacts'
        },
        {
            title: 'UI',
            icon: 'flight-takeoff'
        },

    ]
    render() {
        return (
            <View>
                {
                    this.list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            bottomDivider
                            chevron
                            onPress={() => this.props.navigation.navigate(item.title)}
                        />
                    ))
                }
            </View>
        )
    }


}

const Styles = StyleSheet.create({
    main: {
        margin: 50,
        flex: 1
    },
    padding: {
        marginBottom: 10
    }
})
// export default connect(mapDispatchToProps, mapStateToProps)(Setting);
export default Setting;
