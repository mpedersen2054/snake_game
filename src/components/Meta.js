
import React from 'react'

const Meta = (props) => {
    const renderLeftMeta = () => {
        if (props.gameOver) {
            return(
                <div className="game-over">
                    <div className="large">Game over</div>
                    <span>{props.message}</span>
                    <span>
                        <button
                            className="play-again-btn"
                            onClick={props.resetGame}>
                                Play again?
                        </button>
                    </span>
                </div>
            )
        } else {
            return(
                <div className="in-progress">
                    <div className="large">In progress...</div><span>Good luck</span>
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
                <div className="score"><b>Score: </b> {props.score}</div>
            </div>
        </div>
    )
}

export default Meta
