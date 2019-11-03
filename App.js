import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Login from './src/Screens/login';
import Chat from './src/Screens/chat';
import HomeScreen from './src/Screens/HomeScreen';
import SignUp from './src/Screens/SignUp';

import {
  createAppContainer,
   createSwitchNavigator,
   createDrawerNavigator
  } from 'react-navigation';



 import {
  createStackNavigator
} from 'react-navigation-stack';

const AppStack =  createStackNavigator(
  {
    HomeRoute: HomeScreen,
    //ServerRoomRoute: Chat,
    ServerRoomRoute: HomeScreen,
    SignUpRoute: SignUp
  },
  {
    headerMode: 'Chat'

  }
);

const AuthStack = createStackNavigator(
  {
    LoginRoute: Login
  },
  {
    headerMode: 'LoginRoute'

  }
);



export default createAppContainer(createSwitchNavigator(
  {

    Auth: AuthStack,
    App: AppStack,


  }
));
