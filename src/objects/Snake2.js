
export default class Snake {
    constructor(args) {
        this.head = { x: 5, y: 0 }
        this.tail = { x: 0, y: 0 }
        this.length = 4

        this.direction = 'RIGHT'
        this.inflections = []
    }

    init(board) {
        // generate initial snake
        let head = this.head.x
        while (head != -1) {
            board[0][head] = 1
            head--
        }
        return board
    }

    getInflections() {
        return this.inflections
    }
    inflectionsPresent() {
        return !!this.inflections.length > 0
    }
    getOldestInflection() {
        return this.inflections[0]
    }
    addInflection(inf) {
        this.inflections = [...this.inflections, inf]
    }
    removeOldestInflection() {
        this.inflections = this.inflections.slice(1)
    }

    move(board, dir) {
        let len = this.length
        let oldestInflection
        oldestInflection = this.getOldestInflection()
        if (dir == 'RIGHT') {
            // check for collision

            // add inflection if it doesnt exist
            // if the last inf's 'x' is what head currently is, dont add another
            // (only applicable with non-setInterval...)
            if (!oldestInflection || (oldestInflection.x != this.head.x || oldestInflection.y != this.head.y)) {
                if (this.direction != 'RIGHT') {
                    this.addInflection({
                        id: `${this.head.x}${this.head.y}`,
                        prevDir: this.direction,
                        x: this.head.x,
                        y: this.head.y
                    })
                }
            }

            oldestInflection = this.getOldestInflection()

            // move the head 1 right, all other spaces will still be snake
            this.direction = 'RIGHT'
            this.head.x += 1
            board[this.head.y][this.head.x] = 1
            board[this.tail.y][this.tail.x] = 0

            if (this.inflectionsPresent()) {
                // make the tail move towards the last inflection point
                // instead of the direction its going
                if (oldestInflection.prevDir == 'RIGHT') {
                    this.tail.x += 1
                } else if (oldestInflection.prevDir == 'DOWN') {
                    this.tail.y += 1
                } else if (oldestInflection.prevDir == 'LEFT') {
                    this.tail.x -= 1
                } else if (oldestInflection.prevDir == 'UP') {
                    this.tail.y -= 1
                }
            } else {
                // move the tail down
                this.tail.x += 1
            }

            // remove the last inflection once the tail reaches it
            if (oldestInflection && this.tail.x == oldestInflection.x && this.tail.y == oldestInflection.y) {
                console.log('TAIL REACHED THE LAST INFLECTION')
                this.removeOldestInflection()
            }
        }


        if (dir == 'DOWN') {
            // check for collision

            // add inflection if it doesnt exist
            // if the last inf's 'x' is what head currently is, dont add another
            // (only applicable with non-setInterval...)
            if (!oldestInflection || (oldestInflection.x != this.head.x || oldestInflection.y != this.head.y)) {
                if (this.direction != 'DOWN') {
                    this.addInflection({
                        id: `${this.head.x}${this.head.y}`,
                        prevDir: this.direction,
                        x: this.head.x,
                        y: this.head.y
                    })
                }
            }
            // reassign, in case where there was no inflection when this move'DOWN' called
            oldestInflection = this.getOldestInflection()

            // update the direction, make the new head a snake, make the tail empty
            this.direction = 'DOWN'
            this.head.y += 1
            board[this.head.y][this.head.x] = 1
            board[this.tail.y][this.tail.x] = 0

            if (this.inflectionsPresent()) {
                // make the tail move towards the last inflection point
                // instead of the direction its going
                if (oldestInflection.prevDir == 'RIGHT') {
                    this.tail.x += 1
                } else if (oldestInflection.prevDir == 'DOWN') {
                    this.tail.y += 1
                } else if (oldestInflection.prevDir == 'LEFT') {
                    this.tail.x -= 1
                } else if (oldestInflection.prevDir == 'UP') {
                    this.tail.y -= 1
                }
            } else {
                // move the tail down
                this.tail.y += 1
            }

            // remove the last inflection once the tail reaches it
            if (oldestInflection && this.tail.x == oldestInflection.x && this.tail.y == oldestInflection.y) {
                console.log('TAIL REACHED THE LAST INFLECTION')
                this.removeOldestInflection()
            }
        }


        if (dir == 'LEFT') {
            if (!oldestInflection || (oldestInflection.x != this.head.x || oldestInflection.y != this.head.y)) {
                if (this.direction != 'LEFT') {
                    this.addInflection({
                        id: `${this.head.x}${this.head.y}`,
                        prevDir: this.direction,
                        x: this.head.x,
                        y: this.head.y
                    })
                }
            }
            // reassign, in case where there was no inflection when this move'DOWN' called
            oldestInflection = this.getOldestInflection()

            // update the direction, make the new head a snake, make the tail empty
            this.direction = 'LEFT'
            this.head.x -= 1
            board[this.head.y][this.head.x] = 1
            board[this.tail.y][this.tail.x] = 0

            if (this.inflectionsPresent()) {
                // make the tail move towards the last inflection point
                // instead of the direction its going
                if (oldestInflection.prevDir == 'RIGHT') {
                    this.tail.x += 1
                } else if (oldestInflection.prevDir == 'DOWN') {
                    this.tail.y += 1
                } else if (oldestInflection.prevDir == 'LEFT') {
                    this.tail.x -= 1
                } else if (oldestInflection.prevDir == 'UP') {
                    this.tail.y -= 1
                }
            } else {
                // move the tail left
                this.tail.x -= 1
            }

            // remove the last inflection once the tail reaches it
            if (oldestInflection && this.tail.x == oldestInflection.x && this.tail.y == oldestInflection.y) {
                console.log('TAIL REACHED THE LAST INFLECTION')
                this.removeOldestInflection()
            }
        }


        if (dir == 'UP') {
            // asdasdadad
            if (!oldestInflection || (oldestInflection.x != this.head.x || oldestInflection.y != this.head.y)) {
                if (this.direction != 'UP') {
                    this.addInflection({
                        id: `${this.head.x}${this.head.y}`,
                        prevDir: this.direction,
                        x: this.head.x,
                        y: this.head.y
                    })
                }
            }
            // reassign, in case where there was no inflection when this move'DOWN' called
            oldestInflection = this.getOldestInflection()

            // update the direction, make the new head a snake, make the tail empty
            this.direction = 'UP'
            this.head.y -= 1
            board[this.head.y][this.head.x] = 1
            board[this.tail.y][this.tail.x] = 0

            if (this.inflectionsPresent()) {
                // make the tail move towards the last inflection point
                // instead of the direction its going
                if (oldestInflection.prevDir == 'RIGHT') {
                    this.tail.x += 1
                } else if (oldestInflection.prevDir == 'DOWN') {
                    this.tail.y += 1
                } else if (oldestInflection.prevDir == 'LEFT') {
                    this.tail.x -= 1
                } else if (oldestInflection.prevDir == 'UP') {
                    this.tail.y -= 1
                }
            } else {
                // move the tail left
                this.tail.y -= 1
            }

            // remove the last inflection once the tail reaches it
            if (oldestInflection && this.tail.x == oldestInflection.x && this.tail.y == oldestInflection.y) {
                console.log('TAIL REACHED THE LAST INFLECTION')
                this.removeOldestInflection()
            }
        }

        // console.log(this.getInflections())

        return { success: true, board: board, snake: this }
    }
}
