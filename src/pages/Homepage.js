import React from 'react';
import UserImages from '../containers/UserImages'
import { Link } from "react-router-dom"


const  HomePage = ({users}) => {
    return (
      <div style={{backgroundColor:"#1b2021", paddingTop:"10px"}}>  
          {users.map(user => ( //at this point, users is an array of all the users id, img and username
            <div style={{display:"flex", marginBottom:"10px", marginLeft:"10px", backgroundColor:"#1b2021"}}>

              <div style={{textAlign:"center", display:"flex", flexDirection:"column"}}>  
                <img 
                src={user.profileImage} alt="Pictures"
                style={{width: '200px', margin:"10px 10px", borderRadius:"50%"}}/>
                <Link 
                style={{textDecoration:"none", color:"white"}} 
                to={`/users/${user.id}`}>
                {user.username}
                </Link>
              </div>

              <div>
                <UserImages userId={user.id}/>
              </div>

            </div>

          ))}
      </div>
      
    );
}

export default HomePage;