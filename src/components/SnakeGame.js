
import React, { Component } from 'react'
import { genRandomCoords } from '../helpers'

import Meta from './Meta'
import Map from './Map'
import Snake from '../objects/Snake'
import Mouse from '../objects/Mouse'

const KEYS = {
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37
}

const dems = { w: 24, h: 16 }
var initialBoard = []

for (var i = 0; i < dems.h; i++) {
    var row = []
    for (var k = 0; k < dems.w; k++) {
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
        this.handleKeydown = this.handleKeydown.bind(this)
    }
    componentWillMount() {
        window.addEventListener('keydown', this.handleKeydown)
    }
    componentDidMount() {
        let snake = new Snake()
        let mouse = new Mouse()
        let boardWSnake = snake.init(this.state.board)
        let newBoard = mouse.init(boardWSnake)
        this.setState(prevState => {
            return {
                snake,
                mouse,
                board: newBoard
            }
        })
    }
    handleKeydown(e) {
        const keyCode = e.keyCode
        if (keyCode > 36 && keyCode < 41) {
            e.preventDefault()
            const direction = Object.keys(KEYS).find(k => KEYS[k] == keyCode)
            const moveSnake = this.state.snake.move(this.state.board, direction)
            if (moveSnake.success) {
                this.setState(prevState => {
                    return {
                        board: moveSnake.board,
                        snake: moveSnake.snake
                    }
                })
            }
            console.log('move snake!', moveSnake)
        }
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
