import {useState } from "react"
import "../../style/style.css"

function GameBoard({selectedNumer}){

    const [number, setNumber] = useState({})

    return(
        <div className="flex items-center fkex justify-center">
            <div className="grid grid-cols-9 gap-0 w-fit">
                {Array.from({length: 81}).map((__,index) => {
                    
                    /**Räknar ut rader och kolumner för att kunan sätta border på rutorna utifrån hur riktiga Sudoku ser ut */
                    const col = index % 9 
                    const row = Math.floor(index/ 9)

                    return(
                    <div 
                    key={index} 
                    onClick={() => setNumber(prev => ({...prev, [index] : selectedNumer}))}
                    className={`w-20 h-20 bg-blue-200 border cell text-4xl flex justify-center items-center ${col % 3 === 0 ? "border-l-4" : ""}
                        ${row % 3 === 0 ? "border-t-4" : ""}
                        ${col === 8 ? "border-r-4" : ""}
                        ${row === 8 ? "border-b-4" : ""}`} id="upperlef1"
                    >{number[index]}</div>
                )})}
            </div>
        </div>
    )
}

export default GameBoard