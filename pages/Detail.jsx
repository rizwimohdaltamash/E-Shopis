import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form'; 
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Remove Form from here
import { FcOk} from "react-icons/fc";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const BookDetailPage = () => {
    const params = useParams();
    const firebase = useFirebase();
    const navigate = useNavigate();
    

    const [qty, setQty] = useState(1);
    const [data, setData] = useState(null);
    const [url, setURL] = useState(null);
    const [open, setOpen] = useState(false); // State for popup

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()));
    }, [firebase, params.bookId]);

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then(url => setURL(url));
        }
    }, [data, firebase]);

    const placeOrder=async()=>{
       const result=await firebase.placeOrder(params.bookId,qty);
       console.log("Order Placed",result);       
      // Display success message
       setData({ ...data, orderPlaced: true }); // Update state for success message
       setOpen(true); // Open popup after successful order 
    }
    
    const handleClose = () => setOpen(false); // Function to close popup

    if (data == null) return <h1>Loading...</h1>;

    return (
        <div className="container mt-5">
            <h1>{data.name}</h1>
            <img src={url} width="50%" style={{ borderRadius: '10px' }} alt="Book Cover" />
            <h1>Details</h1>
            <p>Price: Rs.{data.price}</p>
            <p>ISBN Number: {data.isbn}</p>
            <h1>Owner Details</h1>
            <p>Name: {data.displayName}</p>
            <p>Email: {data.userEmail}</p>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                    onChange={(e) => setQty(e.target.value)}
                    value={qty}
                    type="number"
                    placeholder="Enter Qty"
                />
            </Form.Group>

            <Button onClick={placeOrder} variant="success">Buy Now</Button>

            {/* Conditionally render success message and View Orders button
      {data.orderPlaced && (
        <div className="alert alert-success">Order Placed Successfully!</div>
      )}  */}


      {/* Popup component with success message */}
      <Popup open={open} onClose={handleClose} closeOnDocumentClick>
      <div className="alert alert-success d-flex justify-content-center align-items-center">
          Order Placed  Successfully!
          
           
          <FcOk style={{ margin: '0 5px' }} /> {/* Add margin for spacing */}
        </div>
      </Popup>

      
      <Button variant="primary" href="/book/orders" style={{ marginLeft: '10px' }}>View Orders</Button> 

       
       
        </div>
    );
};

export default BookDetailPage;
