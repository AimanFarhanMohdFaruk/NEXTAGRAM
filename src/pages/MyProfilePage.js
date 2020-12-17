import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {CardImg} from 'reactstrap'
import loadgif from "../Dual Ball-1s-200px.gif"



const MyProfilePage = () => {

    const [user, setUser] = useState({})
    const [ loggedImages, setLoggedImages ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true);

    

    useEffect(() => {
        axios.get("https://insta.nextacademy.com/api/v1/users/me",
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(result => {
            console.log(result)
            setUser(result.data)
        })
        .catch(error => {
            console.log(error)
        })
    },[])

    useEffect(() => {
        axios.get("https://insta.nextacademy.com/api/v1/images/me",
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(result => {
            console.log(result)
            setLoggedImages(result.data)
            setIsLoading(!isLoading)
        })
        .catch(error => {
            console.log(error)
        })
    },[])
    

      if (isLoading) {
        return <img src={loadgif} alt="loading"/>
      }


    return(
    <div style={{backgroundColor:"#1b2021"}}>
        <div style={{textAlign:'center'}}>
            <img style={{width:"150px", height:"150px", borderRadius:"50%", paddingTop:"10px"}} src={user.profile_picture} alt="profilePicture"/>
            <h2 style={{color:"white"}}>{user.username}</h2>
        </div>

        <div style={{display:"flex", flexWrap:"wrap", margin:"0 1rem", paddingBottom:"3rem", backgroundColor:"#1b2021"}}>
              
              {loggedImages.map((eachImg, index) => {
                return (
                  <div style={{position:"relative", margin:"0 auto", paddingTop:"10px", color:"#fff", cursor:"pointer"}}>                    
                    <CardImg src={eachImg} alt="profile images" style={{width:"300px", height:"300px", margin:"24px auto"}} />
                  </div>
                )
              })}
            
            </div>
    </div>    
    )

}

export default MyProfilePage;