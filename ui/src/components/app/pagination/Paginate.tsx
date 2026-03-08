import React from "react";
import { Pagination } from "@mantine/core";
interface PaginationVals {
  page: number;
  setPages: Function | any;
  totalPages: number;
}
export const Paginate: React.FC<PaginationVals> = ({ page, setPages, totalPages }) => {
  // const [activePage, setPage] = useState(1);
  return <Pagination value={page} onChange={setPages} total={totalPages} autoContrast color="lime.4" />;
};
