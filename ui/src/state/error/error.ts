import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const isBaseQueryError =(error:unknown):error is FetchBaseQueryError=>{
    return typeof error === "object" && error !== null;
}