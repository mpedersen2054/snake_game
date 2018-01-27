
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
        let collideWithSelf = false // switch to true if collide w/ self

        // dont allow snake to move the opposite direction it's going
        if (this.direction == 'RIGHT' && dir == 'LEFT' ||
            this.direction == 'DOWN' && dir == 'UP' ||
            this.direction == 'LEFT' && dir == 'RIGHT' ||
            this.direction == 'UP' && dir == 'DOWN') {
                return {
                    success: false,
                    gameOver: false,
                    message: 'Cant go that way'
                }
        }

        // check if next move is into a wall
        // only applicable to non-interval version for now...
        if (dir == 'RIGHT' && this.head.x + 1 > 23 ||
            dir == 'DOWN' && this.head.y + 1 > 15 ||
            dir == 'LEFT' && this.head.x - 1 < 0 ||
            dir == 'UP' && this.head.y - 1 < 0) {
                return {
                    success: false,
                    gameOver: true,
                    message: 'Collided with wall'
                }
        }

        // if moving in DIRECTION, and the next space in the direction is a peice
        // of the Snake -> end game =OR= If the space it's about to collide with
        // is the tail, dont end, the new head should go where old tail was
        if (dir == 'RIGHT' && board[this.head.y][this.head.x + 1] == 1) {
            // check weather the peice about to collide with is the tail
            if (!(this.head.y == this.tail.y && this.head.x + 1 == this.tail.x)) {
                // set TRUE if the peice IS NOT the tail
                collideWithSelf = true
            }
        } else if (dir == 'DOWN' && board[this.head.y + 1][this.head.x] == 1) {
            if (!(this.head.y + 1 == this.tail.y && this.head.x == this.tail.x)) {
                collideWithSelf = true
            }
        } else if (dir == 'LEFT' && board[this.head.y][this.head.x - 1] == 1) {
            if (!(this.head.y == this.tail.y && this.head.x - 1 == this.tail.x)) {
                collideWithSelf = true
            }
        } else if (dir == 'UP' && board[this.head.y - 1][this.head.x] == 1) {
            if (!(this.head.y == this.tail.y - 1 && this.head.x == this.tail.x)) {
                collideWithSelf = true
            }
        }

        if (collideWithSelf) {
            return {
                success: false,
                gameOver: true,
                message: 'Collided with yourself'
            }
        }

        // check for collision with Mouse

        // successful movement
        return this.handleMovement(board, dir)
    }

    handleMovement(board, dir) {
        let oldestInflection = this.getOldestInflection()
        let nonIntervalLogic = oldestInflection
            ? (oldestInflection.x != this.head.x || oldestInflection.y != this.head.y)
            : false

        // add inflection if it doesnt exist
        // if the last inf's 'x' is what head currently is, dont add another
        // (only applicable with non-setInterval...)
        if (!oldestInflection || nonIntervalLogic) {
            if (this.direction != dir) { // diff direction than currently going
                this.addInflection({
                    id: `${this.head.x}${this.head.y}`,
                    prevDir: this.direction,
                    x: this.head.x,
                    y: this.head.y
                })
            }
        }

        // assign in case it didnt exist before
        oldestInflection = this.getOldestInflection()

        // update the direction & head based on
        // the direction for the Snake obj
        if (dir == 'RIGHT') {
            this.direction = 'RIGHT'
            this.head.x += 1
        } else if (dir == 'DOWN') {
            this.direction = 'DOWN'
            this.head.y += 1
        } else if (dir == 'LEFT') {
            this.direction = 'LEFT'
            this.head.x -= 1
        } else if (dir == 'UP') {
            this.direction = 'UP'
            this.head.y -= 1
        }

        // update board based on new head
        // update the tail first, if the Snake is about to collide
        // with it's tail, the tail should move outa the way
        board[this.tail.y][this.tail.x] = 0
        board[this.head.y][this.head.x] = 1

        if (this.inflectionsPresent()) {
            // make the tail move towards the last inflection point
            // instead of the direction the head is currently going
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
            // move the tail accordingly if there is no inf pt's
            if (dir == 'RIGHT') {
                this.tail.x += 1
            } else if (dir == 'DOWN') {
                this.tail.y += 1
            } else if (dir == 'LEFT') {
                this.tail.x -= 1
            } else if (dir == 'UP') {
                this.tail.y -= 1
            }
        }

        // remove the last inflection once the tail reaches it
        if (oldestInflection && this.tail.x == oldestInflection.x && this.tail.y == oldestInflection.y) {
            console.log('TAIL REACHED THE LAST INFLECTION')
            this.removeOldestInflection()
        }

        // successful
        return {
            success: true,
            gameOver: false,
            snake: this,
            board
        }
    }
}
