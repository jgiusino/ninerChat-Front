import React, { Component } from "react";
import {
    View,
    Text,
    AsyncStorage
} from 'react-native';

import {getToken} from "../components/AuthToken";

export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this.checkToken();
    };

    checkToken() {
        let token = getToken();
        if (token === 'none') {
            this.props.navigation.navigate('App');
        } else {
            this.props.navigation.navigate('Auth');
        };
    };

    render() {
        return(
            <View>
                <Text>Auth Loading </Text>
            </View>
        );
    };
}
