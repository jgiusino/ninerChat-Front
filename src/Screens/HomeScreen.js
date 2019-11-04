import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Image,
  Button,
  TouchEvent
} from "react-native";
import Hamburger from "../components/Hamburger";

const DATA = [
  {
    title: "Public Chats",
    data: ["Woodward", "Comp Sci", "Union"]
  },
  {
    title: "My Chats",
    data: ["4155-001", "3160-003", "3155-002"]
  }
];

function ItemButton({ title }) {
  return (
    <View style={styles.itemBox}>
      <TouchableOpacity>
        <Text style={styles.chat}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Hamburger />

        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ItemButton title={item} />}
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
    backgroundColor: "#9559fe",
    color: "white",
    marginTop: "3%",
    width: 200,
    textAlign: "center",
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
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
