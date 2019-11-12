import React from "react";
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
import { getToken, setRoom } from "../components/Storage";

import Axios from "axios";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      rooms: []
    };
  }

  _onPress = room => {
    console.log("id:" + room.id);
    console.log("name:" + room.name);
    let roomObject = {
      id: room.id,
      name: room.name,
      messages: []
    };
    setRoom(JSON.stringify(roomObject)).then(() => {
      this.props.navigation.navigate("Chat", { date: new Date() });
    });
  };

  _fetchToken = async () => {
    let t = await getToken();
    this.setState({ token: t });
    console.log("Home Token:" + this.state.token);
  };

  _fetchRooms = () => {
    let url = global.URL + "/api/room";
    let collecton = {
      token: this.state.token
    };
    console.log(JSON.stringify(collecton));
    Axios({
      method: "post",
      url: url,
      data: collecton
    })
      .then(response => {
        let r = response.data;
        this.setState({ rooms: r.rooms });
        console.log("rooms:" + JSON.stringify(this.state.rooms));
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this._navLister = this.props.navigation.addListener("didFocus", () => {
      this._fetchToken().then(() => {
        this._fetchRooms();
      });
    });
  }

  componentWillReceiveProps() {
    console.log("rerender...");
  }

  render() {
    let data = [
      {
        title: "Rooms",
        data: this.state.rooms
      }
    ];
    return (
      <View style={styles.container}>
        <Hamburger navigation={this.props.navigation} />

        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemBox}>
                <TouchableOpacity
                  onPress={() => {
                    this._onPress(item);
                  }}
                >
                  <Text style={styles.chat}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.title}>{title}</Text>
          )}
        />
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
  itemBox: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  chat: {
    //backgroundColor: "#00713d",
    backgroundColor: "#006940",
    color: "white",
    marginTop: "3%",
    width: 200,
    textAlign: "center",
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 20
  },
  title: {
    color: "white",
    fontSize: 24,
    marginTop: "15%",
    marginLeft: "25%"
  },
  header: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: "10%",
    marginLeft: "4%"
  }
});
