import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Color } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useStoreTransaction } from "../store/store";
import { Transaction } from "../interface/interfaceTransaction";
import ListItemTransactions from "../components/ListItemTransactions";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/Navigation";

type TransactionsScreenProp = NativeStackNavigationProp<
  RootStackParamsList,
  "SearchScreen"
>;

type Prop = {
  navigation: TransactionsScreenProp;
};

export default function SearchScreen({ navigation }: Prop) {
  const [textInput, setTextInput] = useState("");
  const [newData, setNewData] = useState<Transaction[]>([]);
  const { data } = useStoreTransaction();

  useEffect(() => {
    if (textInput.length === 0) {
      setNewData([]);
      return;
    }

    const handleSearch = () => {
      const listResult = data.filter((item) =>
        item.description.toLowerCase().includes(textInput.toLowerCase())
      );
      setNewData(listResult);
    };

    handleSearch();
  }, [textInput]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <TouchableOpacity
          style={styles.wrapIcon}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back-circle-sharp"
            size={20}
            color={Color.icon}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder="Buscar un ingreso o un gasto"
            onChangeText={(text) => setTextInput(text)}
            value={textInput}
          />
          <Ionicons
            name="search"
            size={18}
            color={Color.icon}
            style={styles.iconSearch}
          />
        </View>
        {newData.map((item, index) => (
          <ListItemTransactions key={index} item={item} />
        ))}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    flex: 1,
    paddingTop: 40,
  },
  containerInput: {
    backgroundColor: "#fff",
    marginHorizontal: 24,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.icon,
    marginBottom: 20,
  },
  input: {
    height: 40,
    paddingHorizontal: 35,
  },
  containerHeader: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  iconSearch: {
    position: "absolute",
    top: 11,
    left: 10,
  },
  wrapIcon: {
    backgroundColor: "#fff",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    elevation: 12,
  },
});
