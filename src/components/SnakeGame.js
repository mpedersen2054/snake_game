
import React, { Component } from 'react'

import Meta from './Meta'
import Map from './Map'

class SnakeGame extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return(
            <main className="game-container">
                <Meta />
                <Map />
            </main>
        )
    }
}

export default SnakeGame
