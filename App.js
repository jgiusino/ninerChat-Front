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
import Home from "./src/Screens/Home";
import SignUp from "./src/Screens/SignUp";
import AuthLoading from "./src/Screens/AuthLoading";
import SignOut from "./src/components/Signout"

import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignOut from "./src/components/Signout";

// URL variable
global.URL = "http://10.0.2.2:5000";

// Get screen dimensions to adjust width
const WIDTH = Dimensions.get("window").width;

const AuthStack = createStackNavigator(
  // Routes
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null // removes the header
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        header: null // removes the header
      }
    },
    Loading: {
      screen: AuthLoading,
      navigationOptions:{
        header: null
      }
    }
  }
  // Config
);

const AppDrawer = createDrawerNavigator(
  // Routes
  {
    Home: {
      screen: Home
    },
    logout: {
      screen: SignOut
    },
    Chat: {
      screen: Chat,
    }
  },
  // Config
  {
    drawerWidth: WIDTH * 0.7,
    drawerBackgroundColor: "#565656",
    contentOptions: {
      inactiveTintColor: "#ffff"
    }
  }
);

const AppSwitch = createSwitchNavigator(
  // Routes
  {
  
    Auth: {
      screen: AuthStack
    },
    App: {
      screen: AppDrawer,
    },
  }
  // Config
);

/*
AppContainer is created by passing AppSwitch, which is a SwitchNavigator
that contains the AuthStack for authorization (Login, SignUp) and
AppDrawer which is used to switch between MainTabs and go back to Login.
MainTabs has routes to Home and Chat screens.
AppContainer -> AppSwitch [AuthStack,AppDrawer]
AppDrawer -> [MainTabs, AuthStack]
AuthStack -> [Login,SignUp]
MainTabs -> [Home, Chat]
*/
const AppContainer = createAppContainer(AppSwitch);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
