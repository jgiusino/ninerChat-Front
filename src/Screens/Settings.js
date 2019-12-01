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
import { FlatList } from "react-native-gesture-handler";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      username: "",
      email: "",
      college: "",
      major: "",
      admin: ""
    };
  }

  _fetchToken = async () => {
    let t = await getToken();
    this.setState({ token: t });
    console.log("Settings Token: " + this.state.token);
  };

  _fetchProfile = () => {
    let url = global.URL + "/api/profile";
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
        console.log(r.name);
        console.log(r.email);
        console.log(r.admin);
        console.log(r.major); //major is not being stored on signup
        console.log(r.college); //college is not being stored on signup
        this.setState({username: r.name});
        this.setState({email: r.email});
        this.setState({admin: r.admin});
        this.setState({major: r.major});
        this.setState({college: r.college});

      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this._navLister = this.props.navigation.addListener("didFocus", () => {
      this._fetchToken().then(() => {
        this._fetchProfile();
      });
    });
  }
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
  },
  
});
