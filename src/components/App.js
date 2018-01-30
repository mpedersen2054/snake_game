
import React, { Component } from 'react'

import SnakeGame from './SnakeGame'
import Landing from './Landing'

class App extends Component {
    constructor() {
        super()
        this.state = {
            startGame: false
        }
    }

    renderContent() {
        if (this.state.startGame) {
            return <SnakeGame />
        } else {
            return <Landing />
        }
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
