import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import EntrantList from './EntrantList';
import EntrantEdit from './EntrantEdit';
import EntrantDrilldown from './EntrantDrilldown';

class App extends Component{
  render(){
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={EntrantList}/>
          <Route path='/entrants' exact={true} component={EntrantList}/>
          <Route path='/entrants/:id' exact={true} component={EntrantEdit}/>
          <Route path='/entrants/drilldown/:id' component={EntrantDrilldown}/>
        </Switch>
      </Router>
    )
  }
}


export default App;
