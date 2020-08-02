import React from 'react';
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import {Redirect} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Select from "react-dropdown-select";
import { useState, useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import dateUtils from '@date-io/dayjs';

const fetchTechnicians = async () => {
  const url = "http://localhost:6200/employee/technicians"
  const token = localStorage.getItem('JWT')

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
    .catch(err => console.log(err));
  console.log(res)
  return res
}

export default function AddMission(props) {
  const [missionName, setMissionName] = useState(null)
  const [startingDate, setStartingDate] = useState(null)
  const [location, setLocation] = useState(null)
  const [estimmatedTime, setEstimmatedTime] = useState(null)
  const [selectedTechnicians, setSelectedTechnicians] = useState(null)
  const [technicians, setTechnicians] = useState(null)
  const [status, setStatus] = useState(null)
  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      setTechnicians(await fetchTechnicians())
    }
    fetchData()
  }, [])

  const formCompleted = () => {
    return status && selectedTechnicians && location
      && missionName && startingDate && estimmatedTime && selectedTechnicians !== []
  }

  const registerNewMission = async () => {
    const url = "http://localhost:6200/mission/add"
    const token = localStorage.getItem('JWT')
    const mission = {name: missionName, date: startingDate,
                    location: location, estimmatedTime: estimmatedTime,
                    technicians: selectedTechnicians, status: status };

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(mission),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch(err => console.log(err));
    console.log(res)
    history.push('/dashboard/' + localStorage.getItem('group'))
  }

  if (localStorage.getItem('JWT'))
    return (
      <center>
        <Typography style={{paddingTop: '10px'}} component="h1" variant="h5">
          Ajouter une nouvelle mission:
        </Typography>
        <hr style={{
          display: 'block',
          height: '1px',
          border: '0',
          borderTop: '1px solid #ccc',
          margin: '1em 0',
          padding: '0'
        }}
        />
        <FormGroup style={{display: 'block', width: '300px', paddingTop: '10px'}}>
          <TextField
            required
            style={{marginBottom: '20px'}}
            onChange={e => setMissionName(e.target.value)}
            label="Nom"
          />
          <TextField
            required
            style={{marginBottom: '20px'}}
            onChange={e => setLocation(e.target.value)}
            label="Lieu"
          />
          <Typography style={{paddingTop: '5px'}} component="h5">
            Affecter des techniciens:
          </Typography>
          <Select
            options={technicians}
            valueField="username"
            labelField="username"
            multi={true}
            required={true}
            separator={true}
            searchable={true}
            onChange={(selectedTechnicians) => {setSelectedTechnicians(selectedTechnicians)}}
          />
          <MuiPickersUtilsProvider utils={dateUtils}>
            <KeyboardDatePicker
              style={{width:"215px"}}
              margin="normal"
              label="Date de départ"
              value={startingDate}
              format="dd/MM/YYYY"
              onChange={date => {setStartingDate(date)}}
              KeyboardButtonProps={{'aria-label': 'change date',}}
            />
          <TextField
            required
            multiline
            style={{marginBottom: '20px'}}
            onChange={e => setStatus(e.target.value)}
            label="Status actuel"
          />
          <TextField
            required
            type="number"
            inputProps={{min: "0"}}
            style={{marginBottom: '20px'}}
            onChange={e => setEstimmatedTime(e.target.value)}
            label="Temps requis (en jours)"
          />
          </MuiPickersUtilsProvider>
        </FormGroup>
        <Fab disabled={!formCompleted()} style={{paddingTop: 'auto'}} onClick={registerNewMission} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </center>
    );
  else
    return (
      <Redirect to='/' />
    );
}

