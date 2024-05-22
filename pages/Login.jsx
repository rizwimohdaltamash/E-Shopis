import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/Firebase';

const LoginPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for handling errors

    useEffect(() => {
        if (firebase.isLoggedIn) {
             // Navigate to home if the user is already logged in
            navigate('/');
        }
    }, [firebase, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        try {
            console.log("Logging in user...");
            await firebase.signinUserWithEmailAndPass(email, password);
            console.log("Login successful!");
        } catch (error) {
            setError(error.message); // Set error message
            console.error("Login error:", error);
        }
    };

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Enter password"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>

            {error && <p className="text-danger mt-3">{error}</p>}

            <h1 className="mt-5 mb-5">OR</h1>
            <Button onClick={firebase.signinWithGoogle} variant="danger">Sign in With Google</Button>
        </div>
    );
};

export default LoginPage;
