import React from 'react';
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import {Redirect, useHistory} from "react-router-dom";
import { useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

export default function RegisterEmployee(props) {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [group, setGroup] = useState(null)
  const history = useHistory()

  const formCompleted = () => {
    return username && password && group
  }

  const registerNewEmployee = async () => {
    const url = "http://localhost:6200/auth/register"
    const token = localStorage.getItem('JWT')
    const employee = {username: username, password: password, group: group}

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch(err => console.log(err));
    console.log(res)
    history.go()
  }

  if (localStorage.getItem('JWT'))
    return (
      <center>
        <Typography style={{paddingTop: '10px'}} component="h1" variant="h5">
          Ajouter un nouvel employé:
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
        <FormGroup style={{display: 'flex', width: '300px', paddingTop: '10px'}}>
          <TextField
            required
            style={{marginBottom: '20px'}}
            onChange={e => setUsername(e.target.value)}
            label="Nom d'utilisateur"
          />
          <TextField
            required
            style={{marginBottom: '20px'}}
            onChange={e => setPassword(e.target.value)}
            type="password"
            label="Mot de passe"
          />
          <Select
            value={group}
            onChange={e => setGroup(e.target.value)}
            style={{marginBottom: '20px'}}
          >
            <MenuItem value={"admin"}>Administrateur</MenuItem>
            <MenuItem value={"technician"}>Technicien </MenuItem>
            <MenuItem value={"expert"}>Expert </MenuItem>
          </Select>
        </FormGroup>
        <Fab disabled={!formCompleted()}
          style={{paddingTop: 'auto'}}
          onClick={registerNewEmployee}
          color="primary"
          aria-label="add">
          <AddIcon />
        </Fab>
      </center>
    );
  else
    return (
      <Redirect to='/' />
    );
}

