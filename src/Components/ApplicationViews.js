import React from "react";
import { Route } from "react-router-dom";
import { MyFriends } from "./Friends/MyFriends";
import { MyGames } from "./Games/MyGames";
import { NewGameEntry } from "./Games/NewGameEntry";
import { EditFriend } from "./Friends/EditFriend";
import { Snapshot } from "./Snapshot/Snapshot";

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/">
        <Snapshot />
      </Route>
      <Route exact path="/MyFriends">
        <MyFriends />
      </Route>
      <Route exact path="/MyGames">
        <MyGames />
      </Route>
      <Route exact path="/NewGameEntry">
        <NewGameEntry />
      </Route>
      <Route exact path="/MyFriends/EditFriend/:friendId(\d+)">
        <EditFriend />
      </Route>
    </>
  );
};
