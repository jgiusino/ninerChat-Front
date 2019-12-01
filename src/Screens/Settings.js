import React from "react";
import { getToken } from "../components/Storage";
import Axios from "axios";
import {
    View,
    Text,
    StyleSheet,
    SectionList,
    TouchableOpacity,
    Image,
    Button,
    TouchEvent,
    Alert
  } from "react-native";
  import Hamburger from "../components/Hamburger";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ""
    };
  }

  _fetchToken = async () => {
    let t = await getToken();
    this.setState({ token: t });
    console.log("Settings Token: " + this.state.token);
  };

  _fetchProfile = () => {
    let url = global.URL + "api/profile";
    let collection = {
      token: this.state.token
    };
    console.log(JSON.stringify(collection));
    Axios({
      method: "post",
      url: url,
      data: collection
    })
      .then(response => {
          let r = response.data;
          console.log(r);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
 
    return (
      <View style={styles.container}>
        <Hamburger navigation={this.props.navigation} />

       
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1A1A1B",
      paddingTop: 10
    }
  });