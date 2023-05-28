import { createContext, useContext, useState } from "react";
import { useStoreTransaction } from "../store/store";

interface AppContext {
  totalIncome: number;
  totalExpenses: number;
  total: number;
  modalVisible: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const TransactionContext = createContext({} as AppContext);

export const AppContext = ({ children }: { children: JSX.Element }) => {
  const [modalVisible, setModalVisible] = useState(false);
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

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <TransactionContext.Provider
      value={{
        totalIncome,
        totalExpenses,
        total,
        modalVisible,
        closeModal,
        openModal,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const {
    totalIncome,
    totalExpenses,
    total,
    modalVisible,
    closeModal,
    openModal,
  } = useContext(TransactionContext);

  return {
    totalIncome,
    totalExpenses,
    total,
    modalVisible,
    closeModal,
    openModal,
  };
};
