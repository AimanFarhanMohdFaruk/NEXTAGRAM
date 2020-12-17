import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { ListGroupItem } from 'reactstrap'

const Likes = ({imageId}) => {
    const[liked,setLiked]=useState(false)
    const[submitted, setSubmitted]=useState(false)
    const[likeUsers, setLikeUsers]=useState([])

    useEffect(() =>{
        axios.get(`https://insta.nextacademy.com/api/v2/images/${imageId}`,
        {
            headers:{
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(result =>{
            console.log(result)
            setLiked(result.data.liked)
            setLikeUsers(result.data.likes)
            //console.log(likeUsers)
        })
        .catch(err =>{
            console.log(err)
        })
    },[imageId, submitted])


    const handleImageLike = (e) => {
        axios({
            method: 'POST',
            url: `https://insta.nextacademy.com/api/v1/images/${imageId}/toggle_like`,
            headers:{
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
        })
        .then(result =>{
            console.log(result)
            setSubmitted(true)
        })
        .catch(err =>{
            console.log(err)
        })
        setSubmitted(false)
    }


    return(
        
        <ListGroupItem style={{color:"black"}}>
            {
            liked ? <span  onClick={handleImageLike} className="text-danger">Unlike</span> : <span  style={{color:"black"}} onClick={handleImageLike} className="text-primary">Like</span>
            }  
            {" "} {likeUsers.length} likes
        </ListGroupItem>
        
    )
}

export default Likes;