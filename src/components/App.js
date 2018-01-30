
import React, { Component } from 'react'

import SnakeGame from './SnakeGame'
import Landing from './Landing'

class App extends Component {
    constructor() {
        super()
        this.state = {
            startGame: false,
            playerName: null,
            gameSpeed: null
        }
        this.startGame = this.startGame.bind(this)
    }

    renderContent() {
        if (this.state.startGame) {
            return(
                <SnakeGame
                    playerName={this.state.playerName}
                    gameSpeed={this.state.gameSpeed} />
            )
        } else {
            return <Landing startGame={this.startGame} />
        }
    }

    startGame(info) {
        this.setState({
            playerInfo: info.name,
            gameSpeed: info.gameSpeed,
            startGame: true
        })
    }

    render() {
        return(
            <div className="app-container">
                {this.renderContent()}
            </div>
        )
    }
}

export default App
