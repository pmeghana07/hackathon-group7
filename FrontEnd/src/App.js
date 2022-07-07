import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


function App() {
  const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Let's Meet! 
        </p>
        <DatePicker
          selected={date}
          onSelect={handleDateSelect} //when day is clicked
          onChange={handleDateChange} //only when value has changed
        />
      </header>
    </div>
  );
}

export default App;
