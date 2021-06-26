import React, { useState, useLayoutEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";
import { Platform } from "react-native";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameAnonimous, setNameAnonimous] = useState("");

  const ScrollViewRef = useRef();
  const scrollToEndFn = () => {
    ScrollViewRef.current.scrollToEnd();
  };

  useLayoutEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user && !user.isAnonymous) {
        navigation.replace("Chat", { guestName: nameAnonimous });
      }
    });
    return unsuscribe;
  }, []);

  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const signInAnonimous = async () => {
    if (nameAnonimous.trim() == "") {
      return alert("Please enter a name");
    }
    try {
      await auth.signInAnonymously();
      navigation.replace("Chat", { guestName: nameAnonimous });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView ref={ScrollViewRef}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        />
        <Input
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          label="Email"
          leftIcon={{ type: "material", name: "email", color: "dodgerblue" }}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          label="Password"
          leftIcon={{ type: "material", name: "lock", color: "dodgerblue" }}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button title="Login" buttonStyle={styles.button} onPress={signIn} />

        <Button
          title="Register"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("Register")}
        />
        <Text style={{ fontSize: 18, margin: 5, color: "grey" }}>
          Or chat as a guest
        </Text>
        <Input
          placeholder="Name"
          value={nameAnonimous}
          onChangeText={(text) => setNameAnonimous(text)}
          label="Name"
          leftIcon={{
            name: "person",
            color: "dodgerblue",
          }}
          autoCapitalize="sentences"
          autoCorrect={false}
          onFocus={scrollToEndFn}
        />
        <Button
          title="Anonimous"
          buttonStyle={styles.button}
          onPress={signInAnonimous}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
  },
  button: {
    margin: 8,
    backgroundColor: "dodgerblue",
    width: 300,
  },
});
export default LoginScreen;
