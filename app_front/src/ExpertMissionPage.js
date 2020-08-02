import React from 'react';
import {Redirect} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {ListItem, ListItemText} from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './List.css';
import moment from 'moment'

const fetchMissions = async () => {
  const URL = "http://localhost:6200/mission"

  const token = localStorage.getItem('JWT')
  const res = await fetch(URL, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
  }).then(res => res.json());
  return res
}

export default function ExpertMissionsPage({ displayedMissions }) {
  const [missions, setMissions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const missions = await fetchMissions()
      setMissions(missions)
    }
    fetchData()
  }, [])

  const deleteMission = async (e, mission) => {
    e.preventDefault()
    const url = 'http://localhost:6200/mission/delete'
    const token = localStorage.getItem('JWT')
    const missionId = {_id: mission._id}

    await fetch(url, {
      method: 'DELETE',
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

  const filterMissions = (missions) => {
    if (displayedMissions === "completed")
      return missions.filter(mission => mission.finished === true)
    else
      return missions.filter(mission => mission.finished === false)
  }

  const disableButtons = () => {
    if (displayedMissions === "completed")
      return true
    else
      return false
  }

  const logged = localStorage.getItem('JWT');
  if (logged) {
    return (
      <div>
        <ul style={{padding: '0', paddingTop: '10px', overflow: 'auto'}}>
          {filterMissions(missions).map(mission => <React.Fragment key={mission._id}>
            <ListItem divider>
              <ListItemText primary={mission.name} secondary={<>Lieu: {mission.location}</>} />
              <ListItemText primary={<>Techniciens: {mission.technicians.map(item => item.username + ' ')}</>} />
              <ListItemText primary={<>Date: {moment(mission.date).format('DD-MM-YYYY')}</>} secondary={<>Status: {mission.status}</>}/>
              <ListItemSecondaryAction>
                <Fab onClick={event => deleteMission(event, mission)}
                  size='small'
                  disabled={disableButtons()}
                  color='secondary'>
                  <DeleteForeverIcon />
                </Fab>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>)}
        </ul>
        <center>
          <Fab onClick={() => history.replace(document.location.pathname + '/addMission')}
            color="primary"
            aria-label="add"
            disabled={disableButtons()}>
            <AddIcon />
          </Fab>
        </center>
      </div>
    );
  } else
    return (<Redirect to='/' />);
}
