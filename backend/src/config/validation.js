import Validator from "validatorjs";

export const validateRequest = (data, rules) => {
  const validation = new Validator(data, rules);
  if (validation.fails()) {
    const firstError = Object.values(validation.errors.all())[0][0];
    return { isValid: false, message: firstError };
  }
  return { isValid: true };
};
