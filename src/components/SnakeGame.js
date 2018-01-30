
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

const GAME_SPEEDS = {
    SLOW: 400,
    MEDIUM: 200,
    FAST: 100
}

const initialState = {
    board: null,
    snake: null,
    mouse: null,
    gameOver: null,
    message: null,
    score: null,
    gameTickInterval: null,
    currentSnakeDir: null,
    gameSpeed: null,
    playerName: null
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
        this.setGameInterval(this.props.gameSpeed)
    }

    setGameInterval(speed = 'MEDIUM') {
        let gameTickInterval = setInterval(() => {
            this.gameTick(this.state.currentSnakeDir)
        }, GAME_SPEEDS[speed])
        this.setState(prevState => {
            return {
                gameTickInterval: gameTickInterval,
                gameSpeed: speed
            }
        })

    }

    setMap(gameSpeed) {
        let snake = new Snake()
        let mouse = new Mouse()
        let playerName = this.props.playerName
        let board = genBlankBoard()
        let boardWSnake = snake.init(board)
        let boardWSnakeAndMouse = mouse.init(boardWSnake)

        window.addEventListener('keydown', this.handleKeydown, false)

        this.setState(prevState => {
            return {
                snake,
                mouse,
                playerName,
                board: boardWSnakeAndMouse,
                gameOver: false,
                score: 0,
                currentSnakeDir: 'RIGHT',
            }
        })
    }

    handleKeydown(e) {
        if (e.keyCode > 36 && e.keyCode < 41) {
            e.preventDefault()
            const direction = Object.keys(KEYS).find(k => KEYS[k] == e.keyCode)
            const currentSnakeDir = this.state.currentSnakeDir
            // check weather the Player is trying to either move in the
            // dir Snake is currently going in, or opposite or dir snake is going in
            const possibleMove = currentSnakeDir != direction &&
                !(currentSnakeDir == 'RIGHT' && direction == 'LEFT') &&
                !(currentSnakeDir == 'DOWN' && direction == 'UP') &&
                !(currentSnakeDir == 'LEFT' && direction == 'RIGHT') &&
                !(currentSnakeDir == 'UP' && direction == 'DOWN')

            if (possibleMove) {
                    this.setState(prevState => {
                        return {
                            currentSnakeDir: direction
                        }
                    })
            }
        }
    }

    gameTick() {
        let mouse, board
        // handle moving the snake, checks collision and returns an object
        // with a result, either success or fail & updates state accordingly
        const movementResults = this.state.snake.move(this.state.board, this.state.currentSnakeDir)
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

    resetGame(gameSpeed) {
        this.setState(initialState)
        this.setMap()
        this.setGameInterval(gameSpeed)
    }

    viewLeaderboard(e) {
        e.preventDefault()
        console.log('viewing leaderboard!')
        alert('viewing leaderboard!')
    }

    render() {
        return(
            <main className="game-container">
                <Meta
                    gameOver={this.state.gameOver}
                    message={this.state.message}
                    score={this.state.score}
                    gameSpeed={this.state.gameSpeed}
                    playerName={this.state.playerName}
                    resetGame={this.resetGame} />

                <Map board={this.state.board} />

                <div className="view-leaderboard-container">
                    <a onClick={this.viewLeaderboard}>View Leaderboard</a>
                </div>
            </main>
        )
    }
}

export default SnakeGame
