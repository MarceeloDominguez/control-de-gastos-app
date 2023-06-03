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
    date: string,
    currentMonth: string
  ) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (
    newItem: ValueInput | undefined,
    itemId: string | null,
    transactionType: string
  ) => void;
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
        date: string,
        currentMonth: string
      ) =>
        set((state) => ({
          ...state,
          data: [
            { ...value, transactionType, id, date, currentMonth },
            ...state.data,
          ],
        })),

      //eliminar un elemento
      deleteTransaction: (id: string) =>
        set((state) => ({
          ...state,
          data: state.data.filter((item) => item.id !== id),
        })),

      //editar un elemento
      updateTransaction: (
        newItem: ValueInput | undefined,
        itemId: string | null,
        transactionType: string
      ) =>
        set((state) => ({
          data: state.data.map((item) =>
            item.id === itemId ? { ...item, ...newItem, transactionType } : item
          ),
        })),
    }),
    { name: "transaction-list", storage: createJSONStorage(() => AsyncStorage) }
  )
);
