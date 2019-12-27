import React, {useState} from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import CreateHabit from './pages/CreateHabitPage'
import DailyTimedCreateActivity from './activity_components/DailyTimedCreateActivity'
import TotalCheckedCreateActivity from './activity_components/TotalCheckedCreateActivity'
import TotalTimedCreateActivity from './activity_components/TotalTimedCreateActivity'
import DailyCheckCreateActivity from './activity_components/DailyCheckCreateActivity'
import NavBar from './general_components/NavBar'
import CalendarContainer from './pages/Calender'
import DayTimeTable from './pages/DayTimetable';




function App() {
  const [loggedIn, setLogIn] = useState(localStorage.token? true: false);
  
  const logIn = () => {
    setLogIn(true)
  }

  const logOut = () => {
    localStorage.removeItem('token')
    setLogIn(false)
  }
  return (
    <div className="App">
      <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"/>
      <Router >
      <NavBar logOut={logOut} loggedIn={loggedIn} />
        <Switch>
          <Route path='/login'> <LoginPage logIn = {logIn} loggedIn={loggedIn} /></Route>
          <Route path='/signup'> <SignUpPage logIn = {logIn} loggedIn={loggedIn} /> </Route>
          <Route path='/home'> <HomePage loggedIn={loggedIn}  /> </Route>
          <Route path='/create_habit'> <CreateHabit loggedIn={loggedIn}  /> </Route>
          <Route path='/habits/:id/activities/:daily_id/totalchecked/:month/:day/:year/'> <TotalCheckedCreateActivity loggedIn={loggedIn}  /> </Route> 
          <Route path='/habits/:id/activities/:daily_id/totaltimed/:month/:day/:year/'> <TotalTimedCreateActivity loggedIn={loggedIn}  /></Route> 
          <Route path='/habits/:id/activities/:daily_id/dailytimed/:month/:day/:year/'> <DailyTimedCreateActivity loggedIn={loggedIn} /> </Route> 
          <Route path='/habits/:id/activities/:daily_id/dailychecked/:month/:day/:year/'><DailyCheckCreateActivity loggedIn={loggedIn}  /> </Route> {/* <CreateActivity />      */}
          <Route path='/calender/'> <CalendarContainer loggedIn={loggedIn}  /> </Route>
          <Route path='/DayTimeTable/'> <DayTimeTable loggedIn={loggedIn}  /> </Route>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
