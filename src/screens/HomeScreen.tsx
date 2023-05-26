import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import { Color } from "../constants/theme";
import FloatingButton from "../components/FloatingButton";
import ListItemTransactions from "../components/ListItemTransactions";
import { useStoreTransaction } from "../store/store";

export default function HomeScreen() {
  const { data } = useStoreTransaction();

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
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Card titleList="Transactions" />}
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item }) => {
          return <ListItemTransactions item={item} />;
        }}
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
  //modal
  add: {
    color: "#fff",
    fontSize: 36,
    textAlignVertical: "center",
    top: -2,
  },
});
