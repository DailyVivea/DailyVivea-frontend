const useCalendar = () => {
    // 이전 달로 이동
    const getPrevMonthDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month-1, 1);
    };

    // 다음 달로 이동
    const getNextMonthDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month+1, 1);
    };

    return {
        getPrevMonthDate,
        getNextMonthDate,
    };
};

export default useCalendar;