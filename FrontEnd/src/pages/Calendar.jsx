import React, { useEffect } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, toast } from "@mobiscroll/react";
import Header from "../partials/Header";
import { Grid, Button } from "@mui/material/";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import Chip from "@mui/material/Chip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Calendar() {
  const [currentEvent, setCurrentEvent] = React.useState();
  const [backendEvents, setBackendEvent] = React.useState();
  const [registered, setRegistered] = React.useState(false);
  const [user, setUser] = React.useState();

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(
        "https://28cqp5gdqf.execute-api.ap-southeast-1.amazonaws.com/dev/events/all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (response.status == 200) {
        response.json().then((data) => {
          setBackendEvent(data);
        });
      }
    };

    const getUser = async () => {
      const response = await fetch(
        "https://0zbxttznx2.execute-api.ap-southeast-1.amazonaws.com/users/id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ kerberos: "fengqi" }),
        }
      );
      var user;
      if (response.status == 200) {
        response.json().then((data) => {
          setUser(data);
        });
      }
    };

    getEvents();
    getUser();
  }, []);

  const onEventClick = (event) => {
    if (backendEvents) {
      for (var i = 0; i < backendEvents.length; i++) {
        if (backendEvents[i].eventId === event.event.id) {
          setCurrentEvent(backendEvents[i]);
        }
      }
    }
  };

  const handleRegister = async () => {
    console.log("Registering...");

    // // 1. Update User History
    // fetch(
    //   `https://0zbxttznx2.execute-api.ap-southeast-1.amazonaws.com/users/history/update`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       eventId: currentEvent.eventId,
    //       kerberos: user.kerberos,
    //     }),
    //   }
    // ).then((response) => console.log(response));
    // // 2. Update Event Participants
    // fetch(
    //   `https://28cqp5gdqf.execute-api.ap-southeast-1.amazonaws.com/events/addParticipant`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       eventId: currentEvent.eventId,
    //       kerberos: user.kerberos,
    //       email: user.email,
    //       name: user.name,
    //     }),
    //   }
    // ).then((response) => console.log(response));

    setRegistered(true);
  };

  const view = React.useMemo(() => {
    return {
      calendar: { labels: true },
    };
  }, []);

  if (!backendEvents) {
    return <div />;
  } else {
    const events = [];
    for (var i = 0; i < backendEvents.length; i++) {
      var date = backendEvents[i].date.split("-");
      var startHour = Math.floor(backendEvents[i].startTime / 100);
      var startMin = backendEvents[i].startTime % 100;
      var endHour = Math.floor(backendEvents[i].endTime / 100);
      var endMin = backendEvents[i].endTime % 100;
      var current = {
        color: "#ff6d42",
        start: new Date(
          parseInt(date[2]),
          parseInt(date[1]) - 1,
          parseInt(date[0]),
          startHour,
          startMin
        ).toISOString(),
        id: backendEvents[i].eventId,
        end: new Date(
          parseInt(date[2]),
          parseInt(date[1]) - 1,
          parseInt(date[0]),
          endHour,
          endMin
        ).toISOString(),
        title: backendEvents[i].event_name,
      };
      events.push(current);
    }

    return (
      <div className="flex flex-col min-h-screen">
        {/*  Site header */}
        <Header />

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Eventcalendar
              theme="ios"
              themeVariant="light"
              clickToCreate={false}
              dragToCreate={false}
              dragToMove={false}
              dragToResize={false}
              eventDelete={false}
              data={events}
              view={view}
              onEventClick={onEventClick}
            />
          </Grid>
          <Grid item xs={4}>
            {currentEvent && (
              <div class="event md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 class="h4 mb-3">{currentEvent.event_name}</h3>
                <p class="text-l text-gray-600 mb-4">
                  {currentEvent.event_description}
                </p>
                {currentEvent.categories.map((category) => (
                  <Chip label={category} />
                ))}

                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <LocationOnIcon />
                  </Grid>
                  &nbsp;Location:&nbsp;
                  <Grid item>
                    <p class="text-l text-gray-600">{currentEvent.location}</p>
                  </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <AccessTimeIcon />
                  </Grid>
                  &nbsp;
                  <Grid item>
                    <p class="text-l text-gray-600">{currentEvent.date}</p>
                  </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center">
                  <Grid item>Start Time:</Grid>
                  &nbsp;
                  <Grid item>
                    <p class="text-l text-gray-600">
                      {currentEvent.startTime.toString().slice(0, 2)}:
                      {currentEvent.startTime.toString().slice(2, 4)}
                    </p>
                  </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center">
                  <Grid item>End Time:</Grid>
                  &nbsp;
                  <Grid item>
                    <p class="text-l text-gray-600">
                      {currentEvent.endTime.toString().slice(0, 2)}:
                      {currentEvent.endTime.toString().slice(2, 4)}
                    </p>
                  </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <GroupIcon />
                  </Grid>
                  &nbsp;Group Size:&nbsp;
                  <Grid item>
                    <p class="text-l text-gray-600">{currentEvent.sizeCap}</p>
                  </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <PersonIcon />
                  </Grid>
                  &nbsp;Contact Person:&nbsp;
                  <Grid item>
                    <p class="text-l text-gray-600">
                      {currentEvent.contact_person.name}
                    </p>
                  </Grid>
                </Grid>

                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <EmailIcon />
                  </Grid>
                  &nbsp;Contact Email:&nbsp;
                  <Grid item>
                    <p class="text-l text-gray-600">
                      {currentEvent.contact_person.email}
                    </p>
                  </Grid>
                </Grid>

                {!registered && (
                  <Button
                    variant="outlined"
                    onClick={handleRegister}
                    className="register-button"
                  >
                    Register
                  </Button>
                )}

                {registered && (
                  <Button
                  variant="outlined"
                  disabled
                >
                  Registered
                </Button>
                )}
              </div>
            )}
            {!currentEvent && (
              <div class="event md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 class="h4 mb-3">Event Details</h3>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Calendar;
