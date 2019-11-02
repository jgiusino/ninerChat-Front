import React from 'react';

import { Component,View,StyleSheet } from 'react-native';
import {NativeRouter,Switch,Route} from 'react-router-native';
import Login from './src/Screens/login';
import HomeScreen from './src/Screens/HomeScreen';
import Chat from './src/Screens/chat';





export default class App extends React.Component{
  render(){
  return(

    <Chat />
  );
}
}

