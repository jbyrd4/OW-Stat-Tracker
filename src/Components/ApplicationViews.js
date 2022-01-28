import React from "react"
import { Route } from "react-router-dom"
import { MyFriends } from "./Friends/MyFriends"
import { MyGames } from "./Games/MyGames"
import {NewGameEntry} from "./Games/NewGameEntry"
import {FriendForm} from "./Friends/FriendForm"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/MyFriends">
                <MyFriends />
            </Route>
            <Route exact path="/MyGames">
                <MyGames />
            </Route>
            <Route exact path="/">
                <NewGameEntry />
            </Route>
            <Route exact path="/MyFriends/FriendForm">
                <FriendForm />
            </Route>
        </>
    )
}