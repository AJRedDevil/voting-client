import React from 'react';
import ReactDOM  from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
} from 'react-dom/test-utils';
import { List, Map } from 'immutable';
import Results from './Results';
import { expect } from 'chai';

describe('Results', () => {

    test('renders entries with vote counts or zero', () => {
        const pair = List.of('Titanic', 'Shutter Island');
        const tally = Map({'Titanic': 5});
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally} />
        );
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [titanic, island] = entries.map(e => e.textContent);

        expect(entries.length).to.equal(2);
        expect(titanic).to.contain('Titanic');
        expect(titanic).to.contain('5');
        expect(island).to.contain('Shutter Island');
        expect(island).to.contain('0');
    });

    test('invokes the next callback when next button is clicked', () => {
        let nextInvoked = false;
        const next = () => nextInvoked = true;

        const pair = List.of('Titanic', 'Shutter Island');
        const component = renderIntoDocument(
            <Results pair={pair}
                     tally={Map()}
                     next={next} />
        );
        Simulate.click(ReactDOM.findDOMNode(component.refs.next));

        expect(nextInvoked).to.equal(true);
    });

    test('renders the winner when there is one', () => {
        const component = renderIntoDocument(
            <Results winner='Titanic'
                     pair={['Titanic', 'Shutter Island']}
                     tally={Map()}/>
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Titanic');
    });

});