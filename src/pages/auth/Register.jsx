import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import "../../assets/css/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../../features/user/userThunks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams  } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [results, setResults] = useState([]);
  const currentYear = new Date().getFullYear();
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref');

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

  useEffect(() => {
    if (refCode) {
      setFormData({ ...formData, sponserBy: refCode });
    }
  }, [refCode]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    sponserBy: "",
    country: "",
    position: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputeChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isChecked) {
      alert("Please agree to the terms before proceeding.");
      return;
    }
    if (
      !formData.email &&
      !formData.fullName &&
      !formData.password &&
      !formData.phone
    ) {
      toast.error("Please fill the data..!");
      return;
    }
    setLoader(true);
    const response = await dispatch(
      registerUserAsync({ ...formData, username: formData.email })
    );
    if (response) {
      toast.success("Register Successfully!");
      navigate("/");
      setLoader(false);
    } else {
      toast.error("Email or phone alreday registred");
      setLoader(false);
    }
    if (isChecked) {
      alert("Thank you for agreeing!");
    } else {
      alert("Please agree to the terms before proceeding.");
    }
  };

  return (
    <>
      <div className="register-main-box">
        <div className="logo-box">
          <img src={logo} alt="" />
        </div>
        <Container className="reg-form-container">
          <div style={{ padding: "25px 25px" }}>
            <div className="reg-form-header">Create Your Account</div>

            <Form>
              <hr />
              <h4 className="mt-4 form-title">
                Choose your Jeevan Income Sponsor
              </h4>
              <hr />

              <Form.Group
                style={{ marginRight: isMobile ? "0px" : "15px" }}
                className="mb-2"
              >
                <Form.Label>
                  Enter The Sponsor ID{" "}
                  <span style={{ color: "var(--primary-color)" }}>*</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="sponserBy"
                  value={formData.sponserBy}
                  onChange={handleInputeChange}
                  placeholder="Search Sponsor ID"
                />
                {results.length > 0 && (
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginTop: "5px",
                      maxHeight: "100px",
                      overflowY: "auto",
                    }}
                  >
                    {results.map((result, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSearchValue(result);
                          setResults([]);
                        }}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </Form.Group>
              <Form.Group
                style={{ marginRight: isMobile ? "0px" : "15px" }}
                className="mb-2"
              >
                <Form.Label>
                  Select Lag{" "}
                  <span style={{ color: "var(--primary-color)" }}>*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="position"
                  value={formData.position || ""}
                  onChange={handleInputeChange}
                  required
                >
                  <option value="" disabled>
                    Choose your Lag
                  </option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </Form.Control>
              </Form.Group>

              <hr />
              <h4 className="form-title">Personal Information </h4>
              <hr />

              <Row>
                <Col md={6}>
                  <Form.Group
                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                  >
                    <Form.Label>
                      Title{" "}
                      <span style={{ color: "var(--primary-color)" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="title"
                      value={formData.title || ""}
                      onChange={handleInputeChange}
                      required
                    >
                      <option value="" disabled>
                        Select Title
                      </option>
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group
                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                  >
                    <Form.Label>
                      Name{" "}
                      <span style={{ color: "var(--primary-color)" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputeChange}
                      placeholder="Enter Name"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={6}>
                  <Form.Group
                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                  >
                    <Form.Label>
                      Email{" "}
                      <span style={{ color: "var(--primary-color)" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputeChange}
                      placeholder="Your Email"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    style={{ marginLeft: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                  >
                    <Form.Label>
                      Mobile Number{" "}
                      <span style={{ color: "var(--primary-color)" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      className="form-control"
                      inputMode="numeric"
                      maxLength={10}
                      pattern="[0-9]*"
                      placeholder="Mobile Number"
                      value={formData.phone}
                      onChange={handleInputeChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={6}>
                  <Form.Group
                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                  >
                    <Form.Label>
                      Password{" "}
                      <span style={{ color: "var(--primary-color)" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputeChange}
                      placeholder="Your Password"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    style={{ marginLeft: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                  >
                    <Form.Label>
                      Confirm Password{" "}
                      <span style={{ color: "var(--primary-color)" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      name="confirmpassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Your Password"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={6}>
                  <Form.Group
                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                  >
                    <Form.Label>
                      Country{" "}
                      <span style={{ color: "var(--primary-color)" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="country"
                      value={formData.country || ""}
                      onChange={handleInputeChange}
                      required
                    >
                      <option value="" disabled>
                        Country
                      </option>
                      <option value="Indian">Indian</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    style={{ marginLeft: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                  >
                    <Form.Label>
                      Date of Birth{" "}
                      <span style={{ color: "var(--primary-color)" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputeChange}
                      placeholder="Your Password"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <hr style={{ marginTop: "40px" }} />
              <h4 className="form-title">Welcome to the Jeevan Income!</h4>
              <hr />

              <p className="rej-test-color">
                Thank you for Joining. As a Preferred Customer, To continue
                using our services, you must accept the Jeevan Income Agreement
                & Annexure below.
              </p>

              <Form.Group controlId="agreementCheckbox" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="I agree to FBO Agreement & Annexure"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>

              <Button
                type="submit"
                className="login-btn"
                onClick={handleSubmit}
              >
                {loader ? "Process.." : "Sign Up"}
                <FontAwesomeIcon className="login-icon" icon={faArrowRight} />
              </Button>

              <div className="register-link">
                Already have an account?
                <Link
                  style={{ marginLeft: "10px" }}
                  className="rej-test-color"
                  to="/"
                >
                  Sign in
                </Link>
              </div>
            </Form>
          </div>
        </Container>

        <p
          style={{ paddingTop: "10px", backgroundColor: "black" }}
          className="copy-right"
        >
          ®Copyright @ {currentYear} Jeevan Income, All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Register;
