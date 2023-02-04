export const isValid = (value: string) => {
  if (!value) {
    return {
      valid: false,
      errorMessage: "add something",
    };
  }
  return {
    valid: true,
    errorMessage: "",
  };
};
