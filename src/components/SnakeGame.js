
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
    score: null,
    gameTickInterval: null
}

class SnakeGame extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.handleKeydown = this.handleKeydown.bind(this)
        this.resetGame = this.resetGame.bind(this)
    }

    componentWillMount() {
        this.setMap()
    }

    componentDidMount() {
        this.setGameInterval()
    }

    setGameInterval() {
        console.log('hello world!')
        console.log(this.state.snake)
        let gameTickInterval = setInterval(() => {
            this.gameTick(this.state.snake.direction)
        }, 500)
        this.setState(prevState => {
            return {
                gameTickInterval: gameTickInterval
            }
        })

    }

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
            const direction = Object.keys(KEYS).find(k => KEYS[k] == e.keyCode)
            this.state.snake.changeDirection(direction)
        }
    }

    gameTick() {
        let mouse, board

        // handle moving the snake, checks collision and returns an object
        // with a result, either success or fail & updates state accordingly
        const movementResults = this.state.snake.move(this.state.board, this.state.snake.direction)
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

    handleGameOver(moveRetObj) {
        window.removeEventListener('keydown', this.handleKeydown, false)
        clearInterval(this.state.gameTickInterval)
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
        console.log(this.state.snake.tail)
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
