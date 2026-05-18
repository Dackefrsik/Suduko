

function Endscreen({restartGame}){

    return(
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="fixed bg-green-400 flex flex-col justify-center items-center rounded-lg border border-4 ">
                <div className="p-3">
                    <h1 className="text-5xl font-bold">Congratelation!</h1>
                </div>
                <div className="w-full flex justify-center bg-white">
                    <p className="text-xl mt-6 mb-4">You manage to complete the board</p>
                </div>
                <div className="flex justify-end w-full p-3">
                    <button 
                    className="bg-blue-400 text-white p-2 rounded-lg newGame"
                    onClick={() => restartGame()}>New Game</button>
                </div>
            </div>
        </div>
    
    )
}

export default Endscreen