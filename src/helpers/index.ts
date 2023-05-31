import { DateTime } from "luxon";

//generar ids
export const getCurrentTimestamp = () =>
  new Date().getTime().toLocaleString().replace(/,/g, "");

//formatear fecha con luxon
const date = DateTime.local();
export const formattedDate = date.setLocale("es").toFormat("cccc, d LLL y");

//formatear el precio
export const formatQuantity = (quantity: number) => {
  return Number(quantity).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};
