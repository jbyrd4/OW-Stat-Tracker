import React, { useEffect, useState } from "react";

export const Game = ({ game }) => {
  const [friendGames, setFriendGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/friendGames?_expand=game&_expand=friend")
      .then((res) => res.json())
      .then((data) => {
        setFriendGames(data);
      });
  }, []);

  const friendsPlayed = friendGames.filter((friend) => friend.gameId === game.id);

  return (
      <li>
        <div>Friends Played:</div>
        
        {friendsPlayed.map(friend => <div>{friend.friend.name}</div>)}
        <div>Result: {game.result ? "Win" : "Loss"}</div>
    </li>
  );
};