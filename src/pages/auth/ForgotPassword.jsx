import React, { useState, } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.png";
import "../../assets/css/Login.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
    const [loader, setLoader] = useState(false);
    const [email, setEmail] = useState("");
    const currentYear = new Date().getFullYear();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your forgot password logic here
        console.log("Forgot password for:", email);
    };

    return (
        <>
            <div className="login-main">
                <div className="container">
                    <div className="left-login-box">
                        <div className="login-logo">
                            <img src={logo} alt="User" />
                            <h2> Forgot Password </h2>
                            <p style={{ textAlign: "center" }}>Enter your UserName and we will send your reset password to the email registred with us.</p>
                        </div>

                        <div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your UserName"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {!loader ? (
                                    <Button
                                        type="submit"
                                        className="login-btn"
                                        onClick={handleSubmit}
                                    >
                                        Send Password
                                        <FontAwesomeIcon
                                            className="login-icon"
                                            icon={faArrowRight}
                                        />
                                    </Button>
                                ) : (
                                    <Button type="submit" className="login-btn">
                                        Sending....!
                                        <FontAwesomeIcon
                                            className="login-icon"
                                            icon={faArrowRight}
                                        />
                                    </Button>
                                )}
                            </Form>
                            <p style={{ textAlign: "center", marginTop: "20px" }}>Or</p>
                            <div style={{ textAlign: "center" }}>
                                Back To
                                <Link style={{ marginLeft: "5px", color: "var(--primary-color)" }} to="/">
                                    Login
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
                <hr />
                <p className="copy-right">®Copyright @ {currentYear} Jeevan Income, All rights reserved.</p>
            </div>
        </>
    );
};

export default ForgotPassword;
