import React from "react";
import { useEffect, useState } from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import PropTypes from 'prop-types';
import Header from "../partials/Header";
import { Grid, Avatar, List, Typography, Container, Card, Divider, Box, Tabs, Tab, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material/";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ProfileEventBox from "../partials/ProfileEventBox";
import ProfileRecommendationBox from "../partials/ProfileRecommendationBox";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Profile() {
  const [kerberos, setKerberos] = useState("fengqi")
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [history, setHistory] = useState([]);
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [team, setTeam] = useState("");
  const [profileImg, setProfileImg] = useState("")
  const [value, setValue] = useState(0);
  const [editPreferencesStyle, setEditPreferencesStyle] = useState("")
  const [open, setOpen] = useState(false);
  const [newPreference, setNewPreference] = useState("")

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAdd = () => {
    setOpen(false);
    fetch("https://0zbxttznx2.execute-api.ap-southeast-1.amazonaws.com/users/preferences/update", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({kerberos: "fengqi", preferences: newPreference })
    })
    let newPrefList = preferences
    newPrefList.push(newPreference)
    setNewPreference("")
    setPreferences(newPrefList)
    document.location.reload();
  };

  const fetchUserData = async function() {
    const response = await fetch("https://0zbxttznx2.execute-api.ap-southeast-1.amazonaws.com/users/id", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({kerberos: kerberos})
    });
    return response;
  }

  const fetchEventsData = async function() {
    const response = await fetch("https://28cqp5gdqf.execute-api.ap-southeast-1.amazonaws.com/events/all", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });
    return response;
  }

  const updateNewPreference = (e) => {
    setNewPreference(e.target.value);
  }

  useEffect(()=>{
    var newRecommendations = []
    fetchEventsData().then(resp => {
      if (resp.status == 200) {
        resp.json().then(data => {
          data.forEach(event => {
            preferences.forEach(pref => {
              if (event.categories.includes(pref) && !history.includes(event.eventId)) {
                console.log("YO");
                console.log(event.eventId)
                newRecommendations.push(event.eventId);
              }
            })
          })
        })
        setRecommendations(newRecommendations);
        console.log(recommendations);
      } else {
        setRecommendations(["8", "9"])
      }
    })
  },[preferences])

  useEffect(() => {
    fetchUserData().then(resp => {
      if (resp.status == 200) {
        resp.json().then(data => {
          setUserName(data.name);
          setContact(data.contact);
          setHistory(data.history.map(String));
          let locationString = data.location.office_location + ", " + data.location.country
          setLocation(locationString);
          setPreferences(data.preferences);
          // setRecommendations(data.recommendations.map(String));
          setTeam(data.team);
          setProfileImg("https://media-exp1.licdn.com/dms/image/C4E03AQGdLZwoz6ZuxA/profile-displayphoto-shrink_200_200/0/1652711783188?e=1659571200&v=beta&t=n6BUNC3wmN_atY6Klmds8D_ZZ4uZdimJbbjQSO6aaJg")
        })
      } else {
        setUserName("Feng Qingyu");
        setContact("louisfqy@gmail.com");
        setHistory(["4"]);
        setLocation("Mapletree Anson, Singapore");
        setPreferences(["Karaoke", "Gaming"]);
        // setRecommendations(["8", "9"]);
        setTeam("Digital Assets");
        setProfileImg("https://media-exp1.licdn.com/dms/image/C4E03AQGdLZwoz6ZuxA/profile-displayphoto-shrink_200_200/0/1652711783188?e=1659571200&v=beta&t=n6BUNC3wmN_atY6Klmds8D_ZZ4uZdimJbbjQSO6aaJg")
      }
    })
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/*  Site header */}
      <Header/>
      <Container >
        <Grid container spacing={3} alignItems="center" justifyContent="space-around" sx={{mt: 1, pb:1, backgroundColor: "rgb(128,181,218)"}}>
          <Grid item xs={6} md={4} sx={{m:2}}>
            <Avatar
              alt="prof_pic"
              src={profileImg}
              sx={{
              border: `3px solid white`,
              width: `250px`,
              height: `250px`,
              boxShadow: `3px`,
              }}
            />
          </Grid>
          <Grid item xs={6} md={5} alignItems="center" justifyItems="center">
            <Card sx={{px:2, py:1}} style={{backgroundColor:"#e3f2fd"}} variant="outlined">
            <List>
              <Typography variant="h4">{userName}</Typography>
              <Typography variant="h6" sx={{mb:1.5}}>{team}</Typography>
              <Divider sx={{mb:2}}/>
              <Grid container direction="row" alignItems="center">
                <LocationCityIcon sx={{mr:1}}/>
                <Typography variant="subtitle1">{location}</Typography>
              </Grid>
              <Grid container direction="row" alignItems="center">
                <ContactMailIcon sx={{mr:1}}/>
                <Typography variant="subtitle1">{contact}</Typography>
              </Grid>
              <Grid container direction="row" alignItems="center"
                onMouseEnter={e => {
                  setEditPreferencesStyle('block');
                }}
                onMouseLeave={e => {
                  setEditPreferencesStyle('none')
                }}
              >
                <FavoriteIcon sx={{mr:1}}/>
                <Typography variant="subtitle1">{preferences.join(", ")}</Typography>
                <EditIcon
                  sx={{ml:1, display:editPreferencesStyle}}
                  fontSize="small"
                  onClick={handleClickOpen}
                />
              </Grid>
            </List>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt:3 }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="My Meet-ups" {...a11yProps(0)}/>
            <Tab label="Recommendations" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {history.map(myEvent => (
            <ProfileEventBox
              key={myEvent}
              eventId={myEvent}
            />
          ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {recommendations.map((rec, index) => (
            <ProfileRecommendationBox
              key={rec}
              eventId={rec}
              kerberos={kerberos}
              email={contact}
              name={userName}
              index={index}
            />
          ))}
        </TabPanel>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Interests</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update your interests and preferences to receive tailored meetup recommendations
          </DialogContentText>
          <FormGroup>
            {preferences.map((preference) => (
              <FormControlLabel control={<Checkbox defaultChecked />} label={preference} />
            ))}
          </FormGroup>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add Interest"
            type="email"
            fullWidth
            variant="standard"
            onChange={updateNewPreference}
            value={newPreference}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCloseAdd}>Add Interests</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Profile;
