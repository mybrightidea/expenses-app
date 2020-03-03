import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: undefined
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
    const { description, createdAt, note, amount } = this.state;
    if (!amount || !description) {
      this.setState(() => ({
        error: "Amount and description must be entered"
      }));
    } else {
      this.setState(() => ({
        error: undefined
      }));

      this.props.onSubmit({
        description,
        amount: parseFloat(amount, 10) * 100,
        note,
        createdAt: createdAt.valueOf()
      });
    }
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = e => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  render() {
    const {
      description,
      note,
      amount,
      createdAt,
      calendarFocused,
      error
    } = this.state;

    return (
      <form className="form" onSubmit={this.onFormSubmit}>
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={createdAt}
          onDateChange={this.onDateChange}
          focused={calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          displayFormat={"DD/MM/YYYY"}
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          className="textarea"
          value={note}
          onChange={this.onNoteChange}
        ></textarea>
        <div>
          <button className="button">{this.props.updateLabel}</button>
        </div>

        {error && <p className="form__error">{error}</p>}
      </form>
    );
  }
}

export default ExpenseForm;
