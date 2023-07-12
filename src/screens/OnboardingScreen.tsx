import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { Color } from "../constants/theme";

const { width } = Dimensions.get("window");

const data = [
  {
    image: require("../../assets/onboarding/page-1.png"),
    title: "Titulo uno",
  },
  {
    image: require("../../assets/onboarding/page-2.png"),
    title: "Titulo dos",
  },
  {
    image: require("../../assets/onboarding/page-3.png"),
    title: "Titulo tres",
  },
];

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: "25%",
          alignSelf: "center",
        }}
      >
        <Image
          source={require("../../assets/onboarding/Vector-1.png")}
          style={{
            width: 150,
            height: 150,
            resizeMode: "contain",
            transform: [{ translateX: 25 }, { translateY: -10 }],
          }}
        />
        <Image
          source={require("../../assets/onboarding/Vector-2.png")}
          style={{
            width: 150,
            height: 150,
            resizeMode: "contain",
            transform: [{ translateX: -25 }, { translateY: 10 }],
          }}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <View style={{ marginTop: "35%" }}>
            <Image
              source={item.image}
              style={{
                width: width,
                height: 180,
                resizeMode: "contain",
              }}
            />
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
});
