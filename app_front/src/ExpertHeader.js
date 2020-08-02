import React from 'react';
import { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LabelIcon from '@material-ui/icons/Label';
import { useHistory } from "react-router-dom";

export default function ExpertHeader({displayedMissions, setDisplayedMissions}) {
  const history = useHistory();
  const [completed, setCompleted] = useState(false)
  const [uncompleted, setUncompleted] = useState(false)

  useEffect( () => {
    if (displayedMissions === "uncompleted") {
      setUncompleted(true)
      setCompleted(false)
    } else {
      setUncompleted(false)
      setCompleted(true)
    }
  }, [displayedMissions])

  const SwapPage = () =>  {
    if (displayedMissions === "uncompleted")
      setDisplayedMissions("completed")
    else
      setDisplayedMissions("uncompleted")
  }

  const Logout = () => {
    localStorage.removeItem('JWT')
    localStorage.removeItem('group')
    localStorage.removeItem('id')
    history.replace('/')
  }

  return (
      <div style={{height: '74px'}}>
          <AppBar position="fixed">
          <Toolbar>
            <LabelIcon/>
            <Button onClick={ () =>
              history.replace('/dashboard/' + localStorage.getItem("group"))}
              color='inherit'>
              {localStorage.getItem("group")}
            </Button>
            <Button
              onClick={SwapPage}
              style={{marginLeft:'auto'}}
              color='inherit'
              disabled={completed}>
              Missions terminées
            </Button>
            <Button
              onClick={SwapPage}
              color='inherit'
              disabled={uncompleted}>
              Missions en cours
            </Button>
            <Button
              onClick={Logout}
              style={{marginLeft:'auto'}}
              color='inherit'>
              Déconnection
            </Button>
          </Toolbar>
          </AppBar>
      </div>
  );
}


