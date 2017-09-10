import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-dom/test-utils';
import Voting from './Voting';
import { expect } from 'chai';


describe('Voting', () => {
    
    test('renders a pair of buttons', () => {    
        const component = renderIntoDocument(
            <Voting pair={['Titanic', 'Shutter Island']} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('Titanic');
        expect(buttons[1].textContent).to.equal('Shutter Island');
    });

    test('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(
            <Voting pair={['Titanic', 'Shutter Island']}
                    vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal('Titanic');
    });
});