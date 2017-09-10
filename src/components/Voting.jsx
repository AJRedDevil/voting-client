import React, { Component } from 'react'
import '../styles.css';

export default class Voting extends Component {
    getPair = () => {
        return this.props.pair || [];
    }
    
    render() {
        return (
            <div className="voting">
                {this.getPair().map(entry => 
                    <button key={entry}
                            onClick={() => this.props.vote(entry)}>
                        <h1>{entry}</h1>
                    </button>
                )}
            </div>
        );
    }
}


