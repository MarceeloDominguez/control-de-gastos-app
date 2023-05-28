import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import { Color } from "../constants/theme";
import FloatingButton from "../components/FloatingButton";
import ListItemTransactions from "../components/ListItemTransactions";
import { useStoreTransaction } from "../store/store";
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useTransactionContext } from "../context/AppContext";

export default function HomeScreen() {
  const { data, deleteTransaction } = useStoreTransaction();
  const { openModal } = useTransactionContext();

  const handleDeleteTransaction = (description: string, id: string) => {
    Alert.alert("Sure you want to delete?", `${description}`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteTransaction(id) },
    ]);
  };

  const handleEditTransaction = () => {
    openModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <TouchableOpacity style={styles.wrapIcon} activeOpacity={0.8}>
          <Ionicons name="lock-open-outline" size={16} color={Color.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapIcon} activeOpacity={0.8}>
          <Ionicons name="stats-chart-outline" size={15} color={Color.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapIcon} activeOpacity={0.8}>
          <Ionicons name="settings" size={15} color={Color.icon} />
        </TouchableOpacity>
      </View>
      <SwipeListView
        data={data}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Card titleList="Transactions" />}
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item }) => {
          return <ListItemTransactions item={item} />;
        }}
        renderHiddenItem={({ item }) => {
          return (
            <View style={styles.hiddenItem}>
              <TouchableOpacity
                style={styles.iconHiddenContainer}
                activeOpacity={0.8}
                onPress={() => handleEditTransaction()}
              >
                <Feather name="edit" size={18} color="#19A7CE" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconHiddenContainer}
                activeOpacity={0.8}
                onPress={() =>
                  handleDeleteTransaction(item.description, item.id)
                }
              >
                <AntDesign name="delete" size={18} color={Color.expense} />
              </TouchableOpacity>
            </View>
          );
        }}
        rightOpenValue={-120}
        disableRightSwipe
      />
      <FloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary,
    flex: 1,
    paddingTop: 40,
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 14,
    paddingVertical: 10,
    paddingHorizontal: 24,
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
  hiddenItem: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 24,
    gap: 10,
    height: 60,
  },
  iconHiddenContainer: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
});
