import React, {useState} from "react";

export const NewGameEntry = () => {
    const [maps, getMaps] = useState()
    const [friends, getFriends] = useState()
    const [game, addGame] = useState({
        result: true,
        userId: parseInt(localStorage.getItem("ow_account")),
        mapId: 1,
        date: ""
      });

    return (<h2>New Game Entry</h2>)
}