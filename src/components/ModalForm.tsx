import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Color } from "../constants/theme";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckBoxForm from "./CheckBoxForm";
import { useStoreTransaction } from "../store/store";
import { formattedDate, getCurrentTimestamp } from "../helpers";
import { useTransactionContext } from "../context/AppContext";

export default function ModalForm() {
  const { addTransaction, updateTransaction } = useStoreTransaction();
  const { itemId, objectToEdit, modalVisible, closeModal } =
    useTransactionContext();
  const [checkSelected, setCheckSelected] = useState("");
  const [inputValue, setInputValue] = useState({
    money: "",
    description: "",
  });

  const handleChange = (valueName: string, textValue: string) => {
    setInputValue({ ...inputValue, [valueName]: textValue });
  };

  useEffect(() => {
    if (objectToEdit !== null) {
      setInputValue({
        money: objectToEdit.money,
        description: objectToEdit.description,
      });
      setCheckSelected(objectToEdit.transactionType);
    }
    if (!modalVisible) {
      setInputValue({ money: "", description: "" });
      setCheckSelected("");
    }
  }, [modalVisible]);

  const handleSubmit = () => {
    if (!inputValue.description || !inputValue.money || !checkSelected) return;

    if (objectToEdit !== null) {
      //si hay un objeto para editar, edito el item.
      updateTransaction(inputValue, itemId, checkSelected);
    } else {
      //sino agrego un item nuevo
      addTransaction(
        inputValue,
        checkSelected,
        getCurrentTimestamp(),
        formattedDate
      );
    }

    setInputValue({ money: "", description: "" });
    setCheckSelected("");
    closeModal();
  };

  const handleCheckBox = (value: string) => {
    setCheckSelected(value);
  };

  return (
    <Modal visible={modalVisible} animationType="slide">
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.closeModal}>
            <Entypo
              name="cross"
              size={30}
              color={Color.icon}
              onPress={closeModal}
            />
          </View>
          <View style={styles.containerContent}>
            <View>
              <Text style={styles.title}>Add Expenses</Text>
              <TextInput
                style={styles.inputAmountMoney}
                placeholder="$10.000.00"
                selectionColor="#4f80c3"
                keyboardType="numeric"
                value={inputValue.money}
                onChangeText={(textValue) => handleChange("money", textValue)}
              />
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Netflix, Amazon..."
                  selectionColor="#4f80c3"
                  value={inputValue.description}
                  onChangeText={(textValue) =>
                    handleChange("description", textValue)
                  }
                />
                <Entypo
                  name="list"
                  size={18}
                  color={Color.icon}
                  style={styles.iconListInput}
                />
              </View>
              <CheckBoxForm
                handleCheckBox={handleCheckBox}
                checkSelected={checkSelected}
              />
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit}>
              <LinearGradient
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 1.2 }}
                colors={["#4f80c3", "#c661eb", "#ee8183"]}
                style={styles.button}
              >
                <Text style={styles.titleButton}>save</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
  closeModal: {
    paddingHorizontal: 24,
    alignItems: "flex-end",
    paddingTop: 10,
    marginBottom: 50,
  },
  containerContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.5,
    marginBottom: 20,
    textAlign: "center",
    color: Color.fontColorPrimary,
    opacity: 0.8,
  },
  inputAmountMoney: {
    height: 40,
    backgroundColor: "#fff",
    width: "70%",
    marginBottom: 30,
    borderRadius: 20,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    marginBottom: 16,
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 20,
  },
  iconListInput: {
    position: "absolute",
    top: 12,
    left: 8,
  },
  button: {
    height: 40,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  titleButton: {
    textTransform: "capitalize",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.4,
  },
});
