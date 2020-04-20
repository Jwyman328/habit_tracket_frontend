import React, {useState} from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './unUsedPages/HomePage'
import CreateHabit from './pages/CreateHabitPage'
import DailyTimedCreateActivity from './pages/Habit_activity_data_pages/DailyTimedCreateActivity'
import TotalCheckedCreateActivity from './pages/Habit_activity_data_pages/TotalCheckedCreateActivity'
import TotalTimedCreateActivity from './pages/Habit_activity_data_pages/TotalTimedCreateActivity'
import DailyCheckCreateActivity from './pages/Habit_activity_data_pages/DailyCheckCreateActivity'
import NavBar from './components/general_components/NavBar'
import CalendarContainer from './pages/Calender'
import DayTimeTable from './pages/DayTimetable';
import GlobalContext from './context/globalContext';

// global context


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
    <GlobalContext.Provider value={{loggedIn:loggedIn, logIn:logIn, logOut:logOut }}>
    <div className="App" style={{height:'100%'}}>
      <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"/>
      <Router >
      <NavBar logOut={logOut} loggedIn={loggedIn} />
        <Switch>
          <Route path='/login'> <LoginPage logIn = {logIn} loggedIn={loggedIn} /></Route>
          <Route path='/signup'> <SignUpPage logIn = {logIn} loggedIn={loggedIn} /> </Route>
          {/*<Route path='/home'> <HomePage loggedIn={loggedIn}  /> </Route> */}
          <Route path='/create_habit'> <CreateHabit loggedIn={loggedIn}  /> </Route>
          <Route path='/habits/:id/activities/:daily_id/totalchecked/:month/:day/:year/'> <TotalCheckedCreateActivity loggedIn={loggedIn}  /> </Route> 
          <Route path='/habits/:id/activities/:daily_id/totaltimed/:month/:day/:year/'> <TotalTimedCreateActivity loggedIn={loggedIn}  /></Route> 
          <Route path='/habits/:id/activities/:daily_id/dailytimed/:month/:day/:year/'> <DailyTimedCreateActivity loggedIn={loggedIn} /> </Route> 
          <Route path='/habits/:id/activities/:daily_id/dailychecked/:month/:day/:year/'><DailyCheckCreateActivity loggedIn={loggedIn}  /> </Route> 
          <Route path='/calender/'> <CalendarContainer loggedIn={loggedIn}  /> </Route>
          <Route path='/DayTimeTable/'> <DayTimeTable loggedIn={loggedIn}  /> </Route>
        </Switch>
      </Router>
     
    </div>
    </GlobalContext.Provider>
  );
}

export default App;
