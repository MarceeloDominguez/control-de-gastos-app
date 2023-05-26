import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ModalForm from "./ModalForm";

export default function FloatingButton() {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.container}
        activeOpacity={0.8}
      >
        <LinearGradient
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1.2 }}
          colors={["#4f80c3", "#c661eb", "#ee8183"]}
          style={styles.buttonAdd}
        >
          <Text style={styles.add}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
      <ModalForm modalVisible={modalVisible} closeModal={closeModal} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  buttonAdd: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: "#fff",
    fontSize: 36,
    textAlignVertical: "center",
    top: -2,
  },
});
