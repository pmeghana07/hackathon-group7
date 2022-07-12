import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'
import Header from '../partials/Header';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MultiSelect } from "react-multi-select-component";
import { Button } from '@mui/material';


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
  const [name, setName] = React.useState("");
  const [desc, setdesc] = React.useState("");
  const [loca, setloca] = React.useState("");
  const [cap, setcap] = React.useState("");
  const [cname, setcname] = React.useState("Feng Qingyu");
  const [email, setemail] = React.useState("louisfqy@gmail.com");
  const [kerb, setkerb] = React.useState("fengqi");
  let navigate = useNavigate();

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onSubmit = (event) => {
    // alert(`The name you entered was: ${value}`)
    alert("Hello world");
  };

  const postEventData = async function(payload) {
    const response = await fetch("https://28cqp5gdqf.execute-api.ap-southeast-1.amazonaws.com/dev/events/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    return response;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    var cate = [];
    for (var i = 0; i < selected.length; i++) {
      console.log(selected[i].label);
      cate[i] = selected[i].label;
    }

    const yyyy = value.getFullYear();
    let mm = value.getMonth() + 1; 
    let dd = value.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    var date_formatted = dd + '-' + mm + '-' + yyyy;
    console.log(date_formatted);

    var start_unformatted = value1.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    var start_formatted = start_unformatted.substring(0,2) + start_unformatted.substring(3,5);
    var end_unformatted = value2.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    var end_formatted = end_unformatted.substring(0,2) + end_unformatted.substring(3,5);


    var payload =  {
        "location": loca,
        "startTime": start_formatted,
        "endTime": end_formatted,
        "date": date_formatted,
        "categories": cate,
        "event_name": name,
        "event_description": desc,
        "sizeCap": cap,
        "contactPersonKerberos": kerb,
        "contactPersonName": cname,
        "contactPersonEmail": email,
        "participants": [
          {
            "email": "fengqi",
            "kerberos": "louisfqy@gmail.com",
            "name": "Feng Qingyu"
          }
        ]
    };

    console.log(payload);

    postEventData(payload).then(resp => {
      console.log(resp);
    })

    navigate("/calendar");
  }
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-12 pb-12 md:mt-20 md:mb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
                <h2 className="h2">Good times await. Plan a meetup now!</h2>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-bg font-medium mb-1" htmlFor="name">Event Name <span className="text-red-600">*</span></label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your Event Name" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-bg font-medium mb-1" htmlFor="name">Event Description </label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" value={desc} onChange={e => setdesc(e.target.value)} placeholder="Enter your Description" max="500" />
                    </div>
                  </div>
                  <div>
                    <p>Event Date<span className="text-red-600">*</span></p>
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
                    <p>Start Time<span className="text-red-600">*</span></p>
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
                    <p>End Time<span className="text-red-600">*</span></p>
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
                  <br></br>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-bg font-medium mb-1" htmlFor="name">Event Location<span className="text-red-600">*</span></label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" value={loca} onChange={e => setloca(e.target.value)}  placeholder="Enter your Event Location" required />
                    </div>
                  </div>
                  <div>
                    <p> Categories<span className="text-red-600">*</span> </p>
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
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-bg font-medium mb-1" htmlFor="name">Size Cap<span className="text-red-600">*</span></label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" value={cap} onChange={e => setcap(e.target.value)}  placeholder="Enter your Size Cap" required />
                    </div>
                  </div>
                  
                {/* <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-bg font-medium mb-1" htmlFor="name">Contactor Person Name<span className="text-red-600">*</span> </label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" value={cname} onChange={e => setcname(e.target.value)} placeholder="Enter your name" required />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-bg font-medium mb-1" htmlFor="name">Contactor Person Kerbos<span className="text-red-600">*</span> </label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" value={kerb} onChange={e => setkerb(e.target.value)} placeholder="Enter your kerbos" required />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-bg font-medium mb-1" htmlFor="email">Contactor Person Email<span className="text-red-600">*</span> </label>
                      <input id="email" type="email" className="form-input w-full text-gray-800" value={email} onChange={e => setemail(e.target.value)} placeholder="Enter your email address" required />
                    </div>
                  </div> */}
                  
                  <br></br>
                  
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"  onClick={handleSubmit}>Submit Event</button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center mt-3">
                    By creating a meetup, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our GS <a className="underline" href="#0">privacy policy</a>.
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