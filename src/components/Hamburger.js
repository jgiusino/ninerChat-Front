import React from 'react';
import {StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {DrawerActions} from 'react-navigation-drawer'

export default class Hamburger extends React.Component{
    render(){
        return(
            <Ionicons
                name="md-menu"
                color="#ffff"
                size={32}
                style={styles.burgerIcon}
                onPress={() => {
                    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
                    console.log("Hamburger Pressed!")
                }}
            />
        );
    }

}

const styles = StyleSheet.create({
    burgerIcon: {
        zIndex: 9,
        position: 'absolute',
        top: 40,
        left: 20,
    }
})