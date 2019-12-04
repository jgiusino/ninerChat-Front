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
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      privateRoom: [],
      publicRoom: [],
      isLoading: true
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
        console.log(r.private_rooms);
        console.log(r.public_rooms);
        this.setState({ privateRoom: r.private_rooms });
        this.setState({ publicRoom: r.public_rooms });
        this._isMounted = true;
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    
    this._navLister = this.props.navigation.addListener("didFocus", () => {
        this._fetchToken().then(() => {
          this._fetchRooms();
          if (this._isMounted) {
            this.setState({isLoading: false});
          }
        });
      
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let publicData = [
      {
        title: "Public Rooms",
        data: this.state.publicRoom
      }
    ];
    let privateData = [
      {
        title: "Private Rooms",
        data: this.state.privateRoom
      }
    ];
    return (
      <View style={styles.container}>
        <Hamburger navigation={this.props.navigation} />

        <SectionList
          sections={publicData}
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
        <SectionList
          sections={privateData}
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
    alignItems: "center",
  },
  chat: {
    backgroundColor: "#006940",
    color: "white",
    marginTop: "3%",
    maxWidth: 200,
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
