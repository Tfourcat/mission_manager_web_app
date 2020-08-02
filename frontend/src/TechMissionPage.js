import React from 'react';
import {Redirect} from "react-router-dom";
import { useEffect, useState } from 'react';
import {ListItem, ListItemText} from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import './List.css';
import moment from 'moment'

const fetchMissions = async () => {
  const URL = "http://localhost:6200/mission/affected"

  const token = localStorage.getItem('JWT')
  const userId = { _id: localStorage.getItem('id') }
  const res = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(userId),
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
  }).then(res => res.json());
  console.log(res)
  return res
}

export default function TechMissionsPage({ displayedMissions }) {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const missions = await fetchMissions()
      setMissions(missions)
    }
    fetchData()
  }, [])

  const validateMission = async (e, mission) => {
    e.preventDefault()
    const url = 'http://localhost:6200/mission/setFinished'
    const token = localStorage.getItem('JWT')
    const missionId = {_id: mission._id}

    await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(missionId),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())

    const newMissions = missions.filter(function(item) {
      return item !== mission
    })
    setMissions(newMissions)
  }

  const logged = localStorage.getItem('JWT');
  if (logged) {
    return (
      <div>
        <ul style={{padding: '0', paddingTop: '10px', overflow: 'auto'}}>
          {missions.filter(mission => mission.finished === false).map(mission => <React.Fragment key={mission._id}>
            <ListItem divider>
              <ListItemText primary={mission.name} secondary={<>Lieu: {mission.location}</>} />
              <ListItemText primary={<>Techniciens: {mission.technicians.map(item => item.username + ' ')}</>} />
              <ListItemText primary={<>Date: {moment(mission.date).format('DD-MM-YYYY')}</>} secondary={<>Status: {mission.status}</>}/>
              <ListItemSecondaryAction>
                <Fab onClick={event => validateMission(event, mission)}
                  size='small'
                  style={{background:"#4caf50"}}>
                  <CheckIcon style={{color:"white"}}/>
                </Fab>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>)}
        </ul>
      </div>
    );
  } else
    return (<Redirect to='/' />);
}
