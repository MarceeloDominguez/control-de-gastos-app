import { createContext, useContext } from "react";
import { useStoreTransaction } from "../store/store";

interface AppContext {
  totalIncome: number;
  totalExpenses: number;
  total: number;
}

const TransactionContext = createContext({} as AppContext);

export const AppContext = ({ children }: { children: JSX.Element }) => {
  const { data } = useStoreTransaction();

  const filterIncome = data.filter((item) => item.transactionType === "Income");
  const totalIncome = filterIncome.reduce(
    (accumulador, currentValue) => accumulador + Number(currentValue.money),
    0
  );

  const filterExpenses = data.filter(
    (item) => item.transactionType === "Expenses"
  );
  const totalExpenses = filterExpenses.reduce(
    (accumulador, currentValue) => accumulador + Number(currentValue.money),
    0
  );

  const total = totalIncome - totalExpenses;

  return (
    <TransactionContext.Provider value={{ totalIncome, totalExpenses, total }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const { totalIncome, totalExpenses, total } = useContext(TransactionContext);

  return { totalIncome, totalExpenses, total };
};
