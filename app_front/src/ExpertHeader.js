import React from 'react';
import {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LabelIcon from '@material-ui/icons/Label';
import {useHistory} from "react-router-dom";

export default function ExpertHeader({displayedMissions, setDisplayedMissions}) {
  const history = useHistory();
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
      setCompleted(displayedMissions === "completed")
  }, [displayedMissions])

  const SwapPage = () => {
    setDisplayedMissions(displayedMissions === "uncompleted" ? "completed" : "uncompleted")
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
          <LabelIcon />
          <Button onClick={() =>
            history.replace('/dashboard/' + localStorage.getItem("group"))}
            color='inherit'>
            {localStorage.getItem("group")}
          </Button>
          <Button
            onClick={SwapPage}
            style={{marginLeft: 'auto'}}
            color='inherit'
            disabled={completed}>
            Missions terminées
            </Button>
          <Button
            onClick={SwapPage}
            color='inherit'
            disabled={!completed}>
            Missions en cours
            </Button>
          <Button
            onClick={Logout}
            style={{marginLeft: 'auto'}}
            color='inherit'>
            Déconnection
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}


