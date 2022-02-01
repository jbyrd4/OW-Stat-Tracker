import React, { useEffect, useState } from "react";

export const NewGameEntry = () => {
  const [maps, setMaps] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendArr, addFriend] = useState([]);
  const [friendNames, addFriendNames] = useState([])
  const [game, addGame] = useState({
    result: true,
    userId: parseInt(localStorage.getItem("ow_account")),
    mapId: 1,
    date: "",
  });

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
    addFriendNames(friendArr.map(friendId => {
      const foundFriend = friends.find(friend => friend.id === friendId)
      return foundFriend.name
    }))
  },[friendArr])

  const addFriendArr = (id, arr) => {
    if (arr.includes(parseInt(id))) {
    } else {
      arr.push(parseInt(id));
      addFriend(arr);
    }
  };

  return (
    <form className="newGameForm">
      <h2>New Game Entry</h2>

      <div>Friends in Game: {friendNames.join(", ")}</div>
      <fieldset>
        <div className="form-group">
          <label htmlFor="friends">Add a Friend: </label>
          <select
            onChange={(changeEvent) => {
              const copy = [...friendArr];
              addFriendArr(changeEvent.target.value, copy);
            }}
          >
            {friends.map((friend) =>
              friend.userId === parseInt(localStorage.getItem("ow_account")) ? (
                <option
                  value={friend.id}
                  name={friend.name}
                  key={friend.id}
                  label={friend.name}
                ></option>
              ) : (
                ""
              )
            )}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maps">Select a Map: </label>
          <select
            onChange={(changeEvent) => {
              const copy = { ...game };
              copy.mapId = changeEvent.target.value;
              addGame(copy);
            }}
          >
            {maps.map((map) => (
              <option value={map.id} key={map.id} label={map.name}></option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="result">Choose Game Result: </label>
          <select
            onChange={(changeEvent) => {
              const copy = { ...game };
              copy.result =
                parseInt(changeEvent.target.value) === 0 ? false : true;
              addGame(copy);
            }}
          >
            <option value={1}>Win</option>
            <option value={0}>Loss</option>
          </select>
        </div>
      </fieldset>
      <button>Submit</button>
      <button>Clear Friends</button>
    </form>
  );
};
