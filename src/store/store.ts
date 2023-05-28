import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Transaction } from "../interface/interfaceTransaction";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ValueInput {
  money: string;
  description: string;
}

type State = {
  data: Transaction[];
};

type Action = {
  addTransaction: (
    value: ValueInput,
    transactionType: string,
    id: string,
    date: string
  ) => void;
  deleteTransaction: (id: string) => void;
};

export const useStoreTransaction = create(
  persist<State & Action>(
    (set) => ({
      data: [],

      //agregar un elemento
      addTransaction: (
        value: ValueInput,
        transactionType: string,
        id: string,
        date: string
      ) =>
        set((state) => ({
          ...state,
          data: [{ ...value, transactionType, id, date }, ...state.data],
        })),

      //eliminar un elemento
      deleteTransaction: (id: string) =>
        set((state) => ({
          ...state,
          data: state.data.filter((item) => item.id !== id),
        })),
    }),
    { name: "transaction-list", storage: createJSONStorage(() => AsyncStorage) }
  )
);
