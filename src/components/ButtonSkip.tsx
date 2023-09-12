import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamsList } from "../navigation/Navigation";
import { Color } from "../constants/theme";

export default function ButtonSkip() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.buttonSkip}
      onPress={() => navigation.navigate("HomeScreen")}
    >
      <Text style={styles.textButtonSkip}>Omitir</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSkip: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 22,
  },
  textButtonSkip: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
    color: Color.fontColorPrimary,
    fontFamily: "ConcertOne-Regular",
  },
});
