import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../constants/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/Navigation";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../components/Card";
import IncomeListTransactions from "../components/IncomeListTransactions";
import ExpensesListTransactions from "../components/ExpensesListTransactions";

type TransactionsScreenProp = NativeStackNavigationProp<
  RootStackParamsList,
  "TransactionsScreen"
>;

type Prop = {
  navigation: TransactionsScreenProp;
};

const tabs = [
  {
    name: "Ingresos",
    type: "Income",
  },
  {
    name: "Gastos",
    type: "Expenses",
  },
];

export default function TransactionsScreen({ navigation }: Prop) {
  const [selectedTab, setSelectedTab] = useState("Income");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.headerLeft}>
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
          <Text style={styles.titleHeader}>transferencias</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.wrapIcon}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <Ionicons name="search" size={16} color={Color.icon} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.wrapIcon} activeOpacity={0.8}>
            <Ionicons name="ellipsis-vertical" size={16} color={Color.icon} />
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card />
        <View style={styles.containerTab}>
          {tabs.map((item) => {
            return (
              <LinearGradient
                key={item.name}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 1.2 }}
                colors={[
                  item.type === selectedTab ? "#4f80c3" : "#fff",
                  item.type === selectedTab ? "#c661eb" : "#fff",
                  item.type === selectedTab ? "#ee8183" : "#fff",
                ]}
                style={styles.tabGradient}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.wrapTab}
                  onPress={() => setSelectedTab(item.type)}
                >
                  <Text
                    style={[
                      styles.titleTab,
                      {
                        color:
                          item.type === selectedTab
                            ? "#fff"
                            : Color.fontColorPrimary,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            );
          })}
        </View>
        {selectedTab === "Income" ? (
          <IncomeListTransactions />
        ) : (
          <ExpensesListTransactions />
        )}
      </ScrollView>
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
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerRight: {
    flexDirection: "row",
    gap: 14,
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
  titleHeader: {
    fontWeight: "bold",
    letterSpacing: 0.4,
    fontSize: 16,
    color: Color.fontColorPrimary,
    textTransform: "capitalize",
  },
  containerTab: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    borderRadius: 10,
  },
  wrapTab: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tabGradient: {
    flex: 1,
    borderRadius: 10,
    margin: 3,
  },
  titleTab: {
    fontWeight: "bold",
    letterSpacing: 0.4,
    fontSize: 13,
    lineHeight: 15,
  },
});
