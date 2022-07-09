import React, { useState, useRef, useEffect } from 'react';
import { Paper, List, Typography, Grid, Divider, Chip, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';

function ProfileRecommendationBox(props) {
  const [categories, setCategories] = useState([]);
  const [contactPerson, setContactPerson] = useState({});
  const [date, setDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventName, setEventName] = useState("")
  const [location, setLocation] = useState("")
  const [participants, setParticipants] = useState([])
  const [sizeCap, setSizeCap] = useState(10)
  const [startTime, setStartTime] = useState("")
  const [status, setStatus] = useState("")
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let navigate = useNavigate();

  const fetchEventData = async function(id) {
    const response = await fetch("https://28cqp5gdqf.execute-api.ap-southeast-1.amazonaws.com/dev/events/id", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({eventId: id})
    });
    
    return response;
  }


  const handleRegister = () => {
    console.log("Registering...");
    // 1. Update User History
    fetch(`https://0zbxttznx2.execute-api.ap-southeast-1.amazonaws.com/users/history/update`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: props.eventId,
        kerberos: props.kerberos 
      })
    })
      .then((response) => console.log(response));
    // 2. Update Event Participants
    fetch(`https://28cqp5gdqf.execute-api.ap-southeast-1.amazonaws.com/dev/events/addParticipant`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: props.eventId,
        kerberos: props.kerberos,
        email: props.email,
        name: props.name
      })
    })
      .then((response) => console.log(response));
    // 3. Update User Recommendations
    fetch(`https://0zbxttznx2.execute-api.ap-southeast-1.amazonaws.com/users/recommendations/remove`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        index: props.index.toString(),
        kerberos: props.kerberos
      })
    })
      .then((response) => console.log(response));
    // 4. Redirect to Different Page
    navigate("/profile");
    document.location.reload();
  }

  useEffect(() => {
    fetchEventData(props.eventId).then(resp => {
      if (resp.status == 200) {
        resp.json().then(data => {
          setCategories(data.categories);
          console.log(data.contact_person)
          setContactPerson(data.contact_person);
          setDate(data.date);
          setEndTime(data.endTime.toString());
          setEventDescription(data.event_description);
          setEventName(data.event_name);
          setLocation(data.location);
          setSizeCap(data.sizeCap);
          setStartTime(data.startTime.toString());
          setStatus(data.status);
          setParticipants(data.participants);
        })
      } else {
        setCategories(["Board Games", "Competition"]);
        setContactPerson({email: "elijah@gs.com", kerberos:"elijah", name: "Elijah Town"});
        setDate("01-07-2022");
        setEndTime("2100");
        setEventDescription("Anyone is able to join! Let's play. Splendor is a must");
        setEventName("Board Games Night");
        setLocation("Mind Cafe");
        setSizeCap(5);
        setStartTime("1900");
        setStatus("CLOSED");
        setParticipants([
          {email: "elijah@gs.com", kerberos:"elijah", name: "Elijah Town"},
          {email: "evelyn@gs.com", kerberos:"evelyn", name: "Evelyn Yong"},
          {email: "harper@gmail.com", kerberos:"harper", name: "Harper Soon"}
        ]);
      }
    })
  }, [])

  const getDay = (date) => {
    const d = new Date(date);
    return weekday.at(d.getDay());
  }

  const getParticipants = (participants) => {
    let pList = participants.map((participant) => {
      return participant["name"]
    }).join(", ");
    return pList + "...";
  }

  return (
    <Paper elevation={7} sx={{px:4, py:2.5, mb:3}}>
      <List>
        <Grid container direction="row">
          <Grid item xs={8} md={8} sx={{mb:2}}>
            <Typography variant="h6">{eventName}</Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="subtitle1" sx={{textAlign: 'right', fontWeight: 'bold'}}>{date} ({getDay(date)})</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <AccountCircleIcon sx={{mr:1}}/>
          <Typography variant="subtitle2">Creator: <b>{contactPerson.name} ({contactPerson.email})</b></Typography>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <LocationOnIcon sx={{mr:1}}/>
          <Typography variant="subtitle2">Location: <b>{location}</b></Typography>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <AccessTimeIcon sx={{mr:1}}/>
          <Typography variant="subtitle2">Time: <b>{startTime} - {endTime}</b></Typography>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <GroupIcon sx={{mr:1}}/>
          <Typography variant="subtitle2">
            Participants: <b>{participants.length} / {sizeCap}</b> <i>({getParticipants(participants)})</i>
          </Typography>
        </Grid>
        <Divider sx={{my:2}}/>
        <Grid container direction="row">
          {categories.map(category => (
            <Chip color="primary" label={category} sx={{mr:1}} variant="outlined"/>
          ))}
        </Grid>
        <Typography variant="body1" sx={{my:1.5}}>{eventDescription}</Typography>
      </List>
      <Grid container justifyContent="flex-end" sx={{mb:1}}>
        <Button variant="outlined" color="error" sx={{mr: 2}}>
          Not Interested
        </Button>
        <Button variant="outlined" color="success" onClick={handleRegister}>
          Register
        </Button>
      </Grid>
    </Paper>
  );
}

export default ProfileRecommendationBox;