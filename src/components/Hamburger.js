import React from 'react';
import {StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class Hamburger extends React.Component{
    render(){
        return(
            <Ionicons
                name="md-menu"
                color="#ffff"
                size={32}
                style={styles.burgerIcon}
                onPress={() => {}}
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