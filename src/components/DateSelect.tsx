import React, { useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
type DateSelectProps = {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
};
const DateSelect = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateSelectProps) => {
  useEffect(() => {
    setEndDate(startDate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  //TODO: move parts of this that use startDate into useEffect and possibly more state vars to keep everything in syc
  // const today = new Date();
  const maxStart = new Date();
  maxStart.setDate(maxStart.getDate() + 2);
  // const maxEnd = new Date();
  // maxEnd.setDate(today.getDate() + 2);
  // let oneMonthAfter = new Date();
  // oneMonthAfter.setDate(startDate.getDate() + 30);
  // console.log(oneMonthAfter.getDate(), maxEnd.getDate());
  // if (oneMonthAfter > maxEnd) oneMonthAfter = maxEnd;
  // console.log(startDate, oneMonthAfter);

  return (
    <>
      <div className="date-picker-container">
        <div className="single-date-picker">
          <p className="date-picker-label">Select Start Date</p>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date ? date : startDate)}
            maxDate={maxStart}
          />
        </div>
        <div className="single-date-picker">
          <p className="date-picker-label">Select Ending Date</p>
          <DatePicker
            showIcon
            selected={endDate}
            onChange={(date) => setEndDate(date ? date : endDate)}
            minDate={startDate}
            maxDate={maxStart}
          />
          <small className="helper-text">
            *ending date must be no more than 30 days after start date
          </small>
        </div>
      </div>
    </>
  );
};

export default DateSelect;
