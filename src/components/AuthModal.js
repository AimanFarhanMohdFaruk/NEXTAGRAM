import React, {useState} from 'react'
import {Modal} from "reactstrap"
import LoginForm from './LogInForm'
import SignUpForm from './SignUpForm'


const AuthModal = ({isOpen, toggle, toggleLoggedIn, loggedIn}) => {
  const [isLogin, setIsLogin] = useState(true)
  const toggleIsLogin = () => {
      setIsLogin(!isLogin)
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} >
        {
          isLogin
            ? <LoginForm toggle={toggle} toggleIsLogin={toggleIsLogin} toggleLoggedIn={toggleLoggedIn} loggedIn={loggedIn}/>
            : <SignUpForm toggle={toggle} toggleIsLogin={toggleIsLogin} toggleLoggedIn={toggleLoggedIn}/>
        }
    </Modal>
  )
}

export default AuthModal