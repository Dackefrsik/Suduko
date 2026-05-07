import {useState } from "react"
import "../../style/style.css"

function GameBoard({selectedNumber}){

    const [board, setBoard] = useState(Array.from({length: 9}, () => Array(9).fill(null)))
    
    function handleClick(col, row){
        setBoard(prev => {
            const next = prev.map(r => [...r])
            next[row][col] = selectedNumber
            return next})

        //Check row
        for(let c = 0; c < 9; c++){
            if(board[row][c] === selectedNumber){
                console.log("Exists in row")
            }
        }

        //Check col
        for(let c = 0; c < 9; c++){
            if(board[c][col] === selectedNumber){
                console.log("Exists in col")
            }
        }

        //Check box 
        const startRow = Math.floor(row / 3) * 3
        const startCol = Math.floor(col / 3) * 3

        for(let r = startRow; r < startRow + 3; r++){
            for(let c = startCol; c < startCol + 3; c++){
                if(board[r][c] === selectedNumber){
                    console.log("Exists in box")

                }
            }
        }
    }

    //Return true if conflict in row
    function haveRowConflict(row, col) {
        const value = board[row][col]

        if(value == null) return false

        for(let c = 0; c < 9; c++){
            if(c !== col && board[row][c] === value){
                return true
            }
        }

        return false
    }

    //Return true if conflict in col
    function haveColConflict(row, col){
        const value = board[row][col]

        if(value == null) return false

        for(let r = 0; r < 9; r++){
            if(r !== row && board[r][col] === value){
                return true
            }
        }
        
        return false
    }

    //Return true if conflict in box
    function haveBoxConflict(row, col){
        const value = board[row][col]

        if(value == null) return false

        const startRow = Math.floor(row / 3) * 3
        const startCol = Math.floor(col / 3) * 3

        for(let r = startRow; r < startRow + 3; r ++){
            for(let c = startCol; c < startCol + 3; c ++){
                if((r !== row || c !== col) && board[r][c] === value){
                    return true
                }
            }
        }

        return false
    }

    return(
        <div className="flex items-center fkex justify-center">
            <div className="grid grid-cols-9 gap-0 w-fit">
                {Array.from({length: 81}).map((__,index) => {
                    
                    /**Räknar ut rader och kolumner för att kunan sätta border på rutorna utifrån hur riktiga Sudoku ser ut */
                    const col = index % 9 
                    const row = Math.floor(index/ 9)

                    const isHighlightedRow = haveRowConflict(row, col)
                    const isHighlightedCol = haveColConflict(row, col)
                    const isHighlightedBox = haveBoxConflict(row, col)

                    return(
                    <div 
                    key={index} 
                    onClick={() => handleClick(col, row)}
                    className={`w-20 h-20 border cell text-4xl flex justify-center items-center  
                        ${isHighlightedRow? "bg-red-200" : "bg-blue-200"}
                        ${isHighlightedCol? "bg-red-200" : "bg-blue-200"}
                        ${isHighlightedBox? "bg-red-200" : "bg-blue-200"}
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