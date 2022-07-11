import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../partials/Header";
import { Grid, Container } from "@mui/material/";
import Talk from 'talkjs';

function Chat() {
  let { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [eventName, setEventName] = useState("");
  const divStyle = {
    width: "500px",
    margin: "10px",
    height: "500px"
  }

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

  useEffect(() => {
    fetchEventData(id).then(resp => {
      if (resp.status == 200) {
        resp.json().then(data => {
          setEventName(data.event_name);
          setParticipants(data.participants);
        })
      } else {
        setEventName("Sing your hearts out");
        setParticipants([
          {
            "name": "Sophia Liu",
            "email": "sophia@gmail.com",
            "kerberos": "sophia"
          },
          {
            "name": "William Ang",
            "email": "william@gmail.com",
            "kerberos": "william"
          },
          {
            "name": "Oliver Jean",
            "email": "oliver@gmail.com",
            "kerberos": "oliver"
          },
          {
            "name": "Isabella Yang",
            "email": "isabella@gmail.com",
            "kerberos": "isabella"
          },
          {
            "name": "Mia MacDonalds",
            "email": "mia@gmail.com",
            "kerberos": "mia"
          }
        ]);
      }
    })
  }, []);

  useEffect(() => {
    if (participants.length > 0) {
      console.log(eventName)
      console.log(participants)
      Talk.ready.then(() => {
        var me = new Talk.User({
          id: "fengqi",
          name: "Feng Qingyu",
          email: "louisfqy@gmail.com",
          photoUrl: "https://media-exp1.licdn.com/dms/image/C4E03AQGdLZwoz6ZuxA/profile-displayphoto-shrink_200_200/0/1652711783188?e=1659571200&v=beta&t=n6BUNC3wmN_atY6Klmds8D_ZZ4uZdimJbbjQSO6aaJg",
          role: 'default',
        });
  
        console.log(me);
  
        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: 'teQwP77v',
            me: me,
          });
        }
  
        console.log(window);
        console.log(window.talkSession);
      
        const conversation = window.talkSession.getOrCreateConversation(id);
        conversation.setParticipant(me);
        participants.forEach((participant) => {
          if (participant.kerberos != "fengqi") {
            let member = new Talk.User({
              id: participant.kerberos,
              name: participant.name,
              email: participant.email
            });
            console.log(member);
            conversation.setParticipant(member);
          }
        });
        console.log(conversation);
        conversation.setAttributes({
          subject: eventName
        })
        console.log(conversation);
        const chatbox = talkSession.createChatbox();
        chatbox.select(conversation);
        chatbox.mount(document.getElementById("talkjs-container"));
        console.log(chatbox);
  
      });
    }
  }, [participants]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Container sx={{backgroundColor: "rgb(128,181,218)", p:5, borderRadius: 15}}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
              <div id="talkjs-container" style={divStyle}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Chat;