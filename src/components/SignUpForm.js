import React, {useState} from "react"
import {ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback} from "reactstrap"
import axios from "axios"
import {toast} from "react-toastify"

const SignUpForm = ({toggleIsLogin, toggle}) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(true);



  const handleSubmit = () => {
    axios({
      method: 'POST',
      url: 'https://insta.nextacademy.com/api/v1/users/',
      data: {
        username: username,
        email: email,
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
    })
    .catch(error => {

      error.response.data.message.forEach((message) => {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })

      console.error(error.response) // so that we know what went wrong if the request failed
    })
  }

  const handleUsernameInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newUsername = e.target.value;
    setUsername(newUsername);

    const checkUsername = newUsername => {
        // this should only trigger after you stop typing for 500ms
        console.log("Making API call to check username!");
        axios
          .get(
            `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
          )
          .then(response => {
            console.log(response.data);
            toggle()
            if (response.data.valid) {
              setUsernameValid(true);
            } else {
              setUsernameValid(false);
            }
          });
      };

    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 500);

    setDelay(newDelay);
  };

  const getInputProp = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6) {
      return { invalid: true };
    }

    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };


  const getFormFeedback = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 6) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }

    if (usernameValid) {
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
    } else {
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
    }
  };

  return <>
    <Form>
      <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
      <ModalBody>
          <FormGroup>
              <Label for="username">Username</Label>
              <Input 
              type="text" 
              name="username" 
              id="username" 
              placeholder="Key in username" 
              value={username} 
              onChange={handleUsernameInput}
              {...getInputProp()}/>
              {getFormFeedback()}
          </FormGroup>
          <FormGroup>
              <Label for="email">Email</Label>
              <Input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Key in email" 
              value={email} 
              onChange={(e)=>{setEmail(e.target.value)}} />
          </FormGroup>
          <FormGroup>
              <Label for="password">Password</Label>
              <Input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Key in password" 
              value={password} 
              onChange={(e)=>{setPassword(e.target.value)}} />
          </FormGroup>
          <p>Already a member? <a href="$" onClick ={(e) =>{
            e.preventDefault()
            toggleIsLogin()
          }}>Log in here</a></p>
      </ModalBody>
      <ModalFooter>
        <Button 
          color="primary" 
          disabled={!(username && email && password)} 
          onClick={handleSubmit}>Sign Up</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Form>
  </>
}

export default SignUpForm