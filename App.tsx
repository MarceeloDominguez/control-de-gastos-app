import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation/Navigation";
import { AppContext } from "./src/context/AppContext";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppContext>
        <Navigation />
      </AppContext>
    </NavigationContainer>
  );
}
