import React, { useEffect, useState } from "react";

export const Game = ({ game, getGames }) => {
  const [friendGames, setFriendGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/friendGames?_expand=game&_expand=friend")
      .then((res) => res.json())
      .then((data) => {
        setFriendGames(data);
      });
  }, [])

  const deleteGame = (id) => {
    fetch(`http://localhost:8088/games/${id}`, {
        method: "DELETE"
    }).then(() => getGames())
    }

  const deleteFriendGames = (id) => {
    fetch(`http://localhost:8088/friendGames/${id}`, {
      method: "DELETE"
    }).then(() => getGames())
  }
  
  const rmFriendGames = (id) => {
    const friendGamesArr = friendGames.filter(friendGame => friendGame.gameId === game.id)
    return friendGamesArr.map(friendGame => deleteFriendGames(friendGame.id))
  }

  const friendsPlayed = friendGames.filter((friend) => friend.gameId === game.id);

  return (
      <li>
        <div>Friends Played:</div>
        
        {friendsPlayed.map(friend => <div>{friend.friend.name}</div>)}
        <div>Result: {game.result ? "Win" : "Loss"}</div>
        <button key={game.id} onClick={() => {deleteGame(game.id); rmFriendGames(game.id)}}>Delete</button>
    </li>
  );
};