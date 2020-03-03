import moment from "moment";
import { JanFirst2020 } from "./dates";

export default [
  {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  },
  {
    text: "bil",
    sortBy: "amount",
    startDate: moment(JanFirst2020),
    endDate: moment(JanFirst2020).add(7, "days")
  }
];
