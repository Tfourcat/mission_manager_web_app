import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LabelIcon from '@material-ui/icons/Label';
import { useHistory } from "react-router-dom";

export default function AddMissionHeader() {
  const history = useHistory();

  const Logout = () => {
    localStorage.removeItem('JWT')
    localStorage.removeItem('group')
    localStorage.removeItem('id')
    history.replace('/')
  }

  return (
          <AppBar position="fixed">
          <Toolbar>
            <LabelIcon/>
            <Button onClick={ () =>
              history.replace('/dashboard/' + localStorage.getItem("group"))}
              color='inherit'>
              {localStorage.getItem("group")}
            </Button>
            <Button
              onClick={Logout}
              style={{marginLeft:'auto'}}
              color='inherit'>
              Déconnection
            </Button>
          </Toolbar>
          </AppBar>
  );
}
