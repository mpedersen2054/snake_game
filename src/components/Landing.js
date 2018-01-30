
import React, { Component } from 'react'

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            gameSpeeds: [
                { id: 0, text: 'Slow', selected: false, val: 'SLOW' },
                { id: 1, text: 'Medium', selected: true, val: 'MEDIUM' },
                { id: 2, text: 'Fast', selected: false, val: 'FAST' }
            ]
        }
        this.changeName = this.changeName.bind(this)
        this.changeSelector = this.changeSelector.bind(this)
    }

    changeName(e) {
        this.setState({ name: e.target.value })
    }

    changeSelector(e) {
        console.log('changing slector', e)
    }

    validateInfo(idx) {
        console.log('changing to selector :', idx)
    }

    render() {
        return(
            <div className="landing-container">
                <div className="well">
                    <h1>Snake Game!</h1>

                    <div className="player-info">
                        <input
                            onChange={this.changeName}
                            value={this.state.name}
                            type="text" />

                        <div className="selectors">
                            {this.state.gameSpeeds.map(speed => {
                                return(
                                    <div
                                        className="selector"
                                        key={speed.id}
                                        onClick={(e) => this.changeSelector(speed.id)}>
                                            {speed.text}
                                    </div>
                                )
                            })}
                        </div>

                        <button onClick={this.validateInfo}>Start</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing
