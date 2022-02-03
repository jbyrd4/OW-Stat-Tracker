import React, { useEffect, useState } from "react";
import { Friend } from "./Friend";
import { FriendForm } from "./FriendForm";

export const MyFriends = () => {
  const [friends, setFriends] = useState([]);

  const getFriends = () => {
    fetch("http://localhost:8088/friends")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
      });
  };

  useEffect(() => {
    getFriends();
  }, []);

  const deleteFriend = (id) => {
    fetch(`http://localhost:8088/friends/${id}`, {
      method: "DELETE",
    }).then(() => {
      getFriends();
    });
  };

  return (
    <>
      <div>{<FriendForm getFriends={getFriends} />}</div>
      <h2>My Friends</h2>
      <ul>
        {friends.map((friend) =>
          friend.userId === parseInt(localStorage.getItem("ow_account")) ? (
            <Friend
              key={`friend--${friend.id}`}
              deleteFriend={deleteFriend}
              friend={friend}
            />
          ) : (
            ""
          )
        )}
      </ul>
    </>
  );
};
