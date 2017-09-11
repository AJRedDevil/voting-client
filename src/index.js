import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from './components/reducer';
import {Provider} from 'react-redux';
import App from './components/App';
import { VotingContainer } from './components/Voting';
import { ResultsContainer } from './components/Results';

import './styles.css';

const store = createStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['Titanic', 'Shutter Island'],
            tally: {Titanic: 2}
        }
    }
});

const routes = <App>
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
</App>;

const rootEl = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>{routes}</HashRouter>
    </Provider>,
    rootEl);

if(module.hot) {
    module.hot.accept('./components/App', () => {
        ReactDOM.render(<Provider store={store}>
                            <HashRouter>{routes}</HashRouter>
                        </Provider>,
                        rootEl);
    });
}
