import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Details from './Details';
import Home from './Home';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;