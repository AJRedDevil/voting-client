import React from 'react';
import ReactDOM from 'react-dom';
import {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
} from 'react-dom/test-utils';
import { List } from 'immutable';
import { expect } from 'chai';
import Voting from './Voting';


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

    test('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={['Titanic', 'Shutter Island']}
                    hasVoted='Titanic'/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    test('adds label to the voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={['Titanic', 'Shutter Island']}
                    hasVoted='Titanic'/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[0].textContent).to.contain('Voted');
    });

    test('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting winner='Titanic' />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Titanic');
    });

    test.skip('renders as a pure component', () => {
        const pair = ['Titanic', 'Shutter Island'];
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Titanic');

        pair[0] = 'Shutter Island';
        component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Titanic');
    });

    test('does update DOM when prop changes', () => {
        const pair = List.of('Titanic', 'Shutter Island');
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Titanic');

        const newPair = pair.set(0, 'Shutter Island');
        component = ReactDOM.render(
            <Voting pair={newPair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Shutter Island');
    });

});