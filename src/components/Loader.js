import React from 'react'
import loadgif from "../Dual Ball-1s-200px.gif"


const Loader = ({style}) => {
        return(
        <div> 
                <img src={loadgif} style={style}/>  
        </div>
        ) 

}

export default Loader;