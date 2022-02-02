import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

export const EditFriend = () => {
  const { friendId } = useParams();
  const [friends, getFriends] = useState([]);
  const [friend, addFriend] = useState({
    name: "",
    tankRank: "Bronze",
    dpsRank: "Bronze",
    supRank: "Bronze",
    notes: "",
    userId: parseInt(localStorage.getItem("ow_account")),
  });

  const history = useHistory()

  useEffect(() => {
    return fetch(`http://localhost:8088/friends/${friendId}`)
      .then((res) => res.json())
      .then((data) => {
        addFriend(data);
      });
  }, [friendId]);

  const editFriend = (event) => {
    event.preventDefault();

    const edittedFriend = {
      name: friend.name,
      tankRank: friend.tankRank,
      dpsRank: friend.dpsRank,
      supRank: friend.supRank,
      notes: friend.notes,
      userId: friend.userId,
    };

    const fetchOption = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edittedFriend),
    };

    return fetch(`http://localhost:8088/friends/${friend.id}`, fetchOption)
           .then(() => getFriends());
  };

  const ranks = [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Master",
    "Grand Master",
  ];

  return (
    <form>
      <h2>Add A New Friend</h2>
      <fieldset>
        <div>
          <label htmlFor="name">Account Name: </label>
          <input
            value={friend.name}
            required
            autoFocus
            type="text"
            placeholder="Enter Account Name"
            onChange={(changeEvent) => {
              const copy = { ...friend };
              copy.name = changeEvent.target.value;
              addFriend(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label htmlFor="tankRank">Tank Rank: </label>
          <select
            value={friend.tankRank}
            onChange={(changeEvent) => {
              const copy = { ...friend };
              copy.tankRank = changeEvent.target.value;
              addFriend(copy);
            }}
          >
            {ranks.map((rank) => (
              <option key={`key--${rank}`} value={rank} label={rank}></option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label htmlFor="dpsRank">DPS Rank: </label>
          <select
            value={friend.dpsRank}
            onChange={(changeEvent) => {
              const copy = { ...friend };
              copy.dpsRank = changeEvent.target.value;
              addFriend(copy);
            }}
          >
            {ranks.map((rank) => (
              <option key={`key--${rank}`} value={rank} label={rank}></option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label htmlFor="supRank">Support Rank: </label>
          <select
            value={friend.supRank}
            onChange={(changeEvent) => {
              const copy = { ...friend };
              copy.supRank = changeEvent.target.value;
              addFriend(copy);
            }}
          >
            {ranks.map((rank) => (
              <option key={`key--${rank}`} value={rank} label={rank}></option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label htmlFor="notes">Notes: </label>
          <textarea
            value={friend.notes}
            onChange={(changeEvent) => {
              const copy = { ...friend };
              copy.notes = changeEvent.target.value;
              addFriend(copy);
            }}
          ></textarea>
        </div>
      </fieldset>
      <button onClick={((event) => {
          event.preventDefault()
          editFriend(event)
          history.push("/MyFriends")
        })}
      >
        Save
      </button>
    </form>
  );
};
