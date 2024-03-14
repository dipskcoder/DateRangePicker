import moment from "moment";
import { useState } from "react";

const weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
const year = 2024;
function DateRange() {
  const [month, setMonth] = useState(0);
  const [selectedDateStart, setSelectedDateStart] = useState();
  const [selectedDateEnd, setSelectedDateEnd] = useState();

  const [hoverItem, setHoveritem] = useState();
  const [hoverCalender, setHoverCalender] = useState();
  const [selectedCalender, setSelectedCalender] = useState();

  const [hoverListM1, setHoverListM1] = useState([]);
  const [hoverListM2, setHoverListM2] = useState([]);

  const getDay = (m) => {
    return new Date(year, month, m).toString().split(" ")[0];
  };

  console.log("asdf", getDay(1));
  console.log("ASdfasd", weekNames.indexOf(getDay(month)));

  const handleDateClick = (calender, date) => {
    if (!selectedDateStart) {
      setSelectedDateStart(date);
      return;
    }
    if (!selectedDateEnd && selectedDateStart) {
      setSelectedDateEnd(date);
      return;
    }
    if (selectedDateEnd && selectedDateStart) {
      setSelectedDateStart(date);
      setSelectedDateEnd();
    }
  };

  const sethoverbycalender = (setHover, hoverDate) => {
    const array = [];

    if (selectedDateStart > hoverDate) {
      for (let i = hoverDate; i < selectedDateStart; i++) {
        array.push(i);
      }
      setHover(array);
    } else {
      for (let i = selectedDateStart; i < hoverDate; i++) {
        array.push(i);
      }
      setHover(array);
    }
  };

  const handleHover = (month, hoverDate) => {
    if (selectedDateStart && selectedDateEnd) {
      setHoveritem(hoverDate);
      return;
    }
    if (month === 1) {
      sethoverbycalender(setHoverListM1, hoverDate);
    } else {
      sethoverbycalender(setHoverListM2, hoverDate);
    }
  };

  return (
    <div className="App">
      Date Rang Picker {year}
      <div className="date-picker">
        <div className="calender">
          <div className="month-section">
            <div
              className="previous"
              onClick={() => {
                setMonth(month - 1);
              }}
            >
              {"<"}
            </div>
            <div className="month">{moment.months()[month]}</div>
            <div></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {weekNames.map((v) => (
              <div>{v}</div>
            ))}
          </div>
          <div class="dates">
            {[...Array(weekNames.indexOf(getDay(month + 1)))].map((v, i) => (
              <div className="date"></div>
            ))}
            {[...Array(daysInMonth(year, 1))].map((v, i) => (
              <div
                className={`date ${
                  (selectedDateStart === i + 1 || selectedDateEnd === i + 1) &&
                  selectedCalender === 1
                    ? "date-selected"
                    : ""
                }
                ${
                  (hoverListM1.includes(i + 1) || hoverItem === i + 1) &&
                  hoverCalender === 1
                    ? "date-hover"
                    : ""
                }
                `}
                onClick={() => {
                  setSelectedCalender(1);
                  handleDateClick(1, i + 1);
                }}
                onMouseOver={() => {
                  setHoverCalender(1);
                  handleHover(1, i + 1);
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="calender">
          <div className="month-section">
            <div></div>
            <div className="month">{moment.months()[month + 1]}</div>
            <div
              className="next"
              onClick={() => {
                setMonth(month + 1);
              }}
            >
              {">"}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {weekNames.map((v) => (
              <div>{v}</div>
            ))}
          </div>
          <div class="dates">
            {[...Array(weekNames.indexOf(getDay(month + 2)))].map((v, i) => (
              <div className="date"></div>
            ))}
            {[...Array(daysInMonth(year, 2))].map((v, i) => (
              <div
                className={`date ${
                  (selectedDateStart === i + 1 || selectedDateEnd === i + 1) &&
                  selectedCalender === 2
                    ? "date-selected"
                    : ""
                }
              ${
                (hoverListM2.includes(i + 1) || hoverItem === i + 1) &&
                hoverCalender === 2
                  ? "date-hover"
                  : ""
              }
              `}
                onClick={() => {
                  setSelectedCalender(2);
                  handleDateClick(2, i + 1);
                }}
                onMouseOver={() => {
                  setHoverCalender(2);
                  handleHover(2, i + 1);
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateRange;
