
import React from 'react'

const Map = ({board}) => {

    const renderBoard = () => {
        return board.map(row => {
            return row.map(square => {
                // determine what occupies the given space
                let spaceOccupant
                if (square == 1) spaceOccupant = 'snake'
                else if (square == 2) spaceOccupant = 'mouse'
                // else spaceOccupant = ''
                return(
                    <div className={`square ${spaceOccupant}`}></div>
                )
            })
        })
    }

    return(
        <div className="map">
            {renderBoard()}
        </div>
    )
}

export default Map
