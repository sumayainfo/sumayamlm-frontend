import { useState, useEffect, useRef } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Row, Col, Form, Button } from "react-bootstrap";

const ChangePassword = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div className="main-content-box">
                <h2 className="page-title">Change Password</h2>
                <div className="main-serch-box">
                    <Breadcrumbs
                        className="link-breadcrumb"
                        title="Basic"
                    >
                        <p>
                            <Icon
                                className="icon-green"
                                style={{ fontSize: "20px", marginBottom: "7px" }}
                                icon="tabler:home-filled"
                            />
                            <Link to="/"> Dashboard</Link>
                        </p>
                        /
                        <p style={{ color: "white" }}>Change Password</p>
                    </Breadcrumbs>
                </div>

                <div className="main-content-card">
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <h4 className="form-title">Update Password</h4>
                        <hr />
                        <Row>
                            <Col md={4} > 
                                <Form.Group
                                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                                    className="mb-2"
                                >
                                    <Form.Label>Old Password <span style={{ color:"var(--primary-color)" }}>*</span></Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="fullName"
                                        placeholder="Pleas Enter Wallet Address"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4} > 
                                <Form.Group
                                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                                    className="mb-2"
                                >
                                    <Form.Label>New Password <span style={{ color:"var(--primary-color)" }}>*</span></Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="fullName"
                                        placeholder="Pleas Enter New Password"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4} > 
                                <Form.Group
                                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                                    className="mb-2"
                                >
                                    <Form.Label>Confirm New Password <span style={{ color:"var(--primary-color)" }}>*</span></Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="fullName"
                                        placeholder="Pleas Enter Confirm New Password"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button type="submit" className="system-btn-1">
                            Update Password
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;