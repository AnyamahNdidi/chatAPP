import React,{useState} from 'react'
import styled from "styled-components"
import img from "./img/1.jpg"
import pix from "./img/3.jpg"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useDispatch} from  "react-redux"
import {getUserInfo} from "../globalState/reduxState"

function Login() {
  const [userError, setUserError] = useState("")
  const dispatch = useDispatch()

  const myNavigation = useNavigate()

   const userModel = yup.object().shape({
    email:yup.string().email().required("please put in your email"),
    password:yup.string().required("password needed").min(6),
   
  })

  const {register, handleSubmit, formState:{errors}} = useForm({
    resolver : yupResolver(userModel)
  })

   const submit = handleSubmit(async(data)=>{
    console.log(data)
    const  {email, password } = data
    
    
    await axios.post("http://localhost:2024/login", data).then((data)=>{
      console.log(data)
      localStorage.setItem("user", JSON.stringify(data.data))
      dispatch(getUserInfo(data.data))
      myNavigation("/chat")

    }).catch((error)=>{
      if(error.response.status === 400){
        console.log(error.response.data)
        setUserError(JSON.stringify(error.response.data.message))
      }

    })

  })
  return (
    <div>
        <Container>
      <Wrapper>
        
        <Card>
   
              <Title> cHAT_App Login</Title>
          <Form onSubmit={submit}>
            <Input
            type="text"
            placeholder='E-mail'
             {...register('email')}
            />
             <DivE>{errors.email?.message}</DivE>
            <Input
            type="text"
            placeholder='Password'
           {...register('password')}
            />
             <DivE>{errors.password?.message}</DivE>
               <DivE>{userError}</DivE>
          

             <Button type="submit" >Login</Button>
          </Form>
          <Alr>Don't Have An Account <span onClick={()=>{
            myNavigation("/")
          }} > Register</span></Alr>
      
        
          
        </Card>
      </Wrapper>
    </Container>
      
    </div>
  )
}

export default Login

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