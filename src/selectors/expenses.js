import moment from "moment";
//Get Visible expenses
export default (expenses, filters) => {
  const { text, sortBy, startDate, endDate } = filters;
  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch =
        startDate !== null && startDate !== undefined
          ? moment(startDate).isSameOrBefore(createdAtMoment, "day")
          : true;
      const endDateMatch =
        endDate !== null && endDate !== undefined
          ? moment(endDate).isSameOrAfter(createdAtMoment, "day")
          : true;
      const textMatch =
        expense.description.trim.length === 0 &&
        expense.description.toLowerCase().includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      return sortBy === "date"
        ? b.createdAt - a.createdAt
        : b.amount - a.amount;
    });
};
