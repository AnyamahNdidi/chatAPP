import React from 'react'

function Chat() {
  return (
    <div>
      this is chat page
    </div>
  )
}

export default Chat


































































































































// import React,{useContext} from 'react'
// import {UserContext} from "../../userContext"
// import {Link, useParams} from "react-router-dom"

// function Chat() {
//   const {user, setUser} = useContext(UserContext)
//   let {room_id, room_name} = useParams()

//   return (
//     <div>
//       {/* <div>{room_id} {room_name}</div> */}
//       <div>chat {JSON.stringify(user)}</div>
//       <Link to="/">
//       <button>go to home</button>
//       </Link>
     
//     </div>
//   )
// }

// export default Chat
