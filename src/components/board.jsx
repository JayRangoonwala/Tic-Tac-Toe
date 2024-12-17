import React, { useState } from "react";
import Square from "./square.jsx";

const Board = () => {

    const initialState = Array(9).fill(null)

    const [state, setstate] = useState(initialState)
    const [IsXturn,setIsXturn] = useState(true)

    const CheckWinner = () => {
        const iswin = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let logic of iswin){
            const [a,b,c] = logic;
            if(state[a] !== null && state[a] === state[b] && state[a] === state[c]){
                return state[a];
            }
        }
        return false;
    }

    const IsWinner = CheckWinner();


    const handleClick = (index) => {

        if(state[index] !== null || IsWinner){
            return;
        }
        const copyState = [...state];
        copyState[index] = IsXturn ? "X" : "O";
        setstate(copyState);
        setIsXturn(!IsXturn);
    }

    const CheckDraw = () => {
        if(IsWinner){
            return false
        }
        else{
            if(state.includes(null)){
                return false
            }
            else{
                return true
            }
        }
    }

    const isdraw = CheckDraw();

    const Game = () => {
        return(
        <>
            <div className="board-row">
            <Square onClick ={() => {handleClick(0)}} value={state[0]} />
            <Square onClick={() => {handleClick(1)}} value={state[1]} />
            <Square onClick={() => {handleClick(2)}} value={state[2]} />
        </div>
        <div className="board-row">
            <Square onClick={() => {handleClick(3)}} value={state[3]} />
            <Square onClick={() => {handleClick(4)}} value={state[4]} />
            <Square onClick={() => {handleClick(5)}} value={state[5]} />
        </div>
        <div className="board-row">
            <Square onClick={() => {handleClick(6)}} value={state[6]} />
            <Square onClick={() => {handleClick(7)}} value={state[7]} />
            <Square onClick={() => {handleClick(8)}} value={state[8]} />
        </div>
        </>
        )
    }
    
    return(
    <div className="board-container">

        {IsWinner ? (<>
            <Game />
            <div className="end">
                <h3>Player {IsWinner} Win The Game</h3>
                <button onClick={() => {setstate(initialState);setIsXturn(true)} } >Play Again</button>
            </div>
            </>
        ) : 
        (
        <>
            {isdraw ? <>
                <Game />
            <h3 style={{color:"brown",margin:20 ,display:"flex", justifyContent:"center",fontSize:25}}>Match Draw</h3>
            <button onClick={() => {setstate(initialState);setIsXturn(true)} } >Play Again</button>
            </>:<>
            <h3 style={{color:"brown",margin:20 ,display:"flex", justifyContent:"center",fontSize:25}}>Player {IsXturn ? "X" : "O"} Turn</h3>
            <Game />
        </>}
        </>)}
    </div>
    );
}

export default Board;