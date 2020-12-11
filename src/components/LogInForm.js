import React, {useState} from "react"
import {ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input} from "reactstrap"
import axios from 'axios'
import {toast} from "react-toastify"
import { useHistory } from 'react-router-dom'



const LoginForm = ({toggleIsLogin, toggle, toggleLoggedIn, loggedIn}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const history  = useHistory()



const handleSubmit = () => {
    axios({
        method: 'POST',
        url: 'https://insta.nextacademy.com/api/v1/login',
        data: {
          username: username,
          password: password
        }
      })
      .then(response => {
        console.log(response)

        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

        localStorage.setItem('jwt', response.data.auth_token)
        toggleLoggedIn()
        toggle()
        history.push("/profile")

      })
      .catch(error => {
        console.log(error)
        toast.error("Failed to log in, try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
       })
}

const handleUsernameInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    setUsername(e.target.value)
  };
  

  return <>
    <Form>
      <ModalHeader toggle={toggle}>Log In</ModalHeader>
      <ModalBody>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="username" name="username" id="username" placeholder="username" value={username}  onChange={handleUsernameInput}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          </FormGroup>
          <p>New member? <a  onClick ={(e) =>{
            e.preventDefault()
            toggleIsLogin()
          }}>Sign up here</a></p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit} toggleLoggedIn={toggleLoggedIn} loggedIn={loggedIn} >Log In</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Form>
  </>
  
}


export default LoginForm