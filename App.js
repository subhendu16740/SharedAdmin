import React, { useCallback } from "react";
import "react-native-gesture-handler";
import { decode, encode } from "base-64";
import Fire from "./Fire"
const firebase = require('firebase')
require("firebase/firestore");
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  List,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
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



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      user: {},
      lists: [],
      loading: true,
    };
  }
  getLists = async() =>{
    await firebase.auth().signInAnonymously()
    const db = firebase.firestore();
    const ref =db.collection("Unauthorized")
    let lists=[]
      const snapshot=await ref.get()
      snapshot.forEach((doc)=>{
        lists.push(doc.data())
      })
      this.setState({lists})
     // console.log(this.state.lists)
        }


        handlePost =(post)=>{
          //console.log(post.name)
          Fire.shared.addPost({PickerValue:post.PickerValue,
                               name:post.name,
                               author:post.author,
                               publication:post.pub,
                               edition:post.edition,
                               mrp:post.mrp,
                               lendamount:post.lendamount,
                               localUri:post.image
                              })
                               .then(ref=>{
                                  this.setState({
                                      PickerValue:"",
                                      name:"",
                                      image:null,
                                      author:"",
                                      pub:"",
                                      edition:"",
                                      mrp:"",
                                      lendamount:"",
                                      
                                  })
                                  this.props.navigation.goBack()
                              }).catch(error =>{
                                  alert(error.message);
                              })
      }

      
componentDidMount() {
    this.getLists();
  }

     renderPost = (post) => {
       console.log(post.name)
       return (
         <View style={styles.feedItem}>
           <View style={{ flex: 1 }}>
             <View style={{
                 flexDirection: "row",
                 justifyContent: "space-between",
                 alignItems: "center",
             }}
             >
               <View>
                 <Text 
                 style={styles.name}
                 >{post.name}
                   </Text>
                 <Text style={styles.timestamp}>
                   {moment(post.timestamp).fromNow()}
                 </Text>
               </View>

            <Ionicons name="ios-more" size={24} color="#73788B" />
            <Text style={styles.postUI}>{post.PickerValue}</Text>
             </View>
             <View style={{ flexDirection: "row", justifyContent:"space-between" }}>
             <Text style={styles.postUI}>{post.author}</Text>
             <Text style={styles.postUI}>{post.publication}</Text>
             </View>
             <View style={{ flexDirection: "row", justifyContent:"space-between" }}>
             <Text style={styles.postUI}>{post.edition}</Text>
             <Text style={styles.postUI}>{post.mrp}</Text>
             <Text style={styles.postUI}>{post.lendamount}</Text>
             </View>
             <Image
               source={{uri:post.image}}
              style={styles.postImage}
               resizeMode="cover"
             />
             <View style={{ flexDirection: "row", justifyContent:"space-between" }}>
               <View>
                 <Button Button color="#F1C40F" title="DECLINE"/>
               </View>
               <View style={{marginLeft:220}}>
                 <Button color="#F1C40F" title="ACCEPT" onPress={this.handlePost()} />
               </View>
           </View>
         </View>
         </View>
       );
   };


  render() {
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
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={(item) => item.id}
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
    paddingTop: 32,
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
  postUI: {
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
