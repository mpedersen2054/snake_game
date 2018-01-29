
import React from 'react'

const Meta = (props) => {
    const renderLeftMeta = () => {
        if (props.gameOver) {
            return(
                <div className="game-over">
                    <div className="large">Game over</div>
                    <span className="message vert-line">{props.message}</span>
                    <span>Play again?</span>
                    <button
                        className="play-again-btn first fast"
                        onClick={(e) => props.resetGame('FAST')}>
                            Fast
                    </button>
                    <button
                        className="play-again-btn medium"
                        onClick={(e) => props.resetGame('MEDIUM')}>
                            Medium
                    </button>
                    <button
                        className="play-again-btn slow"
                        onClick={(e) => props.resetGame('SLOW')}>
                            Slow
                    </button>
                </div>
            )
        } else {
            return(
                <div className="in-progress">
                    <div className="large">In progress...</div><span className="message">Good luck</span>
                </div>
            )
        }
    }
    return(
        <div className="meta">
            <div className="left">
                {renderLeftMeta()}
            </div>
            <div className="right">
                <div className="player"><b>Player:</b> Anon</div>
                <div className="speed"><b>Speed:</b> {props.gameSpeed}</div>
                <div className="score"><b>Score:</b> {props.score}</div>
            </div>
        </div>
    )
}

export default Meta
