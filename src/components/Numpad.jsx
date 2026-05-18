import { useEffect, useState } from "react"

import bin from "../assets/bin.png"

function Numpad({setSelectedNumber}){

    const[isSelected, setSelectedNumberButton] = useState({}) 
    useEffect(() => {
        
    })

    return(
        <div className="flex justify-center mt-4">
            <div className="grid gap-1 grid-row-1 grid-cols-10 ">

                {Array.from({length: 10}).map((__, index) => {
                    return(
                    <div 
                    key={index}
                    onClick={() => {setSelectedNumber(index + 1)
                        setSelectedNumberButton({ [index] : true}) }}
                    className={`w-15 h-15 border number flex items-center justify-center text-4xl numberBtn ${isSelected[index] === true ? "bg-yellow-200 border-solid border-4" : ""}`}>
                        {index < 9 ? index + 1 : <img src={bin} alt="Bin" className="w-8 h-8"/>}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default Numpad