import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  Dimensions
} from "react-native";
import Login from "./src/Screens/login";
import Chat from "./src/Screens/chat";
import HomeScreen from "./src/Screens/HomeScreen";
import SignUp from "./src/Screens/SignUp";

import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const WIDTH = Dimensions.get("window").width;
const AppStack = createStackNavigator(
  {
    HomeRoute: HomeScreen,
    ServerRoomRoute: Chat,
    SignUpRoute: SignUp
  },
  {
    headerMode: "Chat"
  }
);

const AuthStack = createStackNavigator(
  {
    LoginRoute: Login
  },
  {
    headerMode: "LoginRoute"
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    App: AppStack
  }),
  createDrawerNavigator({
    Home:HomeScreen
    
  })
);
