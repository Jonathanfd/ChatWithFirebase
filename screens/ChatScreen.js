import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { auth, db } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { GiftedChat, Avatar } from "react-native-gifted-chat";
import { findDOMNode } from "react-dom";

function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const guestName = route.params.guestName;

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);

  useEffect(() => {
    const unsuscribe = db
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsuscribe;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Image
            source={require("../assets/usericon.png")}
            style={{ height: 30, width: 30 }}
          />
        </View>
      ),

      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 30 }} onPress={signOut}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
          {guestName || auth?.currentUser?.displayName}
        </Text>
      ),
    });
  }, []);

  const onSend = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      const { _id, createdAt, text, user } = messages[0];

      db.collection("chats").add({
        _id,
        createdAt,
        text,
        user,
      });
    },
    [messages]
  );

  // const signOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.replace("Login");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const signOut = async () => {
    try {
      await auth.signOut();
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const showUserInfo = () => {
    alert(auth.currentUser.displayName);
  };

  const customAvatar = (props) => {
    return (
      <Avatar
        {...props}
        textStyle={{ color: "white", fontWeight: "500", fontSize: 20 }}
        imageStyle={{ left: { backgroundColor: "green" } }}
        onPressAvatar={showUserInfo}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        textInputProps={{ autoCorrect: false }}
        messagesContainerStyle={{ backgroundColor: "#fff" }}
        renderUsernameOnMessage
        renderAvatarOnTop
        renderAvatar={(props) => customAvatar(props)}
        messages={messages}
        onSend={(message) => onSend(message)}
        timeTextStyle={{ left: { fontSize: 12 }, right: { fontSize: 12 } }}
        user={{
          _id: auth?.currentUser?.uid,
          name: auth?.currentUser?.isAnonymous
            ? guestName
            : auth?.currentUser?.displayName,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
});
export default ChatScreen;
