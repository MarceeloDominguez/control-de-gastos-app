import React from "react";
import { DateTime } from "luxon";
import CardStaticsResumen from "./CardStaticsResumen";
import { useStoreTransaction } from "../store/store";

export default function CardMonthPrevious() {
  const { data } = useStoreTransaction();
  const currentDate = DateTime.local(); // Obtiene la fecha y hora actual
  const previousMonth = currentDate.minus({ months: 1 }); // Resta un mes a la fecha actual

  const previousMonthName = previousMonth.setLocale("es").toFormat("LLL"); // Obtiene el nombre del mes anterior
  const newDate = previousMonth.setLocale("es").toFormat("LLL y");

  //filtro toda la actividad del mes pasado
  const filterPreviousMonth = data.filter(
    (item) => item.currentMonth === previousMonthName
  );

  //filtro los ingresos del mes pasado
  const filterIncomePreviousMonth = filterPreviousMonth.filter(
    (item) => item.transactionType === "Income"
  );

  //sumo los ingresos del mes pasado
  const totalIncomePreviousMonth = filterIncomePreviousMonth.reduce(
    (accumulador, currentValue) => accumulador + Number(currentValue.money),
    0
  );

  //filtro los gastos del mes pasado
  const filterExpensePreviousMonth = filterPreviousMonth.filter(
    (item) => item.transactionType === "Expenses"
  );

  //sumo los gastos del mes pasado
  const totalExpensePreviousMonth = filterExpensePreviousMonth.reduce(
    (accumulador, currentValue) => accumulador + Number(currentValue.money),
    0
  );

  const totalPreviousMonth =
    totalIncomePreviousMonth - totalExpensePreviousMonth;

  return (
    <CardStaticsResumen
      totalMonth={totalPreviousMonth}
      totalIncomeForMonth={totalIncomePreviousMonth}
      totalExpenseForMonth={totalExpensePreviousMonth}
      newDate={newDate}
    />
  );
}
