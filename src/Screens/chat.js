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

import NavigationBar from "react-native-navbar";
import { KeyboardAvoidingView } from "react-native";

const leftButtonConfig = {
  title: "Back",
  tintColor: "#ffff"
};

const titleConfig = {
  title: "Chat[some name]",
  tintColor: "#fff"
};

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          date: "9:50 am",
          type: "in",
          message: "Lorem ipsum dolor sit amet"
        },
        {
          id: 1,
          date: "9:50 am",
          type: "in",
          message: "Lorem ipsum dolor sit amet"
        }
      ]
    };
  }

  renderDate = date => {
    return <Text style={styles.time}>{date}</Text>;
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <NavigationBar
            style={styles.navBar}
            title={titleConfig}
            leftButton={leftButtonConfig}
          />

          <FlatList
            style={styles.list}
            data={this.state.data}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={message => {
              console.log(item);
              const item = message.item;
              let inMessage = item.type === "in";
              let itemStyle = inMessage ? styles.itemIn : styles.itemOut;
              return (
                <View style={[styles.item, itemStyle]}>
                  {!inMessage && this.renderDate(item.date)}
                  <View style={[styles.balloon]}>
                    <Text style={styles.messages}>{item.message}</Text>
                  </View>
                  {inMessage && this.renderDate(item.date)}
                </View>
              );
            }}
          />
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid="transparent"
                keyboardType="default"
              />
            </View>

            <TouchableOpacity style={styles.btnSend}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1B"
  },
  navBar: {
    backgroundColor: "#21B452"
  },
  messages: {
    color: "#fff"
  },
  list: {
    paddingHorizontal: 17
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
    borderBottomColor: "#424647",
    backgroundColor: "#424647",
    borderRadius: 30,
    borderBottomWidth: 1,
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
    alignSelf: "flex-start",
    color: "#fff"
  },
  itemOut: {
    alignSelf: "flex-start",
    color: "#fff"
  },
  time: {
    alignSelf: "flex-end",
    margin: 15,
    fontSize: 12,
    color: "#fff"
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#353839",
    borderRadius: 300,
    padding: 5
  }
});
