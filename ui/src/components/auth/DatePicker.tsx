// import { Group, Text } from "@mantine/core";
// import React from "react";
// import { DatePickerInput, MonthPickerInput, YearPickerInput } from "@mantine/dates";
// import type { UseFormReturnType } from "@mantine/form";
// import type { SignupFormValues } from "../../types/types";

// type DatePickerProps = {
//   form: UseFormReturnType<SignupFormValues>;
// };

// export const DatePicker: React.FC<DatePickerProps> = ({ form }: DatePickerProps) => {
//   return (
//     <div className="flex items-center justify-center py-10">
//       <div className="grid gap-3">
//         <div className="">
//           <Text fw={500} mb="xs">
//             Date of Birth
//           </Text>
//           <Group grow>
//             <YearPickerInput
//               placeholder="Pick Year"
//               valueFormat="YYYY"
//               value={form.values.year}
//               onChange={(val) => form.setFieldValue("year", val ? Number(val) : "")}
//             />
//             <MonthPickerInput
//               placeholder="Pick month"
//               valueFormat="MMM"
//               value={form.values.month}
//               onChange={(val) => form.setFieldValue("month", val ? Number(val) : "")}
//             />
//             <DatePickerInput
//               placeholder="Pick date"
//               valueFormat="DD"
//               value={form.values.date}
//               onChange={(val) => form.setFieldValue("date", val ? Number(val) : "")}
//             />
//           </Group>
//         </div>
//       </div>
//     </div>
//   );
// };
