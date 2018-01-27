
import React from 'react'

const Meta = ({gameOver}) => {
    const isGameOver = () => gameOver ? <div className="game-over">Game Over</div> : <div></div>
    return(
        <div className="meta">
            <div className="left">
                left
                {isGameOver()}
            </div>
            <div className="right">
                right
            </div>
        </div>
    )
}

export default Meta
