import React, { useEffect, useState } from "react";

export const Game = ({ game, getGames }) => {
  const [friendGames, setFriendGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/friendGames?_expand=game&_expand=friend")
      .then((res) => res.json())
      .then((data) => {
        setFriendGames(data.filter((friend) => friend.gameId === game.id));
      });
  }, []);

  const deleteGame = (id) => {
    fetch(`http://localhost:8088/games/${id}`, {
      method: "DELETE",
    }).then(() => getGames());
  };

  return (
    <li>
      <div>
        <b>Friends Played:</b>
      </div>

      {friendGames.map((friend) => (
        <div key={friend.friend.id}>{friend.friend.name}</div>
      ))}
      <div>
        <b>Map: </b>
        {game.map?.name}
      </div>
      <div>
        <b>Result: </b>
        {game.result ? "Win" : "Loss"}
      </div>
      <button
        key={game.id}
        onClick={() => {
          deleteGame(game.id);
        }}
      >
        Delete
      </button>
    </li>
  );
};
