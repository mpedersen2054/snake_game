
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

    changeSelector(idx) {
        this.setState(prevState => {
            return {
                gameSpeeds: prevState.gameSpeeds.map(speed => {
                    speed.selected = speed.id == idx ? true : false
                    return speed
                })
            }
        })
    }

    validateInfo(idx) {
        console.log('changing to selector :', idx)
    }

    render() {
        return(
            <div className="landing-container">
                <h1>Snake Game!</h1>
                <div className="player-info-container">
                    <div className="sub-head">Start a new game</div>
                    <div className="player-info">

                        <div className="form-section">
                            <div className="label">Your name</div>
                            <input
                                onChange={this.changeName}
                                value={this.state.name}
                                type="text" />
                        </div>

                        <div className="form-section">
                            <div className="label">Game speed</div>
                            <div className="selectors">
                                {this.state.gameSpeeds.map(speed => {
                                    return(
                                        <div
                                            className={`selector ${speed.selected ? 'selected' : ''} ${speed.id == 1 ? 'medium' : ''}`}
                                            key={speed.id}
                                            onClick={(e) => this.changeSelector(speed.id)}>
                                                {speed.text}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="form-section">
                            <button onClick={this.validateInfo}>Start</button>
                        </div>
                    </div>
                </div>

                <div className="scores-container">
                    <div className="sub-head">Top scores</div>
                    <div className="scores">
                        hello scores
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing
