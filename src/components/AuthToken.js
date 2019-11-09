import React from 'react';
import {
    AsyncStorage
} from 'react-native';

export const saveToken = async (t) => {
    try {
        await AsyncStorage.setItem('token', t);
    } catch (error) {
        // log error
        console.log(error);
    }
}

export const getToken = async () => {
    let token = '';
    try {
        console.log("in getToken");
        token = await AsyncStorage.getItem('token');
        return(token)
    } catch (error) {
        console.log(error);
    }
    console.log("returning from getToken");
}

export const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.log(error);
    }
}