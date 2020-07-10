import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class Setting extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    // confirmCreds = () => {
    //     this.props.navigation.navigate('Notifications');
    // }

    render(){
        
        return(
            <View style = {Styles.main}>
                <Text>
                    This is Setting
                </Text>
            </View>       
        );
    }

    
}

const Styles = StyleSheet.create({
    main : {
        marginTop : 50,
        marginLeft : 20,
        fontSize : 50
    }
})
export default Setting;
