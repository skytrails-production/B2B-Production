import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "../../DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "../../DatePickerCustomDay";
import ClearDataButton from "../../ClearDataButton";
import dayjs from "dayjs";
import { parseISO, isValid } from "date-fns";

// Helper function to format dates as "YYYY-MM-DD"
const convertToISOString = (dateString) => {
  // Parse the input date string
  const parsedDate = dayjs(dateString, "DD MMM, YY");

  const d = parsedDate.isValid() ? parsedDate.toDate().toString() : null;
  // console.log(d, "startDate enddate1");
  return d;
};

const ensureDate = (date) => {
  // console.log(date, "dateeee");
  if (!date) return null;
  if (typeof date === "string") {
    const parsedDate = parseISO(date); // Use parseISO to safely parse strings
    return isValid(parsedDate) ? parsedDate : new Date(date);
  }
  return date instanceof Date ? date : null;
};

// const formatDate = (date) => {
//   console.log(date, date ? date.toISOString().split("T")[0] : null);
// };

const ReturnResultDateBox = ({
  className = "[ lg:nc-flex-2 ]",
  fieldClassName = "[ p-3 ]",
  onDateChange,
  StartDate,
  EndDate,
}) => {
  const today = ensureDate(StartDate) || new Date();

  // console.log(today, "today in date box");
  const todayDefult = new Date();

  // convertToISOString(StartDate);

  const twoDays = new Date(todayDefult);
  twoDays.setDate(todayDefult.getDate() + 2);
  const twoDaysLater = ensureDate(EndDate) || twoDays;

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(twoDaysLater);

  // console.log(startDate, "start in the date box");
  // console.log(endDate, "end in the date box");

  useEffect(() => {
    setStartDate(today);
    setEndDate(twoDaysLater);
  }, [StartDate, EndDate]);

  // const onChangeDate = (dates, closePopover) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  //   if (start && end) {
  //     closePopover();
  //   }
  // };

  const onChangeDate = (dates, closePopover) => {
    const [start, end] = dates;
    // console.log(start, end, dates, "startenddd");
    setStartDate(start);
    setEndDate(end);
    // if (onDateChange) onDateChange({ startDate, endDate });
    if (start && end) closePopover();
  };

  useEffect(() => {
    if (onDateChange) {
      onDateChange({ startDate, endDate });
    }
  }, [startDate, endDate, onDateChange]);

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7 text-[#D1D5DB]" />
        </div>
        <div className="flex-grow text-left">
          <span className="block w-full p-0 text-xl font-bold text-gray-100 truncate bg-transparent border-none placeholder:text-gray-100 focus:ring-0 focus:outline-none md:text-xl lg:text-xl xl:text-xl placeholder-neutral-800">
            {typeof startDate == "object"
              ? startDate?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                }) || "Add dates"
              : new Date(startDate)?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                }) || "Add dates"}
            {" - "}
            {endDate
              ? " - " + typeof endDate == "object"
                ? endDate?.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })
                : new Date(endDate)?.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                  })
              : ""}
          </span>
          <span className="block mt-0.5 text-[0.8rem] text-gray-100 font-medium">
            {"Departure - Return"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open, close }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            <Popover.Button
              className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none ${
                open ? "nc-hero-field-focused" : ""
              }`}
            >
              {renderInput()}
              {startDate && open && (
                <ClearDataButton onClick={() => onChangeDate([null, null])} />
              )}
            </Popover.Button>

            {/* {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4">
                <a
                  onClick={onSubmit}
                  type="button"
                  className="flex items-center justify-center rounded-full h-14 md:h-16 w-14 md:w-16 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none"
                >
                  {loader ? (
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 200 200"
                    >
                      <radialGradient
                        id="a2"
                        cx=".66"
                        fx=".66"
                        cy=".3125"
                        fy=".3125"
                        gradientTransform="scale(1.5)"
                      >
                        <stop offset="0" stop-color="#FFFFFF"></stop>
                        <stop
                          offset=".3"
                          stop-color="#FFFFFF"
                          stop-opacity=".9"
                        ></stop>
                        <stop
                          offset=".6"
                          stop-color="#FFFFFF"
                          stop-opacity=".6"
                        ></stop>
                        <stop
                          offset=".8"
                          stop-color="#FFFFFF"
                          stop-opacity=".3"
                        ></stop>
                        <stop
                          offset="1"
                          stop-color="#FFFFFF"
                          stop-opacity="0"
                        ></stop>
                      </radialGradient>
                      <circle
                        transform-origin="center"
                        fill="none"
                        stroke="url(#a2)"
                        stroke-width="15"
                        stroke-linecap="round"
                        stroke-dasharray="200 1000"
                        stroke-dashoffset="0"
                        cx="100"
                        cy="100"
                        r="70"
                      >
                        <animateTransform
                          type="rotate"
                          attributeName="transform"
                          calcMode="spline"
                          dur="2"
                          values="360;0"
                          keyTimes="0;1"
                          keySplines="0 0 1 1"
                          repeatCount="indefinite"
                        ></animateTransform>
                      </circle>
                      <circle
                        transform-origin="center"
                        fill="none"
                        opacity=".2"
                        stroke="#FFFFFF"
                        stroke-width="15"
                        stroke-linecap="round"
                        cx="100"
                        cy="100"
                        r="70"
                      ></circle>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </a>
              </div>
            )} */}
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 md:left-0 z-30 mt-[-40px] top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="p-8 overflow-hidden bg-white shadow-lg rounded-3xl ring-1 ring-black ring-opacity-5">
                <DatePicker
                  selected={
                    typeof startDate == "object"
                      ? startDate
                      : new Date(startDate)
                  }
                  onChange={(dates) => onChangeDate(dates, close)}
                  startDate={
                    typeof startDate == "object"
                      ? startDate
                      : new Date(startDate)
                  }
                  endDate={
                    typeof endDate == "object" ? endDate : new Date(endDate)
                  }
                  selectsRange
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  // minDate={today}
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ReturnResultDateBox;
