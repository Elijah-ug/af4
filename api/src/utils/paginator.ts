import { Prisma } from "@prisma/client";

interface PaginationOptions {
  page: number;
  limit: number;
}

export const paginationHelper = async (model: any, { page = 1, limit = 10 }: PaginationOptions, options: any) => {
  const skip = (page - 1) * limit;
  //   run async queries in parallel
  const [data, total] = await Promise.all([
    model.findMany({ skip, take: limit, ...options }),
    model.count({ where: options.where }),
  ]);
  return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
};
