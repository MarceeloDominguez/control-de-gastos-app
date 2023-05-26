import moment from "moment";

//generar ids
export const getCurrentTimestamp = () =>
  new Date().getTime().toLocaleString().replace(/,/g, "");

//formatear fecha con moment
export const formattedDate = moment(Date.now()).format("dddd, ll");

//formatear el precio
export const formatQuantity = (quantity: number) => {
  return Number(quantity).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};
