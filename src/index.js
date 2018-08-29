import React from 'react';
import ReactDOM from 'react-dom';

import MyDocument from './App';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <div>
    <MyDocument />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
