import React, { useEffect, useState } from "react"
import { Game } from "./Game"



export const MyGames = () => {
    const [friendGames, setFriendGames] = useState([])
    const [games, setGames] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/friendGames?_expand=game&_expand=friend")
            .then(res => res.json())
            .then((data) => {
                setFriendGames(data)
            })
        },
        []
    )

    useEffect(
        () => {
            fetch("http://localhost:8088/games")
            .then(res => res.json())
            .then((data) => {
                setGames(data)
            })
        },
        []
    )

    return (
        <>
        <h2>My Games</h2>
            <ul>
            {
                games.map(game => 
                    game.userId === parseInt(localStorage.getItem('ow_account')) 
                    ?
                        <Game key={`game--${game.id}`} game={game}/>
                    :
                    ""
                )
            }
            </ul>
        </>
    )}