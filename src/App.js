import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import NavBar from "./components/Navbar"
import { Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./pages/Homepage"
import UploadPage from "./pages/UploadPage"
import UserProfilePage from "./pages/UserProfilePage"
import MyProfilePage from "./pages/MyProfilePage"
import Loader from "./components/Loader"



function App() {
  const [users, updateUsers] = useState([]) // users useState is an empty array, then updated by using the axios get method and updateUsers method here.

  const [ isLoading, setIsLoading ] = useState(true);
  const [ loggedIn, setLoggedIn ] = useState(
    localStorage.getItem('jwt') !== null
  )

  const toggleLoggedIn = () => {
    setLoggedIn(true)
  }
  
  if(isLoading == false){
      useEffect(() => {
    
    axios.get('https://insta.nextacademy.com/api/v1/users')
    .then((result) => {
      console.log(result.data)
      updateUsers(result.data) // render the data into the users, so first it is an empty array, then updated using the updataUsers method.
      setIsLoading(!isLoading)
    })
    .catch(error => {
      console.log('ERROR ', error)
    })
  }, [])
  }


  if (isLoading) {
    return (
      
           <Loader style={{width:"50%", height:"50%", position:"absolute", top:"0", left:"0"}}/>
         
    )
  }


  return (
    <div>
      <NavBar  toggleLoggedIn={toggleLoggedIn} loggedIn={loggedIn} setLoggedIn={setLoggedIn}
      />

      <Route 
        exact path="/"
        render={() => <HomePage users={users} />}
       />
      
      <Route 
        path="/users/:id" 
        component={UserProfilePage} 
      />

      <Route 
        exact path="/profile" 
        component={MyProfilePage} 
      />

      <Route 
        exact path="/uploadImage" 
        component={UploadPage} 
      />

      <ToastContainer/>
    </div>
  );
}

export default App;
// render={() => <Home user={user} />}