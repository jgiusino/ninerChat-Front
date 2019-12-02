import React, { Component } from "react";
import { View, Text } from "react-native";

import { deleteToken } from "../components/Storage";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.removeToken();
  }

  removeToken() {
    deleteToken();
    this.props.navigation.navigate("Login");
    console.log("Logged out user"); 
  }

  render() {
    return (
      <View>
        <Text>Logged Out</Text>
      </View>
    );
  }
}
