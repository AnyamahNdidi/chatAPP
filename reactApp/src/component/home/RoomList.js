import React from 'react'
import Room from "./Room"
import {Link} from "react-router-dom"

function RoomList({rooms}) {
  return (
    <div>
      {rooms && rooms.map((room)=> (
      <Link to ={'/chat/' + room._id + "/" + room.name}>
       <Room  name={room.name}>{room.name}</Room>
      </Link>
     
      ))}
    </div>
  )
}

export default RoomList
