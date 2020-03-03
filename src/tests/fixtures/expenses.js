import moment from "moment";

import { JanFirst2020 } from "./dates";

export default [
  {
    id: "1",
    description: "Rent",
    amount: 2200,
    note: "This is note1",
    createdAt: moment(JanFirst2020).valueOf()
  },
  {
    id: "2",
    description: "Coffee",
    amount: 350,
    note: "This is note2",
    createdAt: moment(JanFirst2020)
      .add(14, "days")
      .valueOf()
  },
  {
    id: "3",
    description: "Water Bill",
    amount: 1350,
    note: "This is note3",
    createdAt: moment(JanFirst2020)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: "4",
    description: "Gas Bill",
    amount: 2350,
    note: "This is note4",
    createdAt: moment(JanFirst2020)
      .add(4, "days")
      .valueOf()
  }
];
