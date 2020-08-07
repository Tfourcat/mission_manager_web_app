import React from 'react';
import {useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import SignIn from "./SignIn.js"
import ExpertHeader from "./ExpertHeader.js"
import TechHeader from "./TechHeader.js"
import AddMissionHeader from "./AddMissionHeader.js"
import ExpertMissionPage from "./ExpertMissionPage.js"
import TechMissionPage from "./TechMissionPage.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import AddMission from "./AddMission.js"

function App() {
  const [displayedMissions, setDisplayedMissions] = useState("uncompleted")

  return (
    <Router>
      <CssBaseline />
      <Route exact path='/'>
        <SignIn />
      </Route>
      <Route path='/dashboard/expert'>
        <ExpertHeader displayedMissions={displayedMissions}
          setDisplayedMissions={setDisplayedMissions} />
      </Route>
      <Route exact path='/dashboard/expert'>
        <ExpertMissionPage displayedMissions={displayedMissions} />
      </Route>
      <Route exact path='/dashboard/expert/addMission'>
        <AddMissionHeader />
        <AddMission />
      </Route>
      <Route path="/dashboard/technician">
        <TechHeader />
      </Route>
      <Route exact path='/dashboard/technician'>
        <TechMissionPage />
      </Route>
    </Router>
  );
}

export default App;
