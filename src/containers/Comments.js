import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Card, CardBody, CardSubtitle, CardText, ListGroupItem, Form, Input} from 'reactstrap'
import Moment from 'react-moment';
import 'moment-timezone';

const Comments = ({imageId}) => {
    const [comments, setComments] = useState([])
    const [ input, setInput ]= useState("")
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images/${imageId}/comments`,
        {
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then (result => {
            //console.log(result)
            setComments(result.data)
        })
        .catch(err=>{
            console.log('Error: ', err)
        })
    },[imageId,submitted])
    
    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleComment = (e) =>{
        e.preventDefault()
        axios({
            method: 'POST',
            url: `https://insta.nextacademy.com/api/v1/images/${imageId}/comments`,
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            data : {
                content: input
            }
        })
        .then(result =>{
            // console.log(result)
            setInput("")
            setSubmitted(true)
        })
        .catch(err =>{
            console.log(err)
        })
        setSubmitted(false)
    }

    return (
        <>
        {
            comments.map((eachCom, index) => {
                return (
                <Card className="bg-dark text-white" style={{margin:"10px 0", width:"300px"}}>
                    <CardBody>
                    <CardText>{eachCom.content}</CardText>
                    </CardBody>
                </Card>
                )
            })
        }

            <ListGroupItem className="bg-dark">
                <Form onSubmit={handleComment}>
                    <Input value={input} onChange={handleInput}/>
                </Form>
            </ListGroupItem>
        </>
    )
}

export default Comments;