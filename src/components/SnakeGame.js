
import React, { Component } from 'react'
import { genRandomMouseCoords, genBlankBoard } from '../helpers'
import ReactDOM from 'react-dom'

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

const initialState = {
    board: null,
    snake: null,
    mouse: null,
    gameOver: null,
    message: null,
    score: null
}

class SnakeGame extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.handleKeydown = this.handleKeydown.bind(this)
        this.resetGame = this.resetGame.bind(this)
    }

    componentWillMount() {
        // this.addEHandlers()
        this.setMap()
    }

    // addEHandlers() {
    //     window.addEventListener('keydown', this.handleKeydown, false)
    // }

    setMap() {
        let snake = new Snake()
        let mouse = new Mouse()
        let board = genBlankBoard()
        let boardWSnake = snake.init(board)
        let boardWSnakeAndMouse = mouse.init(boardWSnake)

        window.addEventListener('keydown', this.handleKeydown, false)

        this.setState(prevState => {
            return {
                snake,
                mouse,
                board: boardWSnakeAndMouse,
                gameOver: false,
                score: 0
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
                        mouse: (movementResults.action == 'NEW_MOUSE') ? mouse : prevState.mouse,
                        score: (movementResults.action == 'NEW_MOUSE') ? prevState.score + 10 : prevState.score

                    }
                })
            }
        }
    }

    handleGameOver(moveRetObj) {
        window.removeEventListener('keydown', this.handleKeydown, false)

        // submit the score to the server here

        return this.setState(prevState => {
            return {
                gameOver: true,
                message: moveRetObj.message
            }
        })
    }

    resetGame(e) {
        e.preventDefault()
        this.setState(initialState)
        this.setMap()
    }

    render() {
        // console.log(this.state.snake.direction)
        // console.log(this.state.snake.inflections)
        // console.log(this.state.snake.head)
        console.log(this.state.snake.tail)
        // console.log('===================================')
        // console.log('===================================')
        return(
            <main className="game-container">
                <Meta
                    gameOver={this.state.gameOver}
                    message={this.state.message}
                    score={this.state.score}
                    resetGame={this.resetGame} />

                <Map board={this.state.board} />
            </main>
        )
    }
}

export default SnakeGame
