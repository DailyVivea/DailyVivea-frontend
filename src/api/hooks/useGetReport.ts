import { getReport } from "@/api/reportAPI";
import { GetReportParams } from "@/api/types/report";
import { useQuery } from "@tanstack/react-query"; // npm install @tanstack/react-query

const useGetReport = ({ userId, date }: GetReportParams) => {
  return useQuery({
    queryKey: ["reports", date],
    queryFn: () => getReport({ userId, date }),
    select: (data) => data.result,
  });
};

export default useGetReport;
