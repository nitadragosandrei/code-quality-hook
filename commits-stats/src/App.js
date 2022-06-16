import React from 'react';
import MainPage from './components/Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Error from './components/Error';
import 'bootstrap/dist/css/bootstrap.min.css'


let App = () => (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/home" component={MainPage} exact/>
          {/*<Route path="/graph" component={MainPage} exact/>*/}
          {/*<Route path="/files" component={MainPage} exact/>*/}
          <Route component={Error}/>
        </Switch>
      </div>
    </BrowserRouter>
);

export default App;