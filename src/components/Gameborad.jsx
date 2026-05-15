import {useState } from "react"
import "../../style/style.css"

import confetti from "../assets/confetti.gif"

/* eslint-disable react-hooks/purity */ //Fimpar error för random

function GameBoard({selectedNumber}){

    const [board, setBoard] = useState(createBoard)
    const [clickBoard, setClickBoard] = useState(createClickBoard)

    const [showConfetti, setShowConfetti] = useState(false)

    function createBoard(){
        const board = Array.from({length: 9}, () => Array(9).fill(null))

        const amountOfSetNumber = Math.floor(Math.random() * 10) + 3 
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
            while(hasConflict(board ,row, col, randomNumber))
            
            board[row][col] = randomNumber

        }

        return board 
    }

    function createClickBoard(){
        const clickBoard = Array.from({length: 9}, () => Array(9).fill(true))

        for(let r = 0; r < 9; r++){
            for(let c = 0; c < 9; c++){
                if(board[r][c] !== null)
                    clickBoard[r][c] = false
            }
        }

        return clickBoard
        
    }

    //Handles clicks on gameboard
    function handleClick(col, row, number){

        if (board[row][col] !== null && clickBoard[row][col] === false) {
            console.log("Startnummer")
        }
        else if (number === 10){
            setBoard(prev => {
            const next = prev.map(r => [...r])
            next[row][col] = null
            return next})
        }
        else{
            setBoard(prev => {
            const next = prev.map(r => [...r])
            next[row][col] = number

            const isFull = next.every(row =>
                row.every(cell => cell !== null)
            )

            if (isFull) {
                setShowConfetti(true)

                setTimeout(() => {
                    setShowConfetti(false)
                }, 3000)
            }

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

    //Function to run confetti animation when the borad is full
    function showModal(){
        setShowConfetti(true)
        setTimeout(() => {
            setShowConfetti(false)
        }, 3000)
    }

    function checkBoardNumbers(){
        for(let r = 0; r < 9; r++){
            for(let c = 0; c < 9; c++){
                if(board[r][c] === null){
                    return false
                }
            }
        }
    
        return true;
    
    }

    return(
        <div className="flex items-center fkex justify-center">
            <div className="grid grid-cols-9 gap-0 w-fit">
                {Array.from({length: 81}).map((__,index) => {
                    
                    /**Räknar ut rader och kolumner för att kunan sätta border på rutorna utifrån hur riktiga Sudoku ser ut */
                    const col = index % 9 
                    const row = Math.floor(index/ 9)

                    const isHighlighted = hasConflict(board, row, col, board[row][col])

                    return(
                    <div 
                    key={index} 
                    onClick={() => handleClick(col, row, selectedNumber)}
                    className={`w-15 h-15 border cell text-4xl flex justify-center items-center border-black 
                        ${isHighlighted? "bg-red-200" : "bg-blue-200"}
                        ${col % 3 === 0 ? "border-l-4" : ""}
                        ${row % 3 === 0 ? "border-t-4" : ""}
                        ${col === 8 ? "border-r-4" : ""}
                        ${row === 8 ? "border-b-4" : ""}
                        ${clickBoard[row][col] === false ? "text-yellow-700" : ""}`} 
                    >{board[row][col]}</div>
                )})}
            </div>

            {showConfetti && (

                <div className="fixed insett-0 flex justify-center items-center z-50 position-events-none">
                    <img src={confetti} alt="confetti rain" className="w-96"/>
                </div>

        )}
    </div>
    )
}

export default GameBoard