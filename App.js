import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./screen/pages/LoginPage";
import RegisterPage from "./screen/pages/RegisterPage";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      {/* <LoginPage /> */}
      <RegisterPage />
    </NavigationContainer>
  );
}
