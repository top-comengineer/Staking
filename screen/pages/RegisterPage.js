import React from "react";
import { View, Text } from "react-native";
import RegisterForm from "../auth/RegisterForm";

const RegisterPage = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(3,41,85,0.5)",
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          top: 40,
          left: 20,
          backgroundColor: "rgba(241, 241, 241, 0.3)",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            position: "absolute",
            top: -7,
            left: 14,
            width: 41.6,
            height: 74.4,
            fontSize: 60,
            lineHeight: 80,
          }}
        >
          C
        </Text>
      </View>
      <Text
        style={{
          fontWeight: "700",
          lineHeight: 19,
          fontSize: 19,
          position: "absolute",
          left: 20,
          top: 160,
          color: "#032955",
        }}
      >
        Create an Account
      </Text>
      <Text
        style={{
          position: "absolute",
          left: 20,
          top: 189,
          fontSize: 12,
          fontWeight: "500",
          color: "white",
        }}
      >
        Start your journey by creating an account
      </Text>
      <RegisterForm />
    </View>
  );
};

export default RegisterPage;
