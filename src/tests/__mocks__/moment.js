const moment = jest.requireActual("moment");

import { JanFirst2020 } from "../fixtures/dates";

export default (timestamp = JanFirst2020) => {
  return moment(timestamp);
};
