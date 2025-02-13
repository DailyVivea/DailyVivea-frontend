import { apiGet } from "./apiUtils";
import {
  GetReportDetailParams,
  GetReportDetailResponse,
  GetReportParams,
  GetReportResponse,
} from "./types/report";

export const getReport = ({ userId, date }: GetReportParams) => {
  return apiGet<GetReportResponse>(`/api/reports/${userId}`, {
    date,
  });
};

export const getReportDetail = ({ userId, date }: GetReportDetailParams) => {
  return apiGet<GetReportDetailResponse>(`/api/reports/detail/${userId}`, {
    date,
  });
};
