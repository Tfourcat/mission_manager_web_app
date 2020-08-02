import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import SignIn from "./SignIn.js"
import RegisterEmployee from "./RegisterEmployee.js"
import Header from "./Header"

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Route exact path='/'>
        <SignIn />
      </Route>
      <Route exact path='/registerEmployee'>
        <Header />
        <RegisterEmployee />
      </Route>
    </Router>
  );
}
