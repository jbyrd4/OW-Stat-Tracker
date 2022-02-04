import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Friends/Friends.css"

export const NewGameEntry = () => {
  const [maps, setMaps] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendArr, addFriend] = useState([]);
  const [friendNames, addFriendNames] = useState([]);
  const [game, addGame] = useState({
    result: true,
    userId: parseInt(localStorage.getItem("ow_account")),
    mapId: 0,
    date: "",
  });

  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:8088/friends")
      .then((res) => res.json())
      .then((data) => setFriends(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8088/maps")
      .then((res) => res.json())
      .then((data) => setMaps(data));
  }, []);

  useEffect(() => {
    addFriendNames(
      friendArr.map((friendId) => {
        const foundFriend = friends.find((friend) => friend.id === friendId);
        return foundFriend.name;
      })
    );
  }, [friendArr]);

  const addFriendArr = (id, arr) => {
    if (arr.includes(parseInt(id))) {
    } else {
      arr.push(parseInt(id));
      addFriend(arr);
    }
  };

  const submitGame = () => {
    const newGame = {
      result: game.result,
      userId: parseInt(localStorage.getItem("ow_account")),
      mapId: game.mapId,
      date: new Date(),
    };

    fetch("http://localhost:8088/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGame),
    })
      .then((res) => res.json())
      .then((newGame) => {
        const friendGamePromises = friendArr.map((friend) => {
          return fetch("http://localhost:8088/friendGames", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              friendId: parseInt(friend),
              gameId: newGame.id,
            }),
          });
        });
        return Promise.all(friendGamePromises);
      })
      .then(history.push("/mygames"));
  };

  return (
      <div className="friendForm">
      <h2 className="sectionTitle">New Game Entry</h2>
    <form className="friendForm__form">

      <div className="friendList">
        <section >Friends in Game:</section>
        <section className="friendList__single">{friendNames.join(", ")}</section>
        </div>
      <fieldset>
        <div className="field">
          <label htmlFor="friends" className="label">Add a Friend: </label>
          <select className="field__single"
            value={0}
            onChange={(changeEvent) => {
              const copy = [...friendArr];
              changeEvent.target.value > 0 &&
                addFriendArr(changeEvent.target.value, copy);
            }}
          >
            <option value={0}>Select Friends</option>
            {friends.map(
              (friend) =>
                friend.userId ===
                  parseInt(localStorage.getItem("ow_account")) && (
                  <option
                    value={friend.id}
                    key={friend.id}
                    label={friend.name}
                  ></option>
                )
            )}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="field">
          <label htmlFor="maps" className="label">Select a Map: </label>
          <select className="field__single"
            value={game.mapId}
            onChange={(changeEvent) => {
              const copy = { ...game };
              copy.mapId = changeEvent.target.value;
              changeEvent.target.value > 0 && addGame(copy);
            }}
          >
            <option value={0}>Choose A Map</option>
            {maps.map((map) => (
              <option value={map.id} key={map.id} label={map.name}></option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="field">
          <label htmlFor="result" className="label">Choose Game Result: </label>
          <select className="field__single"
            value={game.result ? 1 : 0}
            onChange={(changeEvent) => {
              const copy = { ...game };
              copy.result =
                parseInt(changeEvent.target.value) === 0 ? false : true;
              changeEvent.target.value < 2 && addGame(copy);
            }}
          >
            <option value={1}>Win</option>
            <option value={0}>Loss</option>
          </select>
        </div>
      </fieldset>
    </form>
      <button className="button" onClick={submitGame}>Submit</button>
      <button className="button"
        onClick={(event) => {
          event.preventDefault();
          addGame({
            result: true,
            userId: parseInt(localStorage.getItem("ow_account")),
            mapId: 0,
            date: "",
          });
          addFriend([]);
        }}
      >
        Clear Form
      </button>
    </div>
  );
};
