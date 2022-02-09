import React, { useState, useEffect } from "react";
import { Game } from "../Games/Game";
import "./Snapshot.css";
import "../Games/Games.css";

export const Snapshot = () => {
  const [user, setUser] = useState({});
  const [maps, setMaps] = useState([]);
  const [games, setGames] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendGames, setFriendGames] = useState([]);

  const loggedInUser = parseInt(localStorage.getItem("ow_account"));

  useEffect(() => {
    fetch(
      `http://localhost:8088/games?_expand=map&userId=${localStorage.getItem(
        "ow_account"
      )}`
    )
      .then((res) => res.json())
      .then(setGames);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/maps`)
      .then((res) => res.json())
      .then((data) => {
        setMaps(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/users/${loggedInUser}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8088/friendGames?_expand=game&_expand=friend")
      .then((res) => res.json())
      .then(setFriendGames);
  }, []);

  useEffect(() => {
    fetch("http://localhost:8088/friends")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
      });
  }, []);

  const userFriends = friends.filter(
    (friend) => friend.userId === parseInt(localStorage.getItem(`ow_account`))
  );

  const winRate = (friend) => {
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

  const friendWinRates = userFriends.map((friend) => {
    const friendWinRate = parseFloat(winRate(friend));
    const friendName = friend.name;
    const winRateObj = {
      name: friendName,
      friendWinRate: friendWinRate,
    };

    return winRateObj;
  });

  const sortedFriendWinRates = friendWinRates.sort(
    (a, b) => b.friendWinRate - a.friendWinRate
  );
  const finalFriendWinRates = sortedFriendWinRates.slice(0, 5);

  const sortedGames = games.sort((a, b) => b.date - a.date);

  const cutGames = sortedGames.slice(0, 5);

  const mapWinRates = maps.map((map) => {
    const mapGames = games.filter((game) => game.mapId === map.id);
    const wonGames = mapGames.filter((game) => game.result === true);
    const winRate =
      wonGames.length > 0 ? ((wonGames.length / mapGames.length).toFixed(2)) * 100 : 0;
    const mapObj = {
      winRate: winRate,
      name: map.name,
    };
    return mapObj;
  });

  const sortedMaps = mapWinRates.sort((a, b) => b.winRate - a.winRate);
  const splicedMaps = sortedMaps.splice(0, 5);

  return (
    <>
      <h2 className="sectionTitle">{user.name}</h2>
      <section className="snapshot">
        <article className="snapshotColumn">
          <p className="sectionTitle">Top Friends</p>
          {finalFriendWinRates.map((friend) => {
            return (
              <div
                key={`snapshot--${friend.name}`}
                className="snapshot__single slide"
              >
                <span className="snapshotCategory">
                  Name: <p className="snapshotInput">{friend.name}</p>
                </span>
                <p></p>
                <span className="snapshotCategory">
                  Winrate:{" "}
                  <p className="snapshotInput">{friend.friendWinRate}%</p>
                </span>
              </div>
            );
          })}
        </article>
        <article className="snapshotColumn">
          <p className="sectionTitle">Most Recent Games</p>
          {cutGames.map((game) => (
            <Game key={`game--${game.id}`} game={game} getGames={setGames} />
          ))}
        </article>
      </section>
      <section>
        <p className="sectionTitle">Best Maps</p>
        <div className="snapshot__map">
          {splicedMaps.map((map) => {
            return (
              <div key={`map--${map.name}`} className="mapBorder">
                <p className="snapshotCategory">Map: </p>
                <p className="snapshotInput">{map.name}</p>
                <p></p>
                <p className="snapshotCategory">Winrate: </p>
                <p className="snapshotInput">{map.winRate}%</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
