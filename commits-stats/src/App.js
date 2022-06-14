import React from 'react';
import MainPage from './components/Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error from './components/Error';

let App = () => (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/commits" component={MainPage} exact/>
          <Route component={Error}/>
        </Switch>
      </div>
    </BrowserRouter>
);

export default App;