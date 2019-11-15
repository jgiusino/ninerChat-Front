import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  Dimensions,
  
} from "react-native";
import Login from "./src/Screens/login";
import Chat from "./src/Screens/chat";
import Home from "./src/Screens/Home";
import SignUp from "./src/Screens/SignUp";
import AuthLoading from "./src/Screens/AuthLoading";
import Settings from "./src/Screens/Settings"
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems } from 'react-navigation-drawer';
import { ScrollView } from "react-native-gesture-handler";

// URL variable
global.URL = "http://10.0.2.2:5000";

// Get screen dimensions to adjust width
const WIDTH = Dimensions.get("window").width;
//header for drawer
const Customdrawercomponent = (props) => (
  <SafeAreaView style={{ flex: 1}}>
    <View style={{height: 150,backgroundColor: '#5d5d5d', alignItems: "center",justifyContent:'center'}}>
     <Image source={require('./src/images/49er_logo.png')} style={{height: 120,width: 120, borderRadius:60}} />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)


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
    Chat: {
      screen: Chat,
    },
    Settings: {
      screen: Settings,
    }
  },
  // Config
  {
    drawerBackgroundColor: '#595959',
    contentOptions: {
      inactiveTintColor: '#ffff'
    },
    contentComponent: Customdrawercomponent
  },
  
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
