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

import GoogleIcon from "../assets/img/google.png";

const RegisterForm = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPhoneNum) {
      alert("Please fill Phone Number");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    setLoading(true);
    let dataToSend = {
      email: userEmail,
      password: userPassword,
      phone: userPhoneNum,
    };
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
          <Text style={styles.noteTitle}>Phone Number</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(UserPhoneNum) => setUserPhoneNum(UserPhoneNum)}
            autoCapitalize="none"
            keyboardType="phone-pad"
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
        </View>
        <View style={styles.SectionStyle}>
          <Text style={styles.noteTitle}>Confirm Password</Text>
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
        </View>
        <View style={{ marginBottom: 30 }}>
          <Text style={{ color: "white", fontSize: 10, textAlign: "center" }}>
            By contrinuing you agree with our
            <Text style={{ color: "#032955" }}>
              Terms of Service and Privacy Policy
            </Text>
          </Text>
        </View>
        {errortext != "" ? (
          <Text style={styles.errorTextStyle}>{errortext}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleSubmitPress}
        >
          <Text style={styles.buttonTextStyle}>Create Account</Text>
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
          <Text style={styles.buttonTextStyle1}>Create with Google</Text>
        </TouchableOpacity>
        <Text
          style={styles.registerTextStyle}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={{ color: "white" }}>
            Already have an account? &nbsp;
          </Text>
          Login
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
};
export default RegisterForm;

const styles = StyleSheet.create({
  mainBody: {
    width: "100%",
    color: "white",
    marginTop: 180,
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
