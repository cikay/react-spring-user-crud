import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Table from './component/Table'
import { UserProvider } from './context/UserContext'
import { userActions } from './actions'

// import { Button } from 'bootstrap'
import AddUser from './component/AddUser'
import Home from './component/Home'
function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/users/edit/:id'>
            <AddUser actionName='Güncelle' />
          </Route>
          <Route path='/users/add'>
            <AddUser actionName='Ekle' />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  )
}

export default App
