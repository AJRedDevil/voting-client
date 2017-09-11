import { List, Map, fromJS } from 'immutable';

import reducer from './reducer';

describe('reducer', () => {

    test('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('Titanic', 'Shutter Island'),
                    tally: Map({Titanic: 1})
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).toEqual(fromJS({
            vote: {
                pair: ['Titanic', 'Shutter Island'],
                tally: {Titanic: 1}
            }
        }));
    });

    test('handles SET_STATE with plain JS payload', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Titanic', 'Shutter Island'],
                    tally: {Titanic: 1}
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).toEqual(fromJS({
            vote: {
                pair: ['Titanic', 'Shutter Island'],
                tally: {Titanic: 1}
            }
        }));
    });

    test('handles SET_STATE without initial state', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Titanic', 'Shutter Island'],
                    tally: {Titanic: 1}
                }
            }
        };
        const nextState = reducer(undefined, action);

        expect(nextState).toEqual(fromJS({
            vote: {
                pair: ['Titanic', 'Shutter Island'],
                tally: {Titanic: 1}
            }
        }));
    });

});