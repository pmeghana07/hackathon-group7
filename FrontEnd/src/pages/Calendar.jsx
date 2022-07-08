import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, toast } from "@mobiscroll/react";
import Header from "../partials/Header";
import { Grid } from "@mui/material/";

function Calendar() {
  // const [myEvents, setEvents] = React.useState([]);
  const events = [
    {
      color: "#ff6d42",
      end: "2022-07-14T16:00:00.000Z",
      id: "mbsc_38",
      start: "2022-07-11T07:00:00.000Z",
      title: "Business of Software Conference",
    },
    {
      color: "#ff6d42",
      end: "2022-07-14T16:00:00.000Z",
      id: "mbsc_38",
      start: "2022-07-11T07:00:00.000Z",
      title: "Business of Software Conference",
    },
    {
      color: "#ff6d42",
      end: "2022-07-14T16:00:00.000Z",
      id: "mbsc_38",
      start: "2022-07-11T07:00:00.000Z",
      title: "Business of Software Conference",
    },
    {
      color: "#ff6d42",
      end: "2022-07-14T16:00:00.000Z",
      id: "mbsc_38",
      start: "2022-07-11T07:00:00.000Z",
      title: "Business of Software Conference",
    },
  ];

  // React.useEffect(() => {
  //     getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
  //         setEvents(events);
  //     }, 'jsonp');
  // }, []);

  const onEventClick = React.useCallback((event) => {
    toast({
      message: event.event.title,
    });
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
        </Grid>
      </Grid>
    </div>
  );
}

export default Calendar;
