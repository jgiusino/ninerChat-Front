import React, { Component } from "react"
import {
    View,
    Text,
    AsyncStorage

} from "react-native"
import { getToken, deleteToken } from './Storage'


//this class is called to remove the bearer token and redirects to login page 
// after verifying that the token is empty

export default class SignOut extends Component {
    constructor(props) {
        super(props);
        this.removeToken();
    };

    removeToken() {
        deleteToken();
        //print token to the console screen
        console.log("Token:" + token);
        if (token == 'none') {
            this.props.navigation.navigate('Login');
        } else {
            console.log("There was an error deleting the token"); //replace this with actual error handling later
        }
    };
}
