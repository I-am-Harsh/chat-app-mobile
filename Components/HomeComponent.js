import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    
    confirmCreds = () => {
        this.props.navigation.navigate('Menu');
    }

    render(){
        
        return(
            <View style = {Styles.main}>
                <Text>
                    Login to continue
                </Text>
                <Button
                    title = 'Login'
                    onPress = {this.confirmCreds}
                />
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
export default Home;
