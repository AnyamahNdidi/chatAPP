import React,{useState, useEffect} from 'react'
import styled from "styled-components"
import img from "./img/1.jpg"
import pix from "./img/3.jpg"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Home() {
  const [toggle, setToggle] = useState(false)
  const [dispic, setdisPic] = useState(pix)
  const [pic, setPic] = useState('')
  const [picLoading, setPicLoading] = useState(false);
  const [email11, setemail11] = useState(false);
  const myNavigation  = useNavigate()

  const hanldleToggle = ()=>{
    setToggle(!toggle)
  }

  const navigate = useNavigate();
  // const uploadImage = (pics)=>{
  //   setPicLoading(true)
  //   if(pics.type === "image/jpeg" || "image/png" || "image/gif"){
  //     const data = new FormData()
  //     data.append("file", pics);
  //     data.append("upload_preset", "chat-app");
  //     data.append("cloud_name", "ndtech");
  //     fetch("https://api.cloudinary.com/v1_1/ndtech/image/upload", {
  //       method:"post",
  //       body:data
  //     })
  //     .then((res)=> res.json())
  //     .then((data)=>{
  //       setPic(data.url.toString());
  //       setdisPic(data.url.toString())
  //       console.log(data.url.toString())
  //         setPicLoading(false)
  //     })
  //     .catch((err)=>{
  //       console.log(err)
  //     })

  //   }else{
  //     setPicLoading(false);
  //     console.log("error in uploading pic")
  //   }
  // }

   const uploadImage = (e) =>{
    const file = e.target.files[0]
    const save = URL.createObjectURL(file)
    setdisPic(save)
    setPic(file)
  }

  const userModel = yup.object().shape({
    name:yup.string().required("field must not be empty"),
    email:yup.string().email().required("please put in your email"),
    password:yup.string().required("password needed").min(6),
    confirmpassword:yup.string().oneOf([yup.ref('password'), null])
  })



  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver : yupResolver(userModel)
  })

  const submit = handleSubmit(async (value)=>{
    console.log(value)
    const  {name, email, password} = value
    const formdata = new FormData()

    formdata.append("name", name)
    formdata.append("email", email)
    formdata.append("password", password)
    formdata.append("image", pic )

    const config = {
      headers :{
        "content-type":"multipart/formdata"
      }
    }

 await axios.post("http://localhost:2024/register", formdata, config).then((data)=>{
    console.log(data.data);
    console.log(data.data.data);
    console.log(data.data.data.token);
    localStorage.setItem("userInfo", JSON.stringify(data.data))
    myNavigation("/chat")
    
 }).catch((err)=>{
      if (err.response.status === 401) console.log(err.response.data);
      console.log("i won display this", err.response.data )
      setemail11(JSON.stringify(err?.response?.data?.mesage))
    
    })
 
  })

  const submitLogin = handleSubmit(async(data)=>{
    console.log(data)
    const  {email, password } = data
    // await axios.post("http://localhost:2024/login", value)

  })
 

  
  return (
    <div>
      <Container>
      <Wrapper>
        
        <Card>
       
              <Title> cHAT_App</Title>
          <Form onSubmit={submit}>
            <Pix src={dispic}/>
            <Image
            type= "file"
            id="picture"
            accept='image/*'
            // onChange={(e) => uploadImage(e.target.files[0]) }
            onChange={uploadImage}
            />
            <Label htmlFor='picture'>upload Image</Label>
            <Input
            type="text"
            placeholder='Full Name'
            {...register('name')}
            />
            <DivE>{errors.name?.message}</DivE>
            <Input
            type="text"
            placeholder='E-mail'
            {...register('email')}
            />
            <DivE>{errors.email?.message}</DivE>
            <DivE>{email11}</DivE>
            <Input
            type="password"
            placeholder='password'

            {...register('password')}
            />
            <DivE>{errors.password?.message}</DivE>
           
            <Input
            type="password"
            placeholder='Confirm Password'
            {...register('confirmpassword')}
            />
            <DivE>{errors.confirmpassword && 'password didnt match'}</DivE>
              <Button isLoading={picLoading} >Register</Button>
          </Form>
          <Alr>Already Have An Account <span onClick={()=>{
            myNavigation("/login")
          }}> Login In</span></Alr>
            
        </Card>
      </Wrapper>
    </Container>
    </div>
  )
}

export default Home

const DivE = styled.div`
color: red;
`

const Alr = styled.div`
color: white;
margin-bottom:20px;

span{
  color: green;
  cursor: pointer;
  font-weight: 700;


}
`

const Button = styled.button`
width: 255px;
height: 40px;
display: flex;
justify-content: center;
cursor: pointer;
align-items: center;
background: rgba( 14, 14, 14, 0.9 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 10.5px );
-webkit-backdrop-filter: blur( 10.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
color: white;
margin-bottom:10px;
`

const Input = styled.input`
background-color: inherit;
height:35px;
border: 0.5px solid #F2ECEC;
outline: none;
width: 250px;
border-radius: 2px;
color: white;
margin-bottom: 16px;
padding-left: 10px;

::placeholder{
  color: white;
  opacity: 0.9;
}

`


const Label = styled.label`
width: 250px;
height: 35px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
background-color: white;
border-radius: 6px;
font-weight: 500;
margin-bottom: 20px;
`
const Image = styled.input`
display: none
`

const Title = styled.div`
color: white;
margin-bottom: 10px;
font-weight: 600;
`

const Pix = styled.img`
width: 90px;
height: 90px;
border-radius: 50%;
object-fit: cover;
margin-bottom: 10px;
`

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  height: auto;
  width: 350px;
  background: rgba( 85, 84, 84, 0.6 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );

  border: 1px solid rgba( 255, 255, 255, 0.18 );


@media screen and (max-width: 800px) {
	width: 90%;
  height: auto;
	}
`

const Container = styled.div`
width:100%;
height: 100vh;
/* background-color: red; */

background-image: url(${img});
background-repeat: no-repeat;
background-size: cover;
background-position: center;

`
const Wrapper = styled.div`

height: 99vh;
background: rgba( 51, 50, 50, 0.7 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 16px );
-webkit-backdrop-filter: blur( 16px );

border: 1px solid rgba( 255, 255, 255, 0.18 );
display: flex;
justify-content: center;
align-items: center;
@media screen and (max-width: 800px){
 height: 99.5vh;
 
}

`















































































































































// import React,{useContext, useState, useEffect} from 'react'
// import {UserContext} from "../../userContext"
// import {Link} from "react-router-dom"
// import RoomList from "./RoomList"
// import io from "socket.io-client"

// function Home() {
//   const url ="http://localhost:2024"
//   const {user, setUser} = useContext(UserContext)
//   const [room, setRoom] = useState(' ')

//   useEffect(()=>{
//     let socket = io(url)
//     return()=>{
//       // socket.emit("disconnect")
//       socket.disconnect()
//       socket.off()
      
//     }

//   }, [url])

//   const handleSubmit = (e)=>{
//     e.preventDefault()
//     let socket = io(url)
//     socket.emit('create-room', room)
//     console.log(room)
//   }

//   const rooms = [
//     {
//       name:"room1",
//       _id:"123"
//     },
//     {
//       name:"room2",
//       _id:"456"
//     }
//   ]

//   const setAsEdwin = ()=>{
//     const edwin = {
//       name:"edwin",
//       email:"edwin@gmail.com",
//       password:"edwin23",
//       id:"123"
//     }
//     setUser(edwin)
//   }
//   const setAsGiddy = ()=>{
//     const edwin = {
//       name:"giddy",
//       email:"giddy@gmail.com",
//       password:"giddy23",
//       id:"456"
//     }
//     setUser(edwin)
//   }

//   return (
//     <div>
//       <center>
//       <div className="row">
//   <div className="col s12 m6">
//     <div className="card blue-grey darken-1">
//       <div className="card-content white-text">
//         <span className="card-title">welcome {user ? user.name : ""}</span>

//      <form onSubmit={handleSubmit} >
//      <div className="row">
//     <div className="input-field col s12">
//       <input placeholer="enter a room name" id="room" type="text" className="validate"
//       value={room}
//       onChange ={(e)=>{
//         setRoom(e.target.value)
//       }}
//       />
//       <label htmlFor="room">room</label>
//     </div>
//   </div>
//   <button className="btn">create room</button>
// </form>

//       </div>
//       <div className="card-action">
//         <a href="#" onClick={setAsEdwin}>set as edwin</a>
//         <a href="#" onClick={setAsGiddy}>set as giddy</a>
//       </div>
//     </div>
//   </div>

//   <div className="col s6 m5 offset-1">
//     <RoomList rooms ={rooms}/>
//     </div>
// </div>
 



    
//        <Link to ="/chat">
//        <button>go to chat</button>
//        </Link>
//        </center>
     
//     </div>
//   )
// }

// export default Home
