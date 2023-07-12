import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { formatQuantity } from "../helpers";
import { Color } from "../constants/theme";

type Prop = {
  newDate: string;
  totalMonth: number;
  totalIncomeForMonth: number;
  totalExpenseForMonth: number;
};

export default function CardStaticsResumen({ ...prop }: Prop) {
  const { newDate, totalMonth, totalIncomeForMonth, totalExpenseForMonth } =
    prop;

  return (
    <View style={styles.card}>
      <Text style={styles.dateCard}>{newDate}</Text>
      <Text style={styles.totalMonthCard}>{formatQuantity(totalMonth)}</Text>
      <View style={styles.containerCard}>
        <View style={styles.wrapContentLeftEndRight}>
          <View style={[styles.wrapArrow, { backgroundColor: Color.income }]}>
            <AntDesign name="arrowup" size={15} color="#fff" />
          </View>
          <View>
            <Text style={styles.title}>Ingresos</Text>
            <Text style={styles.money}>
              {formatQuantity(totalIncomeForMonth)}
            </Text>
          </View>
        </View>
        <View style={styles.wrapContentLeftEndRight}>
          <View style={[styles.wrapArrow, { backgroundColor: Color.expense }]}>
            <AntDesign name="arrowdown" size={15} color="#fff" />
          </View>
          <View>
            <Text style={styles.title}>Gastos</Text>
            <Text style={styles.money}>
              {formatQuantity(totalExpenseForMonth)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 10,
  },
  wrapContentLeftEndRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapArrow: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26 / 2,
    marginRight: 14,
  },
  title: {
    color: Color.fontColorPrimary,
    fontSize: 12,
  },
  money: {
    color: Color.fontColorPrimary,
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 24,
    marginTop: 10,
    padding: 15,
    borderRadius: 16,
    elevation: 0,
    marginBottom: 20,
  },
  dateCard: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.4,
    color: Color.fontColorPrimary,
    opacity: 0.8,
    textTransform: "capitalize",
  },
  totalMonthCard: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 0.4,
    marginTop: 10,
    color: Color.fontColorPrimary,
  },
});
