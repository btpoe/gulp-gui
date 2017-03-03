require('./setup');

const React = require('react');
const { render } = require('react-dom');
const App = require('./components/App');
const { Provider } = require('react-redux');
const configureStore = require('./store/configureStore');
const processStore = require('./store/processStore');

const store = window.store = configureStore();

store.subscribe(processStore);

render(
    React.createElement(Provider, { store },
        React.createElement(App)
    ),
    document.getElementById('AppRoot')
);
