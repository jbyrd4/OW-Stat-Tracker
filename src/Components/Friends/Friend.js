import React, { useEffect, useState } from "react";
import { useHistory,Link } from "react-router-dom";
import { EditFriend } from "./EditFriend";

export const Friend = ({ friend, deleteFriend}) => {
  const [friendGames, setFriendGames] = useState([]);

  const history = useHistory()

  useEffect(() => {
    fetch("http://localhost:8088/friendGames?_expand=game&_expand=friend")
      .then((res) => res.json())
      .then((data) => {
        setFriendGames(data);
      });
  }, []);

  const winRate = () => {
    const playedGames = friendGames.filter(
      (game) => game.friendId === friend.id
    );
    const wonGames = playedGames.filter((game) => game.game.result === true);
    if (playedGames.length > 0) {
      const winPercent = (
        (parseInt(wonGames.length) / parseInt(playedGames.length)) *
        100
      ).toFixed(2);
      return winPercent + "%";
    } else {
      const winPercent = "No Game Data";
      return winPercent;
    }
  };

  return (
    <li>
      <div>Account: {friend.name}</div>
      <div>Tank: {friend.tankRank}</div>
      <div>DPS: {friend.dpsRank}</div>
      <div>Support: {friend.supRank}</div>
      <div>Notes: {friend.notes}</div>
      <div>Winrate: {winRate()}</div>

      <Link to={`/myfriends/EditFriend/${friend.id}`}>
      <button id={friend.id} key={friend.id}>Edit</button>
      </Link>

      <button onClick={() => {deleteFriend(friend.id)}}>
        Delete
      </button>
    </li>
  );
};