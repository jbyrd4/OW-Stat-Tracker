import React, { useEffect, useState } from "react";
import "./Games.css"
import "../Friends/Friends.css"

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

  const friendsInGames = (friendGamesArr) => {
    const friendNames = friendGamesArr.map((friend) => friend.friend.name)
    const friendArr = friendNames.join(" ")
    return <div className="cardInput__friend" key="friendString">{friendArr}</div>
  }

  return (
    <li className="gameCard__single">
      <section className="gameInfo">
      <div className="cardCategory__game">Friends Played: </div>
      <section className="gameFriendList">
      {friendsInGames(friendGames)}
      </section>
      </section>
      <div>
        <p className="cardCategory">Map: </p>
        <p className="cardInput">{game.map?.name}</p>
      </div>
      <div>
      <p className="cardCategory">Result: </p>
        <p className="cardInput">{game.result ? "Win" : "Loss"}</p>
      </div>
      <button className="button"
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
