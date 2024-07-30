import React from 'react';
import { Provider } from 'react-redux';
import store from './utils/state';
import Layout from './components/Layout';

function App() {
  return (
    <Provider store={store}>
      <div className="h-screen w-screen">
        <Layout/>
      </div>
    </Provider>
  );
}

export default App;
