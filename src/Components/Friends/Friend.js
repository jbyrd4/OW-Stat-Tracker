import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Friends.css"

export const Friend = ({ friend, deleteFriend }) => {
  const [friendGames, setFriendGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/friendGames?_expand=game&_expand=friend")
      .then((res) => res.json())
      .then(setFriendGames);
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
    <li className="card__single slide">
      <div className="accountName">{friend.name}</div>
      <div><p className="cardCategory">Tank: </p><p className="cardInput">{friend.tankRank}</p></div>
      <div><p className="cardCategory">DPS: </p><p className="cardInput">{friend.dpsRank}</p></div>
      <div><p className="cardCategory">Support: </p><p className="cardInput">{friend.supRank}</p></div>
      <div><p className="cardCategory notes">Notes: </p><p className="cardInput">{friend.notes}</p></div>
      <div className="winRate"><p className="cardCategory">Winrate: </p><p className="cardInput">{winRate()}</p></div>
      <div className="friendButtons">
      <Link to={`/myfriends/EditFriend/${friend.id}`}>
        <button className="button" id={friend.id} key={friend.id}>
          Edit
        </button>
      </Link>

      <button className="button"
        onClick={() => {
          deleteFriend(friend.id);
        }}
      >
        Delete
      </button>
      </div>
    </li>
  );
};
