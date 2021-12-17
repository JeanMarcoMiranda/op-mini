import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
interface DatePickerComponentProps {
  text: string;
  selected: Date;
  startDate: Date;
  endDate: Date;
  handleDateChange: any;
  disabled?: boolean;
  //handleDateChange: (date: Date | [Date | null, Date | null] | null, event: React.SyntheticEvent<any, Event> | undefined) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  text,
  selected,
  startDate,
  endDate,
  handleDateChange,
  disabled
}) => {

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
              dateFormat="dd/MM/yy"
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatePickerComponent;

