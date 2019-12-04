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
  Alert,
  SafeAreaView
} from "react-native";
import Hamburger from "../components/Hamburger";
import { TextInput, FlatList } from "react-native-gesture-handler";
import { KeyboardAvoidingView } from "react-native";

export default class Update extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      username: "",
      email: "",
      college: "",
      major: "",
      admin: "",
      isLoading: true
    };
  }
  //handles state change key val pair
  handleChange = key => val => {
    this.setState({ [key]: val });
  };

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
        this.setState({ username: r.name });
        this.setState({ email: r.email });
        this.setState({ admin: r.admin });
        this.setState({ major: r.major });
        this.setState({ college: r.college });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
  
    this._navLister = this.props.navigation.addListener("didFocus", () => {
      this._fetchToken().then(() => {
        this._fetchProfile();
        if (this._isMounted) {
          this.setState({ isLoading: false });
        }
      });
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  save = ev => {
    let url = global.URL + "/api/profile";
    let update = {
      token: this.state.token,
      name: this.state.username,
      college: this.state.college,
      major: this.state.major
    };
    console.log("Info to be updated:" + JSON.stringify(update));
    Axios({
      method: "post",
      url: url,
      data: update
    })
      .then(response => {
        this.props.navigation.navigate("Settings");
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
        <Text style={styles.title}>PREVIEW && NOT WORKING</Text>
      
        
          <TouchableOpacity
            onPress={() => this.save()}
            style={styles.buttonSignup}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1B",
    padding: 50
  },
  list: {
    paddingHorizontal: 17
  },
  itemBox: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
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

  buttonSignup: {
    height: 40,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#006940",
    color: "#fff",
    position: "absolute",
    bottom: 1,
    right: 0,
    left: 0,
    borderColor: "#006940",
    paddingHorizontal: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center"
  },

  item: {
    backgroundColor: "#006940",
    color: "white",
    width: 200,
    marginTop: "3%",
    textAlign: "center",
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 20
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: "10%",
    marginLeft: "4%"
  },
  title: {
    color: "white",
    fontSize: 24,
    marginTop: "15%",
    marginLeft: "25%"
  }
});
