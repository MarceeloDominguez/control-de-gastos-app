import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Color } from "../constants/theme";
import { Onboarding } from "../interfaces/onboarding";

type Prop = {
  onboardingItem: Onboarding;
};

const { width } = Dimensions.get("window");

export default function RenderItemOnboarding({ onboardingItem }: Prop) {
  const { title, image } = onboardingItem;

  return (
    <View>
      <View style={styles.wrapTitle}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapTitle: {
    paddingVertical: 30,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    letterSpacing: 0.3,
    maxWidth: 270,
    color: Color.fontColorPrimary,
    fontFamily: "ConcertOne-Regular",
  },
  image: {
    width: width,
    height: width * 0.85,
    resizeMode: "contain",
    marginVertical: 15,
  },
});
