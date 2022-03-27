import React,{useState, createContext, useEffect, useContext} from 'react'
import {useNavigate} from "react-router-dom"

export const ChatContext = createContext()

const ChatProvider = ({children}) =>{
  const [selectedChat, setSelectedChat] = useState()
  const [user, setUser] = useState()
  const [notification, setNotifications] = useState([])
  const [chats, setChats] = useState()
  const navigate = useNavigate();

  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("user"))
    setUser(userInfo)
    
    if(!userInfo){
      navigate("/")
    }
  
  }, [navigate])

  return(
    <ChatContext.Provider  value={{user, setUser}}>
       {" "}
      {children}
      
      {" "}
    </ChatContext.Provider>
  )
}

export const ChatState = ()=>{
  return useContext(ChatContext)
}

export default ChatProvider