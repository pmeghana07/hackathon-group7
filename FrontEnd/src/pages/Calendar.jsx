import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, toast } from "@mobiscroll/react";
import Header from "../partials/Header";
import { Grid } from "@mui/material/";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import Chip from "@mui/material/Chip";

function Calendar() {
  const [currentEvent, setCurrentEvent] = React.useState();
  const backendEvent = [
    {
      eventId: "2",
      categories: ["Sports", "Badminton", "Pairs"],
      contact_person: {
        email: "liam@gs.com",
        kerberos: "liam",
        name: "Liam Tan",
      },
      date: "23-07-2022",
      endTime: 1400,
      event_description:
        "Lets play badminton together at National stadium. Rackets will not be provided!",
      event_name: "Badminton together!",
      location: "National Stadium",
      participants: [
        {
          email: "noah@gs.com",
          kerberos: "noah",
          name: "Noah Lim",
        },
        {
          email: "liam@gmail.com",
          kerberos: "liam",
          name: "Liam Tan",
        },
      ],
      sizeCap: 8,
      startTime: 1000,
      status: "OPEN",
    },
    {
      eventId: "1",
      categories: ["Coffee", "Hangout"],
      contact_person: {
        email: "oliver@gs.com",
        kerberos: "oliver",
        name: "Oliver Jean",
      },
      date: "15-08-2022",
      endTime: 1130,
      event_description: "Lets get coffee and chill",
      event_name: "Looking for people to have some coffee with ",
      location: "Atlas Coffee House",
      participants: [
        {
          email: "oliver@gs.com",
          kerberos: "oliver",
          name: "Oliver Jean",
        },
        {
          email: "elijah@gmail.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "james@gmail.com",
          kerberos: "james",
          name: "James Hill",
        },
        {
          email: "noah@gmail.com",
          kerberos: "noah",
          name: "Noah Lim",
        },
      ],
      sizeCap: 6,
      startTime: 1000,
      status: "OPEN",
    },
    {
      eventId: "8",
      categories: ["Karaoke ", "Singing", "Indoors", "Aircon"],
      contact_person: {
        email: "william@gs.com",
        kerberos: "william",
        name: "William Ang",
      },
      date: "06-08-2022",
      endTime: 2330,
      event_description:
        "Since karaokes just opened up, would love to go back and sing my heart out! do join me if you want to sing as well!",
      event_name: "Sing your hearts out",
      location: "Teo Heng JCube",
      participants: [
        {
          email: "sophia@gmail.com",
          kerberos: "sophia",
          name: "Sophia Liu",
        },
        {
          email: "william@gmail.com",
          kerberos: "william",
          name: "William Ang",
        },
        {
          email: "oliver@gmail.com",
          kerberos: "oliver",
          name: "Oliver Jean",
        },
        {
          email: "isabella@gmail.com",
          kerberos: "isabella",
          name: "Isabella Yang",
        },
        {
          email: "mia@gmail.com",
          kerberos: "mia",
          name: "Mia Kall",
        },
      ],
      sizeCap: 5,
      startTime: 2000,
      status: "CLOSED",
    },
    {
      eventId: "4",
      categories: ["Board Games", "Competition"],
      contact_person: {
        email: "elijah@gs.com",
        kerberos: "elijah",
        name: "Elijah Town",
      },
      date: "01-07-2022",
      endTime: 2100,
      event_description:
        "Anyone is able to join! Lets play board games! CodeNames is a must!",
      event_name: "Board Games Night",
      location: "Mind Cafe",
      participants: [
        {
          email: "evelyn@gs.com",
          kerberos: "evelyn",
          name: "Evelyn Yong",
        },
        {
          email: "harper@gmail.com",
          kerberos: "harper",
          name: "Harper Soon",
        },
        {
          email: "elijah@gmail.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
      ],
      sizeCap: 5,
      startTime: 1900,
      status: "CLOSED",
    },
    {
      eventId: "9",
      categories: ["Gaming", "Competition", "Indoors"],
      contact_person: {
        email: "isabella@gs.com",
        kerberos: "isabella",
        name: "Isabella Yang",
      },
      date: "17-08-2022",
      endTime: 1800,
      event_description: "Lets have a battle in League together!",
      event_name: "League of Legends",
      location: "Big O gaming cafe",
      participants: [
        {
          email: "isabella@gmail.com",
          kerberos: "isabella",
          name: "Isabella Yang",
        },
        {
          email: "evelyn@gmail.com",
          kerberos: "evelyn",
          name: "Evelyn Yong",
        },
        {
          email: "harper@gmail.com",
          kerberos: "harper",
          name: "Harper Soon",
        },
      ],
      sizeCap: 10,
      startTime: 1300,
      status: "OPEN",
    },
    {
      eventId: "6",
      categories: ["Movies", "Comics", "Popcorn", "Indoors", "Aircon"],
      contact_person: {
        email: "ava@gs.com",
        kerberos: "ava",
        name: "Ava Fong",
      },
      date: "20-07-2022",
      endTime: 2300,
      event_description:
        "MARVEL ENTHUSIASTS! Lets watch Thor: Love and Thunder over the weekend!",
      event_name: "Thor: Love and Thunder!",
      location: "Shaw House",
      participants: [
        {
          email: "oliver@gmail.com",
          kerberos: "oliver",
          name: "Oliver Jean",
        },
        {
          email: "ava@gmail.com",
          kerberos: "ava",
          name: "Ava Fong",
        },
      ],
      sizeCap: 4,
      startTime: 2000,
      status: "OPEN",
    },
    {
      eventId: "7",
      categories: ["Gym", "Exercise", "Healthy living"],
      contact_person: {
        email: "sophia@gs.com",
        kerberos: "sophia",
        name: "Sophia Liu",
      },
      date: "06-08-2022",
      endTime: 2300,
      event_description:
        "I am slowly getting back into my exercise routine and I am looking for people to work out with! ",
      event_name: "Lets be workout buddies",
      location: "AnytimeFitness",
      participants: [
        {
          email: "sophia@gmail.com",
          kerberos: "sophia",
          name: "Sophia Liu",
        },
        {
          email: "oliver@gmail.com",
          kerberos: "oliver",
          name: "Oliver Jean",
        },
        {
          email: "ava@gmail.com",
          kerberos: "ava",
          name: "Ava Fong",
        },
      ],
      sizeCap: 4,
      startTime: 2100,
      status: "OPEN",
    },
    {
      eventId: "3",
      categories: ["Happy Hour", "Drinks", "Bar"],
      contact_person: {
        email: "oliver@gs.com",
        kerberos: "oliver",
        name: "Oliver Jean",
      },
      date: "20-08-2022",
      endTime: 2200,
      event_description:
        "Feeling generous and want to meet people! Join me in getting drinks :)",
      event_name: "Drinks on me everyone",
      location: "Tipsy Tavern",
      participants: [
        {
          email: "oliver@gs.com",
          kerberos: "oliver",
          name: "Oliver Jean",
        },
        {
          email: "mia@gmail.com",
          kerberos: "mia",
          name: "Mia Kall",
        },
      ],
      sizeCap: 12,
      startTime: 1900,
      status: "OPEN",
    },
    {
      eventId: "10",
      categories: ["Happy Hour", "Drinks", "Roof top"],
      contact_person: {
        email: "mia@gs.com",
        kerberos: "mia",
        name: "Mia Kall",
      },
      date: "29-07-2022",
      endTime: 2200,
      event_description:
        "Been a while since i had drinks so lets go get some and have a good time!",
      event_name: "Lets grab a drink and have fun!",
      location: "Graffiti Sky Bar",
      participants: [
        {
          email: "mia@gmail.com",
          kerberos: "mia",
          name: "Mia Kall",
        },
        {
          email: "liam@gmail.com",
          kerberos: "liam",
          name: "Liam Tan",
        },
        {
          email: "william@gmail.com",
          kerberos: "william",
          name: "William Ang",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
        {
          email: "elijah@gs.com",
          kerberos: "elijah",
          name: "Elijah Town",
        },
      ],
      sizeCap: 10,
      startTime: 1900,
      status: "OPEN",
    },
  ];

  const events = [];
  for (var i=0;i<backendEvent.length;i++) {
    var date = backendEvent[i].date.split('-');
    var startHour = Math.floor(backendEvent[i].startTime/100);
    var startMin = backendEvent[i].startTime % 100;
    var endHour = Math.floor(backendEvent[i].endTime/100);
    var endMin = backendEvent[i].endTime % 100;
    
    var current = {
      color: "#ff6d42",
      start: new Date(parseInt(date[2]),parseInt(date[1]),parseInt(date[0]),startHour, startMin).toISOString(),
      id: backendEvent[i].eventId,
      end: new Date(parseInt(date[2]),parseInt(date[1]),parseInt(date[0]),endHour, endMin).toISOString(),
      title: backendEvent[i].event_name,
    }
    events.push(current);
  }
  
  const onEventClick = React.useCallback((event) => {
    var currentEvent = backendEvent.find(x => x.eventId == event.event.id);
    setCurrentEvent(currentEvent);
  }, []);

  const view = React.useMemo(() => {
    return {
      calendar: { labels: true },
    };
  }, []);

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

export default Calendar;
