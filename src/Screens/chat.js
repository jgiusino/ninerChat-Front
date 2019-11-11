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

import { KeyboardAvoidingView } from "react-native";
import { getRoom, getToken } from "../components/Storage";

import Axios from "axios";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages:'',
      token:'',
      room: null,
      text:''
    };
  }

  _fetchToken = async () => {
    let t = await getToken();
    this.setState({token: t});
    console.log('Chat Token:'+ this.state.token);
  };

  _fetchRoom = async () => {
    let roomObject = await getRoom();
    this.setState({room: JSON.parse(roomObject)});
    console.log(JSON.stringify(this.state.room));
    
    // get room messages
    let url = global.URL + "/api/room/"+this.state.room.id+"/messages";
    let collecton = {
      token: this.state.token
    };
    Axios({
      method: 'post',
      url: url,
      data: collecton
    })
    .then(response => {
      let r = response.data;
      this.setState({messages: r.messages});
      console.log(JSON.stringify(r.messages));
    })
    .catch(error => {
      console.log(error)
    });
  };

  componentDidMount() {
    // listens to see if focus changed, fetch data, and rerender page
    this._navLister = this.props.navigation.addListener('didFocus', () =>{
      this._fetchData();
      });
  };

  _fetchData () {
    // fetchs token and room data
    this._fetchToken().then(() => {
      this._fetchRoom();
    });
  }

  _onPress() {
    let url = global.URL + "/api/room/"+this.state.room.id;
    let collection = {
      token:this.state.token,
      text:this.state.text
    };
    console.log('Collection:' + JSON.stringify(collection));
    Axios({
      method: 'post',
      url: url,
      data: collection
    })
    .then(response => {
      console.log('PostMessage:'+response.data);
    })
    .catch(error => {
      console.log(error)
    });
    this._fetchData();
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
            renderItem={({item}) => <Item 
              name={item.name}  
              text={item.text}
              time={item.time}
              type={item.type} 
            />}
            keyExtractor={item => 'id'+item.id}
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

function Item({ text,name,time,type }) {
  let itemStyle = (type === 'in' ? styles.itemIn : styles.itemOut);
  return (
    <View style={styles.item}>
        <Text style={styles.messages}>{name}:{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1B"
  },
  messages: {
    color: "#fff"
  },
  list: {
    paddingHorizontal: 17
  },
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
