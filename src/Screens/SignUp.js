import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import SignUpForm from '../components/SignUpForm';
import {KeyboardAvoidingView} from 'react-native';


export default class Login extends Component {
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../images/49er_logo.png')}
                    />

                    <Text style={styles.title}>Niner Chat </Text>
                    <Text style={styles.subTitle}>Connect | Learn | Grow</Text>
                </View>
                <View style={styles.formContainer}>
                    <SignUpForm navigation={this.props.navigation} />
                </View>

            </View>
            </KeyboardAvoidingView>
        );
    }
}


//styles 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1B',

    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 10
    },
    logo: {
        width: 200,
        height: 200,
        paddingBottom: 10
    },
    title: {
        color: "#fff",
        marginTop: 20,
        width: 200,
        textAlign: 'center',
        opacity: 0.8,
        fontSize: 27
    },
    subTitle:{
            color: "#fff",
            marginTop: 20,
            width: 200,
            textAlign: 'center',
            opacity: 0.8,
            fontSize: 17
    }
});