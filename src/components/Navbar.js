import React from 'react';
import  { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import {useHistory} from 'react-router-dom';
import AuthModal from "./AuthModal"
import {toast} from "react-toastify"




const NavBar = ({toggleLoggedIn, loggedIn, setLoggedIn}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const history = useHistory()

    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const handleLogOut =() => {
        localStorage.removeItem("jwt")
        setLoggedIn(false)
        history.push("/")

        toast("You have successfully logged out.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

    }

    if (loggedIn) {
        return (
            <>
             <div>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">NEXTAGRAM</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            
            <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink style={{cursor:"pointer"}} onClick= {() => {history.push("/")}} >Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{cursor:"pointer"}} onClick= {() => {history.push("/profile")}} >Profile Page</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{cursor:"pointer"}} onClick= {() => {history.push("/uploadimage")}} >Upload Image</NavLink>
                </NavItem>
                <NavItem>
                     <Button color="secondary" style={{cursor:"pointer"}} onClick= {handleLogOut}>Log Out</Button>
                </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
        </div>
            
            </>
        )
    }

    return (    
        <div>
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">NEXTAGRAM</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            
            <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink style={{cursor:"pointer"}} onClick= {() => {history.push("/")}} >Home</NavLink>
                </NavItem>
                <NavItem>
                     <Button color="secondary" style={{cursor:"pointer"}} onClick= {toggleModal}>Log In</Button>
                </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
        <AuthModal 
            isOpen={showModal} 
            toggle={toggleModal}
            toggleLoggedIn={toggleLoggedIn}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
        />
        </div>
    );
}

export default NavBar;


       // <>
        // <nav style={{padding:"15px", backgroundColor:"#a6a867", boxShadow:"1px 1px 20px black"}}>
        // <Link style={{color:"black", textDecoration:"none"}} to="/">Home</Link>
        //     {/* We temporarily hardcode this to user id 1*/}
        // <Link style={{color:"black", marginLeft:"10px", textDecoration:"none"}} to="/users/1">My Profile</Link>
        // </nav>
        // </> 

        // <NavLink style={{cursor:"pointer"}} onClick= {() => {history.push("/")}}>Home</NavLink>
