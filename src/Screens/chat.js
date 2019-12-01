import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button
} from "react-native";
import Moment from 'moment';

import { KeyboardAvoidingView } from "react-native";
import { getRoom, getToken } from "../components/Storage";

import Axios from "axios";
import { Header } from "react-navigation-stack";
import Hamburger from '../components/Hamburger';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: "",
      token: "",
      room: null,
      text: "",
      mID: "",
    };
  }

  //fetches the bearer token for the user
  _fetchToken = async () => {
    let t = await getToken();
    this.setState({ token: t });
    console.log("Chat Token:" + this.state.token);
  };
  /*
    POST request updates state to display messages for this chat room
   */
  _fetchRoom = async () => {
    let roomObject = await getRoom();
    this.setState({ room: JSON.parse(roomObject) });
    console.log(JSON.stringify(this.state.room));

    // get room messages
    let url = global.URL + "/api/room/" + this.state.room.id + "/messages";
    let collection = {
      token: this.state.token,
    };
    Axios({
      method: "post",
      url: url,
      data: collection
    })
      .then(response => {
        let r = response.data;
        console.log(response.data)
        this.setState({ messages: r.messages });
        console.log(JSON.stringify(r.messages));
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    // listens to see if focus changed, fetch data, and rerender page
    this._navLister = this.props.navigation.addListener("didFocus", () => {
      this._fetchData();
    });
  }

  _fetchData() {
    // fetchs token and room data
    this._fetchToken().then(() => {
      this._fetchRoom();
    });
  }

  /*
  POST request to server when user hits send
  See lines 136-139 
*/

  _onPress() {
    let url = global.URL + "/api/room/" + this.state.room.id + "/messages";
    let collection = {
      token: this.state.token,
      text: this.state.text
    };
    console.log("Collection:" + JSON.stringify(collection));
    Axios({
      method: "post",
      url: url,
      data: collection
    })
      .then(response => {
        console.log("PostMessage:" + response.data);
      })
      .catch(error => {
        console.log(error);
      });
    this._fetchData();

    this.state.text = "";
  }

  //handles state change key val pair
  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            data={this.state.messages}
            //where function Item is rendered
            renderItem={({ item }) => (
              <Item
                name={item.name}
                text={item.text}
                time={item.time}
                type={item.type}
              />
            )}
            keyExtractor={item => "id" + item.id}
          />
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid="transparent"
                keyboardType="default"
                value={this.state.text}
                onChangeText={this.handleChange("text")}
              />
            </View>

            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => {
                this._onPress();
              }}
            >
              <Image
                source={{
                  uri: "https://png.icons8.com/small/75/ffffff/filled-sent.png"
                }}
                style={styles.iconSend}
              />
            </TouchableOpacity>
          </View>
        </View>
       
      </KeyboardAvoidingView>
    
    );
  }
}

/*
  Function definition takes text, name, time and type parameters 
  and returns their values. This is called inside the render method above.
  
  See lines 110 - 117 @chat.js
*/

function Item({ text, name, time, type }) {
  let itemStyle = type === "in" ? styles.itemIn : styles.itemOut;
  let messageStyle = type === "in" ? styles.messagesIn : styles.messagesOut;
  let nameStyle = type === "in" ? styles.nameIn : styles.nameOut;
  let messageTime = type === "in" ? styles.subtext : styles.noSubtext;
  return (
    <View style={[styles.messageContainer]}>
    {type == "in"}
    <Text style={[nameStyle]}>{name}</Text>
    <Text style={messageTime}>{Moment(time).format('DD MMM LT')}</Text>
    <View style={[styles.item, itemStyle]}>
      <View>
        <Text style={[messageStyle]}>{text}</Text>
      </View>
    
   
      {type == "out"}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1B"
  },
  //user name styling for incoming messages
  nameIn: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 1
  },
  //hides username for current user
  nameOut: {
    display: "none"
  },
  //color and font size for all incoming messages
  messagesIn: {
    color: "#fff",
    fontSize: 15
  },
  noSubtext:{
    display: "none"
  },
  //default black color and font size for all outgoing messages
  messagesOut: {
    fontSize: 15
  },
  subtext: {
    color: "#939393",
    fontSize: 10,
    textDecorationLine: "none"
  },
  list: {
    paddingHorizontal: 17
  },
  //size color and positioning for the header
  title: {
    color: "white",
    fontSize: 24,
    marginTop: "15%",
    marginLeft: "25%"
  },
  footer: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#1A1A1B",
    paddingHorizontal: 10,
    padding: 5
  },
  btnSend: {
    backgroundColor: "#1A1A1B",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center"
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: "center"
  },
  inputContainer: {
    backgroundColor: "#424647",
    borderRadius: 30,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
    color: "#fff"
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20
  },
  itemIn: {
    alignSelf: "flex-start"
  },
  itemOut: {
    alignSelf: "flex-end",
    backgroundColor: "#59c2fe"
  },

  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#424647",
    width: 250,
    maxHeight: 250,
    padding: 15,
    borderRadius: 15
  }
});
