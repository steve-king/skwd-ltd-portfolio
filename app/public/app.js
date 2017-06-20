import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import Page from 'modules/page';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" render={() => <Page apiUrl="/api/pages/home" />} />
      <Route path="/about" render={() => <Page apiUrl="/api/pages/about" />} />
    </div>
  </BrowserRouter>
);

export default App;
