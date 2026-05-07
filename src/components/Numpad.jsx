import { useEffect, useState } from "react"


function Numpad({setSelectedNumber}){

    const[isSelected, setSelectedNumberButton] = useState({}) 
    useEffect(() => {
        
    })

    return(
        <div className="flex justify-center mt-4">
            <div className="grid gap-1 grid-row-1 grid-cols-9 ">

                {Array.from({length: 9}).map((__, index) => {
                    return(
                    <div 
                    key={index}
                    onClick={() => {setSelectedNumber(index + 1)
                        setSelectedNumberButton({ [index] : true}) }}
                    className={`w-25 h-25 border number flex items-center justify-center text-4xl ${isSelected[index] === true ? "bg-yellow-200 border-solid  border-4" : ""}`}>{index + 1}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default Numpad