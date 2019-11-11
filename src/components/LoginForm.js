import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  Button
} from "react-native";
import { KeyboardAvoidingView } from "react-native";

import Axios from "axios";

import {saveToken} from "./Storage";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  //handles state change key val pair
  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  //submit form class for log in
  submit() {
    let url = global.URL + "/api/login";
    let collection = {
      email: this.state.email,
      password: this.state.password
    };
    console.log('Collection:' + JSON.stringify(collection));
    Axios({
      method: 'post',
      url: url,
      data: collection
    }).then(response =>{
      let token = response.data.token;
      console.log("token:" +response.data.token);
      saveToken(token);
      this.props.navigation.navigate("Loading");
    }).catch(error => {
      console.log(error)
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <TextInput //Email input box
            placeholder="Email: "
            placeholderTextColor="rgba(255,255,255,0.6)"
            returnKeyType="next"
            keyboardType="email-address"
            style={styles.input}
            value={this.state.email}
            onChangeText={this.handleChange("email")}
          />
          <TextInput //Password input box
            placeholder="Password: "
            placeholderTextColor="rgba(255,255,255,0.6)"
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            value={this.state.password}
            onChangeText={this.handleChange("password")}
          />

          <TouchableOpacity
            onPress={() => this.submit()}
            style={styles.buttonLogin}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUp")}
            style={styles.buttonSignup}
          >
            <Text style={styles.buttonText}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

//styling for form

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginBottom: 20,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },

  buttonLogin: {
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    //backgroundColor: "#D4AF37",
    backgroundColor: "#9a8648",
    marginBottom: 20,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    //borderColor: "#D4AF37",
    borderColor: "#9a8648",
    borderWidth: 1
  },
  buttonSignup: {
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    //backgroundColor: "#21B452",
    backgroundColor: "#006940",
    marginBottom: 20,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 10,
    //borderColor: "#21B452"
    borderColor: "#006940",
    borderWidth: 1
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700"
  }
});
