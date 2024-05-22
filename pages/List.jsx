import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useFirebase} from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const ListingPage =()=>{

   const firebase =useFirebase(); 
   const navigate = useNavigate();

   const [name,setName]=useState('');
   const [isbnNumber,setIsbnNumber]=useState('');
   const [price,setPrice]=useState('');
   const [coverPic,setCoverPic]=useState('');
   
   const [errors, setErrors] = useState({}); // State to store validation errors

   const validateForm = () => {
    const validationErrors = {};
    if (name.trim() === '') {
      validationErrors.name = 'Please enter a book name.';
    }
    if (isbnNumber.trim() === '') {
      validationErrors.isbnNumber = 'Please enter an ISBN number.';
    }
    if (price.trim() === '') {
      validationErrors.price = 'Please enter a price.';
    }
    if (!coverPic) {
      validationErrors.coverPic = 'Please select a cover picture.';
    }
    setErrors(validationErrors); // Update errors state
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

   const handleSubmit =async(e)=>{
    e.preventDefault(); 

    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    await firebase.handleCreateNewListing(name,isbnNumber,price,coverPic);
    // Navigate to '/' after successful creation
    navigate('/');
   };

 

    return(
        <div className="container mt-5"> 
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Book Name</Form.Label>
            <Form.Control 
            onChange={(e)=>setName(e.target.value)} 
            value={name}
            type="text"
            placeholder="Book name" 
            isInvalid={!!errors.name} 
            />
            
          </Form.Group>
    
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ISBN</Form.Label>
            <Form.Control 
            onChange={(e)=>setIsbnNumber(e.target.value)} 
            value={isbnNumber}
            type="text"
            placeholder="ISBN Number" 
            isInvalid={!!errors.isbnNumber}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control 
            onChange={(e)=>setPrice(e.target.value)} 
            value={price}
            type="text"
            placeholder="Enter Price" 
            isInvalid={!!errors.price}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cover Pic</Form.Label>
            <Form.Control 
            onChange={(e)=>setCoverPic(e.target.files[0])} 
            type="file"
            isInvalid={!!errors.coverPic}
            />

       <Form.Control.Feedback type="invalid">
            {errors.coverPic}
          </Form.Control.Feedback>


          </Form.Group>

          

          
          <Button variant="primary" type="submit" >
            Create
          </Button>
        </Form>
    

        
        
        </div>
            
    );
}

export default ListingPage;