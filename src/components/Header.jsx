import "../../style/style.css"

function Header(){

    return(
        <header className="bg-blue-500 w-full py-6 mb-8">
            <div className="flex justify-center items-center py-6">
                <h1 className="text-6xl text-white">Sudoku</h1>
            </div>
        </header>
    )
}

export default Header