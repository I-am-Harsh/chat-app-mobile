import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import chalk from 'chalk';

const ctx = new chalk.Instance({level : 3});
const log = (text) => console.log(ctx.cyanBright(text));

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
                <Card>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }}/>
                    <Card.Title title = 'Login/Create Room' subtitle = "If the room doesn't exist one will be created"/>
                    <Card.Content>
                        <TextInput
                            label="Room Name"
                            mode = 'outlined'
                            style = {{marginBottom : 10}}
                        />
                        <TextInput
                            label="Password"
                            mode = 'outlined'
                            secureTextEntry
                            onSubmitEditing = {() => log('submit')}
                        />
                    </Card.Content>
                    <Button mode="contained" style = {Styles.button} onPress={() => log('Join')}>
                        Join
                    </Button>
                </Card>
            </View>       
        );
    }

    
}

const Styles = StyleSheet.create({
    main : {
        marginTop : 20,
        marginLeft : 20,
        marginRight : 20,
        fontSize : 50
    },
    button : {
        margin : 16,
        fontSize : 20
    }
})
export default Home;
