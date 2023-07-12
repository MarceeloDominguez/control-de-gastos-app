import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../constants/theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigation/Navigation";
import { useStoreTransaction } from "../store/store";
import { currentMonth } from "../helpers";
import { StackedBarChart } from "react-native-chart-kit";
import CardStaticsResumen from "../components/CardStaticsResumen";
import CardMonthPrevious from "../components/CardMonthPrevious";

type StatisticsScreenProp = NativeStackNavigationProp<
  RootStackParamsList,
  "StatisticsScreen"
>;

type Prop = {
  navigation: StatisticsScreenProp;
};

export default function StatisticsScreen({ navigation }: Prop) {
  const { data } = useStoreTransaction();

  let indiceComa = data[0]?.date.indexOf(",");
  let newDate = data[0]?.date.substring(indiceComa + 4);

  //filtro todos los ingresos
  const filterIncome = data.filter((item) => item.transactionType === "Income");

  //filtro los ingresos por mes
  const incomeForMonth = filterIncome.filter(
    (item) => item.currentMonth === currentMonth
  );

  //sumo los ingresos por mes
  const totalIncomeForMonth = incomeForMonth.reduce(
    (accumulador, currenValue) => accumulador + Number(currenValue.money),
    0
  );

  //filtro todos los gastos
  const filterExpenses = data.filter(
    (item) => item.transactionType === "Expenses"
  );

  //filtro los gastos por mes
  const expensesForMonth = filterExpenses.filter(
    (item) => item.currentMonth === currentMonth
  );

  //sumo los gastos por mes
  const totalExpenseForMonth = expensesForMonth.reduce(
    (accumulador, currenValue) => accumulador + Number(currenValue.money),
    0
  );

  const totalMonth = totalIncomeForMonth - totalExpenseForMonth;

  const dataBar = {
    labels: ["Gastos", "Ingresos"],
    legend: ["L1"],
    data: [
      [totalExpenseForMonth, 0],
      [0, totalIncomeForMonth],
    ],
    barColors: [Color.expense, Color.income],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <Text style={styles.titleHeader}>Estadisticas</Text>
        </View>
        {data.length > 0 ? (
          <>
            <View style={styles.wrapStackedBarChart}>
              <StackedBarChart
                data={dataBar}
                width={Dimensions.get("window").width * 0.9}
                height={220}
                hideLegend
                yAxisLabel="$"
                yLabelsOffset={-10}
                //verticalLabelsHeightPercentage={0.75}
                withVerticalLabels={false}
                segments={4}
                decimalPlaces={0}
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  decimalPlaces: 0,
                  color: () => "transparent",
                  labelColor: () => Color.icon,
                  barPercentage: 1.5,
                }}
              />
              <View style={styles.containerFooter}>
                <Text style={styles.textFooter}>{newDate}</Text>
                <View style={styles.wrapDot}>
                  <View
                    style={[styles.dot, { backgroundColor: Color.expense }]}
                  />
                  <Text style={[styles.textFooter, { marginRight: 5 }]}>
                    Gastos
                  </Text>
                  <View
                    style={[styles.dot, { backgroundColor: Color.income }]}
                  />
                  <Text style={styles.textFooter}>Ingresos</Text>
                </View>
              </View>
            </View>

            <CardStaticsResumen
              newDate={newDate}
              totalExpenseForMonth={totalExpenseForMonth}
              totalIncomeForMonth={totalIncomeForMonth}
              totalMonth={totalMonth}
            />
            <CardMonthPrevious />
          </>
        ) : (
          <View style={styles.dataEmpty}>
            <Text style={styles.titleDataEmpty}>
              No hay ninguna estadistica para mostrar.
            </Text>
          </View>
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
  wrapIcon: {
    backgroundColor: "#fff",
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    elevation: 12,
  },
  containerHeader: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  titleHeader: {
    fontWeight: "bold",
    letterSpacing: 0.4,
    fontSize: 16,
    color: Color.fontColorPrimary,
    textTransform: "capitalize",
  },
  containerFooter: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    width: "80%",
    paddingHorizontal: 30,
  },
  textFooter: {
    fontSize: 12,
    fontWeight: "bold",
    color: Color.icon,
    textTransform: "capitalize",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  wrapDot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  wrapStackedBarChart: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    height: 255,
    backgroundColor: "#fff",
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 16,
    elevation: 0,
  },
  dataEmpty: {
    alignItems: "center",
    marginTop: 50,
  },
  titleDataEmpty: {
    fontWeight: "bold",
    letterSpacing: 0.4,
    color: Color.fontColorPrimary,
    fontSize: 20,
    textAlign: "center",
  },
});
