import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import Card from "../components/Card";
import { Color } from "../constants/theme";
import FloatingButton from "../components/FloatingButton";
import ListItemTransactions from "../components/ListItemTransactions";
import { useStoreTransaction } from "../store/store";
import { SwipeListView } from "react-native-swipe-list-view";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useTransactionContext } from "../context/AppContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/Navigation";
import Loading from "../components/Loading";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  "HomeScreen"
>;

type Prop = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Prop) {
  const { data, deleteTransaction } = useStoreTransaction();
  const [loading, setLoading] = useState(true);
  const { handleEditTransaction, isLoading, setIsLoading } =
    useTransactionContext();

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, [loading]);

  const handleDeleteTransaction = (description: string, id: string) => {
    Alert.alert("Esta seguro que lo quiere eliminar?", `${description}`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteTransaction(id), setIsLoading(true);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.containerHeader}>
            <TouchableOpacity
              style={styles.wrapIcon}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("TransactionsScreen")}
            >
              <Ionicons
                name="ios-swap-horizontal"
                size={18}
                color={Color.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrapIcon}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("StatisticsScreen")}
            >
              <Ionicons
                name="stats-chart-outline"
                size={15}
                color={Color.icon}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.wrapIcon} activeOpacity={0.8}>
          <Ionicons name="settings" size={15} color={Color.icon} />
        </TouchableOpacity> */}
          </View>
          {isLoading ? (
            <Loading />
          ) : (
            <SwipeListView
              data={data}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <Card titleList={data.length === 0 ? "" : "transferencias"} />
              }
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
                      onPress={() => handleEditTransaction(item.id)}
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
                      <AntDesign
                        name="delete"
                        size={18}
                        color={Color.expense}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
              rightOpenValue={-120}
              stopRightSwipe={-120}
              disableRightSwipe
            />
          )}
          <FloatingButton />
        </>
      )}
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
    paddingRight: 26,
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
    elevation: 1,
  },
});
