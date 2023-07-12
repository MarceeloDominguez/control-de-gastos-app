import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Color } from "../constants/theme";
import { formatQuantity } from "../helpers";
import { useTransactionContext } from "../context/AppContext";
import { useStoreTransaction } from "../store/store";
import { Ionicons } from "@expo/vector-icons";

type Prop = {
  titleList?: string;
};

export default function Card({ titleList }: Prop) {
  const { data } = useStoreTransaction();
  const { totalIncome, totalExpenses, total, eyeShow, setEyeShow } =
    useTransactionContext();

  let indiceComa = data[0]?.date.indexOf(",");
  let newDate = data[0]?.date.substring(indiceComa + 1);

  let indiceComa2 = data[data.length - 1]?.date.indexOf(",");
  let newDate2 = data[data.length - 1]?.date.substring(indiceComa2 + 1);

  return (
    <>
      <LinearGradient
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1.2 }}
        colors={["#4f80c3", "#c661eb", "#ee8183"]}
        style={styles.container}
      >
        {data.length > 0 ? (
          <Text style={styles.dates}>
            {newDate2} - {newDate}
          </Text>
        ) : (
          <Text style={styles.dataEmpty}>No hay Ingresos ni Gastos</Text>
        )}
        <TouchableOpacity
          onPress={() => setEyeShow(!eyeShow)}
          activeOpacity={1}
          style={styles.containerTotal}
        >
          <Text style={styles.total}>
            {eyeShow ? formatQuantity(total) : "******"}
          </Text>
          <Ionicons
            name={eyeShow ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
        <View style={styles.containerFooter}>
          <View style={styles.wrapContentLeftEndRight}>
            <View style={[styles.wrapArrow]}>
              <AntDesign name="arrowup" size={15} color={Color.income} />
            </View>
            <View>
              <Text style={styles.title}>Ingresos</Text>
              <Text style={styles.money}>
                {eyeShow ? formatQuantity(totalIncome) : "******"}
              </Text>
            </View>
          </View>
          <View style={styles.wrapContentLeftEndRight}>
            <View style={[styles.wrapArrow]}>
              <AntDesign name="arrowdown" size={15} color={Color.expense} />
            </View>
            <View>
              <Text style={styles.title}>Gastos</Text>
              <Text style={styles.money}>
                {eyeShow ? formatQuantity(totalExpenses) : "******"}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      {titleList && <Text style={styles.titleList}>{titleList}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 10,
    marginTop: 12,
    elevation: 12,
  },
  dates: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 14,
  },
  dataEmpty: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
  containerTotal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  total: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  containerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 14,
    paddingHorizontal: 7,
  },
  wrapContentLeftEndRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapArrow: {
    width: 26,
    height: 26,
    backgroundColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 26 / 2,
    marginRight: 14,
  },
  title: {
    color: "#fff",
    fontSize: 12,
  },
  money: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleList: {
    fontSize: 17,
    paddingHorizontal: 24,
    marginTop: 20,
    fontWeight: "bold",
    letterSpacing: 0.4,
    marginBottom: 15,
    color: Color.fontColorPrimary,
    textTransform: "capitalize",
  },
});
