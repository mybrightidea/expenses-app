import React from "react";
import { connect } from "react-redux";
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from "../actions/filters";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = focused => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onTextChange = e => {
    e.preventDefault();
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = e => {
    e.preventDefault();
    e.target.value === "date"
      ? this.props.sortByDate()
      : this.props.sortByAmount();
  };
  render() {
    const { text, sortBy, startDate, endDate } = this.props.filters;
    const { calendarFocused } = this.state;
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              className="text-input"
              placeholder="Search expenses"
              type="text"
              value={text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              startDateId="startDate"
              endDateId="endDate"
              onDatesChange={this.onDatesChange}
              focusedInput={calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false}
              showClearDates={true}
              displayFormat={"DD/MM/YYYY"}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ filters: state.filters });

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
