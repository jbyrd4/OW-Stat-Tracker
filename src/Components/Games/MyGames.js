import React, { useEffect, useState } from "react"
import { Game } from "./Game"



export const MyGames = () => {
    const [games, setGames] = useState([])

const getGames = () => {
    fetch("http://localhost:8088/games")
            .then(res => res.json())
            .then((data) => {
                setGames(data)
            })
}

    useEffect(() => {getGames()}, [])

    return (
        <>
        <h2>My Games</h2>
            <ul>
            {
                games.map(game => 
                    game.userId === parseInt(localStorage.getItem('ow_account')) 
                    ?
                        <Game key={`game--${game.id}`} game={game} getGames={getGames}/>
                    :
                    ""
                )
            }
            </ul>
        </>
    )}