import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select'
import Header from '../partials/Header';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MultiSelect } from "react-multi-select-component";






function SignUp() {
  const options = [
    { value: 'Sports', label: 'Sports' },
    { value: 'Coffee', label: 'Coffee' },
    { value: 'Happy Hour', label: 'Happy Hour' },
    { value: 'Board Games', label: 'Board Games' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Karoake', label: 'Karoake' },
    { value: 'Movies', label: 'Movies' },
    { value: 'Gym', label: 'Gym' },
    { value: 'Gaming', label: 'Gaming' }
  ]

  const [value, setValue] = React.useState(new Date('2022-07-13T10:01:01'));
  const [value1, setValue1] = React.useState(new Date('2022-07-13T10:00:00'));
  const [value2, setValue2] = React.useState(new Date('2022-07-13T11:00:00'));
  const [selected, setSelected] = useState([]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome! Post your new events here.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Contactor Person Name </label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" placeholder="Enter your name" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Contactor Person Kerbos </label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" placeholder="Enter your Kerbos" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Contactor Person Email </label>
                      <input id="email" type="email" className="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Event Name </label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" placeholder="Enter your Event Name" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Event Location</label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" placeholder="Enter your Event Location" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Event Description</label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" placeholder="Enter your Description" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Size Cap</label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" placeholder="Enter your Size Cap" required />
                    </div>
                  </div>
                  <div>
                    <p> Categories </p>
                  </div>
                  <div>
                    <MultiSelect
                      options={options}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select"
                    />
                  </div>
                  <br></br>
                  <div>
                    <p>Event Date</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                  <br></br>
                  <div>
                    <p>Start Time</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        value={value1}
                        onChange={(newValue) => {
                          setValue1(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                  <br></br>
                  <div>
                    <p>End Time</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        value={value2}
                        onChange={(newValue) => {
                          setValue2(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Submit Event</button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center mt-3">
                    By creating an event, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our GS <a className="underline" href="#0">privacy policy</a>.
                                </div>
                </form>
                {/* <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Continue with GitHub</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                      </button>
                    </div>
                  </div>
                </form> */}
                {/* <div className="text-gray-600 text-center mt-6">
                  Already using Simple? <Link to="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
                </div> */}
              </div>

            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

export default SignUp;