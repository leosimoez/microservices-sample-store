import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Main from './components/Main'

export default props => (
    <HashRouter>
      {/* <ScrollToTop> */}
        <Switch>
          <Route exact path='/' component={ Main } />
          {/* <Route exact path='/cart' component={ BasketDrawer } /> */}
          {/* <Route exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/signup' component={ Signup } />
          <Route exact path='/wizard' component={ Wizard } />
          <Route exact path='/cards' component={ Cards } /> */}
        </Switch>
      {/* </ScrollToTop> */}
    </HashRouter>
  )