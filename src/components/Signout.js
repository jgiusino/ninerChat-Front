import React, { Component } from "react"
import {
    View,
    Text,
    AsyncStorage

} from "react-native"
import { getToken, deleteToken } from './Storage'

export default class SignOut extends Component {
    constructor(props) {
        super(props);
        this.removeToken();
    }

    removeToken() {
        let token = getToken();
        token.deleteToken();
        if(token == 'none'){
        this.props.navigation.navigate('Login');
        }
    }
}
