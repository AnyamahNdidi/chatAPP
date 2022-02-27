const users = []

const addUser = ({socket_id, name, user_id ,room_id}) =>{
   
  const exist = users.find(user => user._id === room_id && user.id === room_id  )
  if(exist){
    return {error : "user already exist in this room"}
  }
  const user = {socket_id, name, user_id, room_id};
  users.push(user)
  console.log("users list", users)
  return {user}
}

module.exports ={addUser}