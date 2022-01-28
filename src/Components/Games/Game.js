import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const Game = ({ game }) => {
  const [friendGames, setFriendGames] = useState([]);

    const history = useHistory()

  useEffect(() => {
    fetch("http://localhost:8088/friendGames?_expand=game&_expand=friend")
      .then((res) => res.json())
      .then((data) => {
        setFriendGames(data);
      });
  }, []);

  const deleteGame = (id) => {
    fetch(`http://localhost:8088/games/${id}`, {
        method: "DELETE"
    })
    .then(() => history.go("/mygames"))
    }
  

  const friendsPlayed = friendGames.filter((friend) => friend.gameId === game.id);

  return (
      <li>
        <div>Friends Played:</div>
        
        {friendsPlayed.map(friend => <div>{friend.friend.name}</div>)}
        <div>Result: {game.result ? "Win" : "Loss"}</div>
        <button onClick={() => {deleteGame(game.id)}}>Delete</button>
    </li>
  );
};