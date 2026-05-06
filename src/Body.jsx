import GameBoard from "./components/Gameborad"
import Numpad from "./components/Numpad"

import "../style/style.css"
import Header from "./components/Header"
import { useState } from "react"


function Body(){

    const [selectedNumer, setSelectedNumber] = useState(null)


    return(
        <div className="min-h-screen flex flex-col items-center gap-8 mt-8">
            <Header/>
            <GameBoard selectedNumer={selectedNumer}/>
            <Numpad setSelectedNumber={setSelectedNumber}/>
        </div>
    )
}

export default Body