import React, { useEffect, useState } from "react"



export const Friend = ({friend}) => {
  return (
      <li>
        <div>Account: {friend.name}</div>
        <div>Tank: {friend.tankRank}</div>
        <div>DPS: {friend.dpsRank}</div>
        <div>Support: {friend.supRank}</div>
        <div>Notes: {friend.notes}</div>
      </li>
  )
}