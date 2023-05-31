import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color } from "../constants/theme";
import { useStoreTransaction } from "../store/store";
import ListItemTransactions from "./ListItemTransactions";
import { useTransactionContext } from "../context/AppContext";
import { formatQuantity } from "../helpers";

export default function IncomeListTransactions() {
  const { data } = useStoreTransaction();
  const { totalIncome } = useTransactionContext();
  const listIncome = data.filter((item) => item.transactionType === "Income");

  let indiceComa = listIncome[0]?.date.indexOf(",");
  let newDate = listIncome[0]?.date.substring(indiceComa + 1);

  let indiceComa2 = listIncome[listIncome.length - 1]?.date.indexOf(",");
  let newDate2 = listIncome[listIncome.length - 1]?.date.substring(
    indiceComa2 + 1
  );

  return (
    <View style={styles.container}>
      {listIncome.length > 0 ? (
        <>
          <View style={styles.card}>
            <Text style={styles.date}>
              {newDate2} - {newDate}
            </Text>
            <Text style={styles.money}>{formatQuantity(totalIncome)}</Text>
          </View>
          {listIncome.map((item) => {
            return <ListItemTransactions item={item} key={item.id} />;
          })}
        </>
      ) : (
        <View style={styles.dataEmpty}>
          <Text style={styles.titleDataEmpty}>No hay ningun Ingreso!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: Color.fontColorPrimary,
    opacity: 0.8,
    marginBottom: 8,
    textTransform: "capitalize",
  },
  money: {
    fontSize: 26,
    fontWeight: "bold",
    color: Color.fontColorPrimary,
  },
  dataEmpty: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  titleDataEmpty: {
    fontWeight: "bold",
    letterSpacing: 0.4,
    color: Color.fontColorPrimary,
    fontSize: 20,
  },
});
