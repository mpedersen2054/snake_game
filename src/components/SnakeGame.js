
import React, { Component } from 'react'
import { genRandomCoords } from '../helpers'

import Meta from './Meta'
import Map from './Map'
import Snake from '../objects/Snake'
import Mouse from '../objects/Mouse'

const dems = { w: 24, h: 16 }
var initialBoard = []

for (var i = 0; i < dems.w; i++) {
    var row = []
    for (var k = 0; k < dems.h; k++) {
        row.push(0)
    }
    initialBoard.push(row)
}

genRandomCoords()

class SnakeGame extends Component {
    constructor() {
        super()
        this.state = {
            board: initialBoard,
            snake: null,
            mouse: null
        }
    }
    componentDidMount() {
        let snake = new Snake()
        let mouse = new Mouse()
        let boardWSnake = snake.generate(this.state.board)
        let newBoard = mouse.generate(boardWSnake)
        this.setState(prevState => {
            return {
                snake,
                mouse,
                board: newBoard
            }
        })
    }
    render() {
        console.log(this.state)
        return(
            <main className="game-container">
                <Meta />
                <Map board={this.state.board} />
            </main>
        )
    }
}

export default SnakeGame
