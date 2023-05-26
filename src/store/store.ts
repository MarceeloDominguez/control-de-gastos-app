import { create } from "zustand";
import { Transaction } from "../interface/interfaceTransaction";

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
};

export const useStoreTransaction = create<State & Action>((set) => ({
  data: [],

  addTransaction: (
    value: ValueInput,
    transactionType: string,
    id: string,
    date: string
  ) =>
    set((state) => ({
      ...state,
      data: [...state.data, { ...value, transactionType, id, date }],
    })),
}));
