import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { auth } from "../firebase";

function registerScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const registerUser = () => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       var user = userCredential.user;
  //       user
  //         .updateProfile({
  //           displayName: name,
  //         })
  //         .then(function () {
  //           // Update successful.
  //         })
  //         .catch(function (error) {
  //           // An error happened.
  //         });
  //       navigation.navigate("Chat");
  //     })
  //     .catch((error) => {
  //       var errorMessage = error.message;
  //       console.log(errorMessage);
  //       // ..
  //     });
  // };
  const registerUser = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = await userCredential.user;
      // Signed in

      user.updateProfile({
        displayName: name,
      });

      navigation.navigate("Chat");
    } catch (error) {
      let errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
        label="name"
        leftIcon={{ type: "material", name: "badge", color: "dodgerblue" }}
        autoCapitalize="words"
        autoCorrect={false}
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

      <Button
        title="Register"
        style={styles.button}
        buttonStyle={{ backgroundColor: "dodgerblue" }}
        onPress={registerUser}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 5,
    width: 300,
  },
});
export default registerScreen;
