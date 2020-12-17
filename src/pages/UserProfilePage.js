//display UserName
//and all images.
import {useState, useEffect} from 'react';
import loadgif from "../Dual Ball-1s-200px.gif"
import axios from 'axios';

import React from 'react'
import {useParams} from "react-router-dom"
import { CardImg } from 'reactstrap';

import Comments from "../containers/Comments"
import Likes from "../containers/Likes"


const UserProfilePage = () => {
    const{id}= useParams()
    console.log(id)
    const[ profileImages, setProfileImages] = useState([])
    const [ isLoading, setIsLoading ] = useState(true);
    const [ profileName, setProfileName] = useState("")
    const [ profilePicture, setProfilePicture ] = useState("")

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/users/${id}`)
        .then((result) => {
        setProfileName(result.data.username)
        setProfilePicture(result.data.profileImage)
        setIsLoading(!isLoading)
        })
        .catch(error => {
          console.log('ERROR ', error)
        })
      }, [])

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${id}`)
        .then((result) => {
        console.log(result)
        setProfileImages(result.data)
        setIsLoading(!isLoading)
        })
        .catch(error => {
          console.log('ERROR ', error)
        })
      }, [])
    
      if (isLoading) {
        return <img src={loadgif} alt="Loader"/>
      }

      return(
        <div style={{backgroundColor:"#1b2021", height:"100vh"}}>
            <div style={{textAlign:'center'}}>
                <img alt="ProfilePicture" style={{width:"150px", height:"150px", borderRadius:"50%", paddingTop:"10px"}} src={profilePicture}/>
                <h2 style={{color:"white"}}>{profileName}</h2>
            </div>

            <div style={{display:"flex", flexWrap:"wrap", margin:"0 1rem", paddingBottom:"3rem", backgroundColor:"#1b2021"}}>
              
              {profileImages.map((eachImg, index) => {
                return (
                  <div style={{position:"relative", margin:"0 auto", paddingTop:"10px", color:"#fff", cursor:"pointer"}}>                    
                    <CardImg src={eachImg.url} id={eachImg.id} alt="profile images" style={{width:"300px", height:"300px", margin:"24px auto"}} />
                    <span><Likes imageId={eachImg.id}/></span>
                    <Comments imageId={eachImg.id}/>
                  </div>
                )
              })}
            
            </div>
            

        
        </div>
      )

}

export default UserProfilePage;


// <Card style={{width:"200px", margin:"10px"}}>                    
// <CardImg src={eachImg.url} alt="user images" style={{width: '150px', height:"150px", margin:"24px auto"}}/>
// </Card>