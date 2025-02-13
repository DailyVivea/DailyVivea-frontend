import { apiGet } from "./apiUtils";
import { GetReportParams, GetReportResponse } from "./types/report";

export const getReport = ({ userId, date }: GetReportParams) => {
  return apiGet<GetReportResponse[]>(`/api/reports/${userId}`, {
    date,
  });
};
