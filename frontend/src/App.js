import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider } from './context/UserContext'
import Home from './component/Home'

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  )
}

export default App
