import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';


export const ChangeName = ({navigation}) => {
    return(
        <View>
            <Text>
                Change your name here
            </Text>
        </View>
    );
}



class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    test = (item) => {
        console.log(item.title)
        this.props.navigation.navigate(item.title);
    }

    list = [
        {
            title: 'Change Name',
            icon: 'contacts'
        },
        {
            title: 'Trips',
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
                            onPress = {() => this.props.navigation.navigate(item.title)}
                        />
                    ))
                }
            </View>
        )
    }


}

const Styles = StyleSheet.create({
    main: {
        marginTop: 50,
        marginLeft: 20,
        fontSize: 50
    }
})
export default Setting;
