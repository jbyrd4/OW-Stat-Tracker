import React, { useEffect, useState } from "react";
import { Game } from "./Game";

export const MyGames = () => {
  const [games, setGames] = useState([]);

  const getGames = () => {
    fetch(
      `http://localhost:8088/games?_expand=map&userId=${localStorage.getItem(
        "ow_account"
      )}`
    )
      .then((res) => res.json())
      .then(setGames);
  };

  useEffect(getGames, []);

  const sortedGames = games.sort((a, b) => b.date - a.date)

  return (
    <>
      <h2 className="sectionTitle">My Games</h2>
      <ul className="gameCard">
        {sortedGames
          .map((game) => (
            <Game key={`game--${game.id}`} game={game} getGames={getGames} />
          ))
          }
      </ul>
    </>
  );
};
