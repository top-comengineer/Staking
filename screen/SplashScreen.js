import React from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native-web";

const SplashScreen = () => {
  // state of activityIndicator animation
  const [animating, setAnimating] = React.useState(true);
  return (
    <View>
      {/* <Image
        style={{ width: "90%", resizeMode: "contain", margin: 30 }}
        source={require("../assets/splash.png")}
      /> */}
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(3, 41, 85, 0.5)",
  },
  activityIndicator: {
    alignItems: "center",
    height: "80px",
  },
});
