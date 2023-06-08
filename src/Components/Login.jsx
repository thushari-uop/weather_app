import React, { useState } from 'react'
import { Card, Form, Button} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const userEmail = "user";
    const userPassword = "pwd";

    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);

    const navigate = useNavigate()

    const handleClick = ()=> {
        if(email === userEmail && password === userPassword){
            console.log("success");
            navigate("/dash-board");
        } else {
            alert("Your E-mail or Password is Wrong!");
        }
    }

    return (
        <div>
            
            <section
                style={{
                    backgroundImage: "url(Images/white-cloud-blue-sky.jpg)",
                    height: "575px",
                    backgroundSize: "cover",
                    backgroundpositionx: "inherit",
                }}
            >
                <div className="vh-100 pt-5">
                    <div className="container pt-3 h-100">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-8 col-md-8 col-lg-6 col-xl-5 col-sm-9">
                                <Card style={{ background: "#ffffffb5", borderRadius: "1rem" }}>
                                    <Card.Body className="p-5 text-center">
                                        <h3 className="mb-5">Sign in</h3>

                                        <Form.Group controlId="email" className="mt-4 mb-4">
                                            <Form.Control
                                                required
                                                type="text"
                                                className="mb-2"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            />
                                            <Form.Label>User Name</Form.Label>
                                        </Form.Group>

                                        <Form.Group controlId="password" className="mt-4 mb-4">
                                            <Form.Control
                                                required
                                                type="text"
                                                className="mb-2"
                                                style={{ WebkitTextSecurity: "disc" }}
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            />
                                            <Form.Label>Password</Form.Label>
                                        </Form.Group>

                                        <hr className="mt-5" />

                                        <Button type="button" variant="outline-primary" className="mt-2 col-8 col-md-6 col-lg-6 col-xl-6 col-sm-8"
                                        onClick={handleClick}
                                        >
                                            Login</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
