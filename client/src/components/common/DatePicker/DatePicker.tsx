import React, { ChangeEventHandler, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
interface DatePickerComponentProps {
  text: string;
  selected: Date;
  startDate: Date;
  endDate: Date;
  handleDateChange: any;
  //handleDateChange: (date: Date | [Date | null, Date | null] | null, event: React.SyntheticEvent<any, Event> | undefined) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  text,
  selected,
  startDate,
  endDate,
  handleDateChange
}) => {
  //console.log(selected)
  //const [startDate, setStartDate] = useState(new Date())
  //const [endDate, setEndDate] = useState(new Date())
  //const [endDate, setEndDate] = useState(new Date().setMonth(startDate.getMonth() + 1))
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">{text}</div>
          <div className="col-span-2">
            <DatePicker
              closeOnScroll={true}
              className="w-full text-center"
              selected={selected}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              nextMonthButtonLabel=">"
              previousMonthButtonLabel="<"
            />
          </div>
        </div>


      </div>
    </div>
  )
}

export default DatePickerComponent;

