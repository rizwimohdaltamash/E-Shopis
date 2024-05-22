import React,{useContext,useState} from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FirebaseContext ,firebaseAuth} from '../context/Firebase';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { GiAbstract074 } from "react-icons/gi";

const MyNavbar = (props) => {

    const navigate = useNavigate();
    const firebase = useContext(FirebaseContext); // Access Firebase context
    const isLoggedIn = firebase.isLoggedIn; // Access isLoggedIn variable 
     
   const logout=()=>{
    if (firebaseAuth) {
        firebaseAuth.signOut().then(() => {
        
        navigate('/login');
      });
    } else {
      console.error('Firebase auth object is undefined'); // Handle gracefully
    }
  }


    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>

                <Navbar.Brand href="#home"><GiAbstract074 />    <span >E-Shopis</span> </Navbar.Brand>

                { !isLoggedIn &&    <div className="navbar">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/book/list">Add Listing</Nav.Link>
                    <Nav.Link href="/book/orders">Orders</Nav.Link>
                </Nav>
                
                   <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">SignUp</Nav.Link>
                </Nav>
                </div>}

                {isLoggedIn && <div className="navbar">
                <Nav className="nav">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/book/list">Add Listing</Nav.Link>
                    <Nav.Link href="/book/orders">Orders</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/" >{firebaseAuth.user ? firebaseAuth.user.displayName : 'Username'}</Nav.Link>
                    <Button variant='success' onClick={logout}>Logout</Button>
                </Nav>
                </div> }


                 
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
