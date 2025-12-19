export const dobSetter = (values: string | any) => {
  console.log("Values are here==>", values);
  if (!values) {
    return null;
  }
  const dateOfBirth = new Date(`${values.year}-${values.month}-${values.date}`).toISOString();
  return dateOfBirth;
};
