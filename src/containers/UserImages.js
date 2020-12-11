import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from "../components/Loader"
import {Card, CardImg} from 'reactstrap';


const UserImages = ({userId}) => {
    
    const [userImages, setUserImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${userId}`)
        .then(result => {
        
        setUserImages(result.data)
        setIsLoading(!isLoading)
    })
    .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log('ERROR: ', error)
      })
    
}, [])

    if (isLoading) {
        return <Loader width="150px" height="150px"/>
    }

    return (
        <div style={{display:"flex", flexWrap:"wrap", alignItems:"center", marginLeft:"5%"}}>
            {userImages.map((eachImg, index) => {
                return (
                    <Card style={{width:"200px", margin:"10px"}}>                    
                        <CardImg src={eachImg.url} alt="user images" style={{width: '150px', height:"150px", margin:"24px auto"}}/>
                    </Card>
                )
            })}
        </div>
    )


}

export default UserImages;