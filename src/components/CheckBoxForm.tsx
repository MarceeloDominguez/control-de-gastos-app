import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../constants/theme";

const options = ["Income", "Expenses"];

type Prop = {
  handleCheckBox: (value: string) => void;
  checkSelected: string;
};

export default function CheckBoxForm({ handleCheckBox, checkSelected }: Prop) {
  return (
    <View style={styles.wrapCheckBox}>
      <View style={styles.direcctionContentCheck}>
        <Ionicons name="swap-vertical" size={18} color={Color.icon} />
        {options.map((item, index) => {
          return (
            <View key={index} style={styles.wrapContainerCheck}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.containerCheck}
                onPress={() => handleCheckBox(item)}
              >
                <Entypo
                  name={checkSelected === item ? "check" : null!}
                  size={14}
                  color={Color.income}
                />
              </TouchableOpacity>
              <Text style={styles.titleCheck}>{item}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapCheckBox: {
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 10,
    marginBottom: 16,
    justifyContent: "center",
    paddingLeft: 8,
  },
  direcctionContentCheck: {
    flexDirection: "row",
    gap: 15,
  },
  wrapContainerCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerCheck: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.icon,
    marginRight: 6,
  },
  titleCheck: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.5,
    color: Color.fontColorPrimary,
    opacity: 0.8,
  },
});
