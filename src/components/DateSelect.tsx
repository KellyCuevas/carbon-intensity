import React, { useEffect, useState } from "react";
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
  const [maxEndDate, setMaxEndDate] = useState(startDate);
  const [minEndDate, setMinEndDate] = useState(endDate);
  const maxStart = new Date();
  maxStart.setDate(maxStart.getDate() + 1);

  useEffect(() => {
    const currDate = new Date();
    //calculate the date 2 days after the current date
    const twoDaysAfter = new Date(currDate.getTime() + 2 * 24 * 60 * 60 * 1000);
    //calculate the date 58 days after the start date
    //while the api allows for up to 60 days, 58 is being used here to avoid checking the number of days in the input months
    let twoMonthsAfter = new Date(
      startDate.getTime() + 58 * 24 * 60 * 60 * 1000
    );
    //if startDate + 58 is less than twoDaysAfter, setEndDate to be 60 days after startDate this will prevent a failed api call if the user changes the start date but not the end date
    if (twoMonthsAfter < twoDaysAfter) {
      setEndDate(twoMonthsAfter);
    } else setEndDate(twoDaysAfter);

    //if the date is more than 2 days from today, set it to be equal to 2 days from today
    if (twoMonthsAfter > twoDaysAfter) twoMonthsAfter = twoDaysAfter;
    setMaxEndDate(twoMonthsAfter);

    const oneDayAfter = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
    setMinEndDate(oneDayAfter);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);
  // console.log(
  //   "start:",
  //   startDate,
  //   "end:",
  //   endDate,
  //   "minEnd:",
  //   minEndDate,
  //   "maxEnd",
  //   maxEndDate,
  //   "maxStart:",
  //   maxStart
  // );

  return (
    <>
      <div className="date-picker-container">
        <div className="single-date-picker">
          <p className="date-picker-label">Select Start Date</p>
          <DatePicker
            showIcon
            //initial start is today's date
            selected={startDate}
            onChange={(date) => setStartDate(date ? date : startDate)}
            //prevent user from selecting date more than 2 days in the future per API requirements
            maxDate={maxStart}
          />
        </div>
        <div className="single-date-picker">
          <p className="date-picker-label">Select Ending Date</p>
          <DatePicker
            showIcon
            //intial end date is 2 days from today so that data is displayed to user upon landing on page
            selected={endDate}
            onChange={(date) => setEndDate(date ? date : endDate)}
            //min date is 1 day after the start date to prevent API from sending back an empty data array
            minDate={minEndDate}
            //max date is no more than 60 days after the start date, but no more than 2 days from today
            maxDate={maxEndDate}
          />
        </div>
      </div>
      <p className="helper-text">
        *ending date must be no more than 60 days after start date
      </p>
    </>
  );
};

export default DateSelect;
