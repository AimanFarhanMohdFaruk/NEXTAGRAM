import React from 'react'
import {useState} from 'react'
import {Form, FormGroup, FormText, Button, Input, Container, Jumbotron, Row} from 'reactstrap'
import axios from 'axios'
import {toast} from 'react-toastify'

const UploadPage = () => {

    const [ imageFile , setImageFile ] = useState(null)
    const[ previewImage, setPreviewImage ] = useState(null)
    const [ message, setMessage ] = useState("")

    const handleImageFile = (e) => {
        if(e.target.value){
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0])   
        }else {
        setPreviewImage(null)
        setImageFile(null)
        }   
    }
    
    const handleSubmitImage = (e) => {
        e.preventDefault()
        let JWT = localStorage.getItem('jwt')
        let formData = new FormData();
        formData.append("image", imageFile)
        
        axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
            headers:{ Authorization: `Bearer ${JWT}`}
        })
          .then(response => {
            if(response.data.success){
                setMessage("Image Uploaded Sucessfully")
                setPreviewImage(null)
                setImageFile(null)

                toast.success("Image uploaded!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            }
          })
        .catch(error => {
            console.log(error)
            toast.error("Failed to upload, try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
         })
    }

    return(
        <>
        <Jumbotron>
        <Form onSubmit={handleSubmitImage}>
        <FormGroup>
            <Input
            type="file"
            name="image-file"
            onChange={handleImageFile}
            />
            <FormText color="muted">
            Make sure the image being uploaded is a supported format.
            </FormText>
        </FormGroup>
        <Button 
            type="submit" 
            disabled={!imageFile} 
            color="primary"
        >
        Upload
        </Button>
        </Form>
        </Jumbotron>

        <div className="card">
        {previewImage ? (
        <img
            src={previewImage}
            width="50%"
            height="50%"
        />
        ) : (
        <h3  className="text-center">
            {message ? message : "Live Preview"}
        </h3>
        )}
        </div>
        </>
        
    )
}

export default UploadPage;