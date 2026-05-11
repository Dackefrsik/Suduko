import {useEffect, useState } from "react"
import "../../style/style.css"

function GameBoard({selectedNumber}){

    const [board, setBoard] = useState(Array.from({length: 9}, () => Array(9).fill(null)))

    useEffect(() => {

        let next = board.map(r => [...r]) 
        const amountOfSetNumber = Math.floor(Math.random() * 10)
        console.log("Numbers " + amountOfSetNumber)
        
        for(let i = 0; i < amountOfSetNumber; i ++){

            let randomNumber;
            let row;
            let col;

            do{
                randomNumber = Math.floor(Math.random() * 9) + 1
                row = Math.floor(Math.random() * 9) 
                col = Math.floor(Math.random() * 9) 
            }
            while(hasConflict(next ,row, col, randomNumber))

            next[row][col] = randomNumber

            
        }
        setBoard(next)
    }, [])

    //Handles clicks on gameboard
    function handleClick(col, row, number){
        setBoard(prev => {
            const next = prev.map(r => [...r])
            next[row][col] = number
            return next})

        //Check row
        for(let c = 0; c < 9; c++){
            if(board[row][c] === number){
                console.log("Exists in row")
            }
        }

        //Check col
        for(let c = 0; c < 9; c++){
            if(board[c][col] === number){
                console.log("Exists in col")
            }
        }

        //Check box 
        const startRow = Math.floor(row / 3) * 3
        const startCol = Math.floor(col / 3) * 3

        for(let r = startRow; r < startRow + 3; r++){
            for(let c = startCol; c < startCol + 3; c++){
                if(board[r][c] === number){
                    console.log("Exists in box")
                }
            }
        }
    }

    //Return true if conflict in row
    function haveRowConflict(currentBoard, row, col, value) {
        if(value == null) return false

        for(let c = 0; c < 9; c++){
            if(c !== col && currentBoard[row][c] === value){
                return true
            }
        }

        return false
    }

    //Return true if conflict in col
    function haveColConflict(currentBoard, row, col, value){
        if(value == null) return false

        for(let r = 0; r < 9; r++){
            if(r !== row && currentBoard[r][col] === value){
                return true
            }
        }
        
        return false
    }

    //Return true if conflict in box
    function haveBoxConflict(currentBoard, row, col, value){
        if(value == null) return false

        const startRow = Math.floor(row / 3) * 3
        const startCol = Math.floor(col / 3) * 3

        for(let r = startRow; r < startRow + 3; r ++){
            for(let c = startCol; c < startCol + 3; c ++){
                if((r !== row || c !== col) && currentBoard[r][c] === value){
                    return true
                }
            }
        }

        return false
    }

    function hasConflict(currentBoard, row, col, value){

        if(value == null) return false

        return(
                haveRowConflict(currentBoard, row, col, value) || 
                haveColConflict(currentBoard, row, col, value) ||
                haveBoxConflict(currentBoard, row, col, value)
        )
    }

    return(
        <div className="flex items-center fkex justify-center">
            <div className="grid grid-cols-9 gap-0 w-fit">
                {Array.from({length: 81}).map((__,index) => {
                    
                    /**Räknar ut rader och kolumner för att kunan sätta border på rutorna utifrån hur riktiga Sudoku ser ut */
                    const col = index % 9 
                    const row = Math.floor(index/ 9)

                    /* const isHighlightedRow = haveRowConflict(row, col, selectedNumber)
                    const isHighlightedCol = haveColConflict(row, col, selectedNumber)
                    const isHighlightedBox = haveBoxConflict(row, col, selectedNumber)

                    const isHighlighted = isHighlightedBox || isHighlightedCol || isHighlightedRow */

                    const isHighlighted = hasConflict(board, row, col, board[row][col])

                    return(
                    <div 
                    key={index} 
                    onClick={() => handleClick(col, row, selectedNumber)}
                    className={`w-20 h-20 border cell text-4xl flex justify-center items-center  
                        ${isHighlighted? "bg-red-200" : "bg-blue-200"}
                        ${col % 3 === 0 ? "border-l-4" : ""}
                        ${row % 3 === 0 ? "border-t-4" : ""}
                        ${col === 8 ? "border-r-4" : ""}
                        ${row === 8 ? "border-b-4" : ""}`} id="upperlef1"
                    >{board[row][col]}</div>
                )})}
            </div>
        </div>
    )
}

export default GameBoard