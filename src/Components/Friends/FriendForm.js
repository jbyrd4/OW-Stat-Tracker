import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const FriendForm = () => {
  const [friend, addFriend] = useState({
    name: "",
    tankRank: "Bronze",
    dpsRank: "Bronze",
    supRank: "Bronze",
    notes: "",
    userId: parseInt(localStorage.getItem("ow_account")),
  });

  const history = useHistory();

  const createFriend = (event) => {
    event.preventDefault();

    const newFriend = {
      name: friend.name,
      tankRank: friend.tankRank,
      dpsRank: friend.dpsRank,
      supRank: friend.supRank,
      notes: friend.notes,
      userId: friend.userId
    };

    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFriend)
    };
    
    return fetch("http://localhost:8088/friends", fetchOption)
    .then(() => history.go('/myfriends'))
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
            onChange={(changeEvent) => {
              const copy = { ...friend };
              copy.tankRank = changeEvent.target.value;
              addFriend(copy);
            }}
          >
            {ranks.map((rank) => (
              <option value={rank} label={rank}></option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label htmlFor="dpsRank">DPS Rank: </label>
          <select
            onChange={(changeEvent) => {
              const copy = { ...friend };
              copy.dpsRank = changeEvent.target.value;
              addFriend(copy);
            }}
          >
            {ranks.map((rank) => (
              <option value={rank} label={rank}></option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label htmlFor="supRank">Support Rank: </label>
          <select
            onChange={(changeEvent) => {
              const copy = { ...friend };
              copy.supRank = changeEvent.target.value;
              addFriend(copy);
            }}
          >
            {ranks.map((rank) => (
              <option value={rank} label={rank}></option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label htmlFor="notes">Notes: </label>
          <textarea
            onChange={(changeEvent) => {
              const copy = { ...friend };
              copy.notes = changeEvent.target.value;
              addFriend(copy);
            }}
          ></textarea>
        </div>
      </fieldset>
      <button onClick={createFriend}>Submit</button>
    </form>
  );
};
