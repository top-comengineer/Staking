// Import React and Component
import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { CheckBox } from "@rneui/themed";

// const googleIcon = require("../../assets/imgs/google.png");

import GoogleIcon from "../assets/img/google.png";

const LoginForm = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const [remember, setRemember] = useState(false);

  const passwordInputRef = createRef();

  const toggleCheckbox = () => setRemember(!remember);
  const handleSubmitPress = () => {
    setErrortext("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    setLoading(true);
    let dataToSend = { email: userEmail, password: userPassword };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      body: formBody,
      headers: {
        //Header Defination
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === "success") {
          AsyncStorage.setItem("user_id", responseJson.data.email);
          console.log(responseJson.data.email);
          navigation.replace("DrawerNavigationRoutes");
        } else {
          setErrortext(responseJson.msg);
          console.log("Please check your email id or password");
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <KeyboardAvoidingView enabled>
        <View style={{ alignItems: "center" }}></View>
        <View style={styles.SectionStyle}>
          <Text style={styles.noteTitle}>Email</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.SectionStyle}>
          <Text style={styles.noteTitle}>Password</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
            keyboardType="default"
            ref={passwordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={true}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
          <Text
            style={{
              fontSize: 10,
              color: "#032955",
              marginTop: 6,
              position: "absolute",
              right: 0,
              top: 70,
            }}
          >
            Forgot your password?
          </Text>
          <View
            style={{
              width: 150,
            }}
          >
            <CheckBox
              checked={remember}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
              checkedColor="grey"
              // backgroundColor="rgba(3, 41, 85, 0.5)"
            />
          </View>
          <Text
            style={{
              color: "#032955",
              fontSize: 10,
              position: "absolute",
              top: 92,
              left: 50,
            }}
          >
            Remember Me
          </Text>
          <View style={{ marginBottom: 10 }} />
        </View>
        {errortext != "" ? (
          <Text style={styles.errorTextStyle}>{errortext}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleSubmitPress}
        >
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          or
        </Text>
        <TouchableOpacity style={styles.buttonStyle1} activeOpacity={0.5}>
          <Image
            source={GoogleIcon}
            style={{ width: 25, height: 25, marginRight: 10 }}
          />
          <Text style={styles.buttonTextStyle1}>Login with Google</Text>
        </TouchableOpacity>
        <Text
          style={styles.registerTextStyle}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={{ color: "white" }}>Don't have an account? &nbsp;</Text>
          Register
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
};
export default LoginForm;

const styles = StyleSheet.create({
  mainBody: {
    width: "100%",
    color: "white",
  },
  SectionStyle: {
    flexDirection: "column",
    marginLeft: 35,
    marginRight: 35,
    margin: 7,
    position: "relative",
  },
  buttonStyle: {
    backgroundColor: "#032955",
    color: "#FFFFFF",
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
  },
  buttonStyle1: {
    color: "#032955",
    borderColor: "#032955",
    borderWidth: 2,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonTextStyle: {
    paddingVertical: 10,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  buttonTextStyle1: {
    paddingVertical: 10,
    fontSize: 16,
    color: "#032955",
    fontWeight: "bold",
  },
  inputStyle: {
    color: "white",
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: "#a3b0bf",
    borderColor: "#4d4c4c",
    borderWidth: 1,
  },
  registerTextStyle: {
    color: "#032955",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 10,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  noteTitle: {
    color: "white",
    marginBottom: 10,
  },
});
