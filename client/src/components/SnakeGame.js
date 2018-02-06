
import React, { Component } from 'react'
import { genRandomMouseCoords, genBlankBoard } from '../helpers'
import ReactDOM from 'react-dom'
import axios from 'axios'

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
    playerName: null,
    openLeaderboard: null,
    gatheringScores: null,
    scores: []
}

class SnakeGame extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
        this.handleKeydown = this.handleKeydown.bind(this)
        this.resetGame = this.resetGame.bind(this)
        this.viewLeaderboard = this.viewLeaderboard.bind(this)
        this.closeLeaderboard = this.closeLeaderboard.bind(this)
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
        const { playerName, score, gameSpeed } = this.state
        window.removeEventListener('keydown', this.handleKeydown, false)
        clearInterval(this.state.gameTickInterval)
        axios.post('/api/scores/add', {
            player: playerName,
            score: score,
            speed: gameSpeed
        })
            .then(response => console.log('Successfully added score.'))
            .catch(err => console.log('There was an error adding score.', err))

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
        let { gameOver, gameSpeed } = this.state
        // game currently in progress, basically pause the game
        if (!gameOver) {
            window.removeEventListener('keydown', this.handleKeydown, false)
            clearInterval(this.state.gameTickInterval)
        }
        // get the scores and make the array the
        // new scores, set openLeaderboard to true
        axios.get('/api/scores')
            .then(response => {
                if (response.status == 200 && response.data.success) {
                    this.setState(prevState => {
                        return {
                            scores: response.data.scores,
                            openLeaderboard: true
                        }
                    })
                }
            })
            .catch(err => console.log('Error getting scores.', err))
    }

    leaderboardElem() {
        if (!this.state.openLeaderboard) {
            return <div></div>
        }
        return(
            <div className="leaderboard-container">
                <div
                    className="close-leaderboard"
                    onClick={this.closeLeaderboard}>
                        X
                </div>
                <div className="leaderboard">
                    <div className="note">Note: closing this window will immediately resume the game if game is in progress</div>
                    <h2>Leaderboard</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Speed</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.scores.sort((a, b) => {
                                return a['speed'].charCodeAt(0) - b['speed'].charCodeAt(0) || b['score'] - a['score']
                            }).map((score, i) => {
                                let date = new Date(score.createdAt)
                                let formattedDate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear().toString().slice(2)}`
                                let formattedSpeed = score.speed.slice(0, 1) + score.speed.slice(1).toLowerCase()
                                return(
                                    <tr key={i}>
                                        <td>{score.player}</td>
                                        <td>{score.score}</td>
                                        <td className={`${score.speed.toLowerCase()}`}>{formattedSpeed}</td>
                                        <td>{formattedDate}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    closeLeaderboard() {
        let { gameOver, gameSpeed } = this.state
        if (!gameOver) {
            window.addEventListener('keydown', this.handleKeydown, false)
            this.setGameInterval(gameSpeed)
        }
        this.setState(prevState => {
            return {
                openLeaderboard: false,
                scores: []
            }
        })
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

                {this.leaderboardElem()}
            </main>
        )
    }
}

export default SnakeGame
