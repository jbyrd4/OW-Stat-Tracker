import React, { useEffect, useState } from "react"
import { Friend } from "./Friend"



export const MyFriends = () => {
    const [friends, setFriends] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/friends")
            .then(res => res.json())
            .then((data) => {
                setFriends(data)
            })
        },
        []
    )

    return (
        <>
        <h2>My Friends</h2>
            <ul>
            {
                friends.map(friend => 
                    friend.userId === parseInt(localStorage.getItem('ow_account')) 
                    ?
                        <Friend key={`friend--${friend.id}`} friend={friend}/>
                    :
                    ""
                )
            }
            </ul>
        </>
    )}