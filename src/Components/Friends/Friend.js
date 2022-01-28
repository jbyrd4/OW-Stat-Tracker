import React, { useEffect, useState } from "react"



export const Friend = ({friend}) => {
    const [friendGames, setFriendGames] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8088/friendGames?_expand=game&_expand=friend")
        .then((res) => res.json())
        .then((data) => {
          setFriendGames(data);
        });
    }, []);

    const winRate = () => {
        const playedGames = friendGames.filter(game => game.friendId === friend.id)
        const wonGames = playedGames.filter(game => game.game.result === true)
        const winPercent = ((parseInt(wonGames.length) / parseInt(playedGames.length))*100).toFixed(2)
        return winPercent
    }


  return (
      <li>
        <div>Account: {friend.name}</div>
        <div>Tank: {friend.tankRank}</div>
        <div>DPS: {friend.dpsRank}</div>
        <div>Support: {friend.supRank}</div>
        <div>Notes: {friend.notes}</div>
        <div>Winrate: {winRate()}%</div>
      </li>
  )
}