
import React, { Component } from 'react'
import { genRandomMouseCoords, genBlankBoard } from '../helpers'

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

class SnakeGame extends Component {
    constructor() {
        super()
        this.state = {
            board: genBlankBoard(),
            snake: null,
            mouse: null,
            gameOver: null,
            message: null
        }
        this.handleKeydown = this.handleKeydown.bind(this)
    }

    componentWillMount() {
        window.addEventListener('keydown', this.handleKeydown, false)
    }

    componentDidMount() {
        let snake = new Snake()
        let mouse = new Mouse()
        let boardWSnake = snake.init(this.state.board)
        let boardWSnakeAndMouse = mouse.init(boardWSnake)
        this.setState(prevState => {
            return {
                snake,
                mouse,
                board: boardWSnakeAndMouse,
                gameOver: false
            }
        })
    }

    handleKeydown(e) {
        if (e.keyCode > 36 && e.keyCode < 41) {
            e.preventDefault()
            let mouse,
                board

            const direction = Object.keys(KEYS).find(k => KEYS[k] == e.keyCode)
            const movementResults = this.state.snake.move(this.state.board, direction)
            board = movementResults.board

            if (movementResults.action == 'NEW_MOUSE') {
                mouse = new Mouse()
                board = mouse.init(board)
            }

            if (movementResults.gameOver) {
                this.handleGameOver(movementResults)
            }
            if (movementResults.success) {
                return this.setState(prevState => {
                    return {
                        board: board,
                        snake: movementResults.snake,
                        mouse: (movementResults.action == 'NEW_MOUSE') ? mouse : prevState.mouse

                    }
                })
            }
        }
    }

    handleGameOver(moveRetObj) {
        window.removeEventListener('keydown', this.handleKeydown, false)
        return this.setState(prevState => {
            return {
                gameOver: true,
                message: moveRetObj.message
            }
        })
    }

    render() {
        console.log('is game over???', this.state.gameOver)
        return(
            <main className="game-container">
                <Meta
                    gameOver={this.state.gameOver}
                    message={this.state.message} />
                <Map board={this.state.board} />
            </main>
        )
    }
}

export default SnakeGame
