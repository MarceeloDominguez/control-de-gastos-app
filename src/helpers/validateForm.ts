type InputValue = {
  money: string;
  description: string;
};

export const useValidate = (values: InputValue, checkSelected: string) => {
  const moneyValue = values.money.replace(/[^0-9]/g, "");

  const errors = {
    money: "",
    description: "",
    check: "",
  };

  if (!values.money) {
    errors.money = "Este campo es requerido";
  }

  if (values.money !== moneyValue) {
    errors.money = "Tiene que ser un número";
  }

  if (!values.description) {
    errors.description = "Este campo es requerido";
  }

  if (!checkSelected) {
    errors.check = "Tiene que seleccionar una opción";
  }

  return errors;
};
