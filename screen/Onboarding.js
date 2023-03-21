import React from "react";
import { View } from "react-native";
import ViewPager from "@react-native-community/viewpager";

// import Page from "./components/Page";

const Onboarding = () => {
  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }}>
        <View key="1">{/* <Page /> */}</View>
      </ViewPager>
    </View>
  );
};

export default Onboarding;
