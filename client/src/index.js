import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view.jsx';
import moviesApp from './reducers/reducers';

import './index.scss';

const store = createStore(moviesApp);

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

const container = document.getElementById('root');
ReactDOM.render(React.createElement(MyFlixApplication), container);