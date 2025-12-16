export const nameValidator = (value: string) => {
  if (!value) {
    return "name is required!";
  } else if (value.length < 3) {
    return "Name must have at least 3 letters";
  } else {
    return null;
  }
};

export const usernameValidator = (value: string) => {
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Only letters, numbers, underscores allowed";
  if (value.length < 3) return "Must be atleast 3 letters";
  return null;
};
