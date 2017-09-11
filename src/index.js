import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

import './styles.css';

const pair = ['Titanic', 'Shutter Island'];

const rootEl = document.getElementById('root');

ReactDOM.render(
    <Voting
        pair={pair}
        winner='Titanic'
    />,
    rootEl);

if(module.hot) {
    module.hot.accept('./components/Voting', () => {
        ReactDOM.render(<Voting pair={pair}/>, rootEl);
    });
}
