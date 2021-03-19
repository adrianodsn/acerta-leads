import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LeadsProvider } from './contexts/leads';
import Theme from './theme';import GlobalStyle from './theme/GlobalStyle';
import AddEdit from './pages/AddEdit';
import List from './pages/List';
import Header from './components/header';
import Container from './components/container'

function App() {
  return (
    <Router>
      <Theme>
        <GlobalStyle />
        <LeadsProvider>
          <Container>
            <Header/>
            <Switch>
              <Route path="/" exact component={List} />
              <Route path="/add" exact component={AddEdit} />
              <Route path="/edit/:id" exact component={AddEdit} />
            </Switch>
          </Container>
        </LeadsProvider>
      </Theme>
    </Router>
  );
}

export default App;
