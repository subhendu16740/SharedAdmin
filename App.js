import React, { useCallback } from "react";
import "react-native-gesture-handler";
import { decode, encode } from "base-64";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  List,
  Image,
  Button,
  TouchableOpacity,
  LayoutAnimation,
  SnapshotViewIOS,
} from "react-native";
import * as firebase from "firebase";
import "@firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
//import Fire from './Fire'
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

firebase.initializeApp({});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      lists: [],
      loading: true,
    };
  }
  getLists = () => {
    var db = firebase.firestore();
    return db
      .collection("classes")
      .get()
      .then(function (querySnapshot) {
        let lists = [];
        querySnapshot.forEach(function (doc) {
          lists.push(doc.data());
        });

        console.log(lists);
        return lists;
      });
  };
  async componentDidMount() {
    let classes = await this.getLists();
    this.setState({
      lists: classes,
    });
    console.log("CDM", classes);
  }

  //   renderPost = (post) => {
  //     return (
  //       <View style={styles.feedItem}>
  //         <View style={{ flex: 1 }}>
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               justifyContent: "space-between",
  //               alignItems: "center",
  //             }}
  //           >
  //             <View>
  //               <Text style={styles.name}>{data.name}</Text>
  //               <Text style={styles.timestamp}>
  //                 {moment(data.timestamp).fromNow()}
  //               </Text>
  //             </View>

  //             <Ionicons name="ios-more" size={24} color="#73788B" />
  //           </View>
  //           <Text style={styles.post}>{data.author}</Text>
  //           <Text style={styles.post}>{data.publication}</Text>
  //           <Text style={styles.post}>{data.edition}</Text>
  //           <Text style={styles.post}>{data.mrp}</Text>
  //           <Image
  //             source={data.image}
  //             style={styles.postImage}
  //             resizeMode="cover"
  //           />
  //           <View style={{ flexDirection: "row" }}>
  //             <Ionicons
  //               name="ios-heart-empty"
  //               size={24}
  //               color="#73788B"
  //               style={{ marginRight: 16 }}
  //             />
  //             <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
  //           </View>
  //         </View>
  //       </View>
  //     );
  //   };

  renderPostTest = (post) => {
    return (
      <View style={styles.feedItem}>
        <Text>{post.name}</Text>
      </View>
    );
  };

  render() {
    console.log("Doc", this.state.lists);

    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ marginTop: 5, marginLeft: 5 }}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.lists}
          renderItem={({ item }) => this.renderPostTest(item)}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4",
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
