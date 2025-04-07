import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import "../../assets/css/Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../../features/user/userThunks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [results, setResults] = useState([]);
  const currentYear = new Date().getFullYear();
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
      setFormData(prev => ({ ...prev, sponserBy: refCode }));
    }
  }, [refCode]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (errors.agreement) {
      setErrors(prev => ({ ...prev, agreement: null }));
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    sponserBy: "",
    underChild: "",
    country: "",
    position: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.sponserBy) newErrors.sponserBy = "Sponsor ID is required";
    if (!formData.underChild) newErrors.underChild = "Upline Sponsor ID is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.position) newErrors.position = "Lag selection is required";
    if (!isChecked) newErrors.agreement = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputeChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                Choose your SWM Sponsor
              </h4>
              <hr />

              <Row>
                <Col md={6}>
                  <Form.Group
                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                  >
                    <Form.Label>
                      Enter The Sponsor ID{" "}
                      <span style={{ color: "var(--primary-color)" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      required
                      type="text"
                      name="sponserBy"
                      value={formData.sponserBy}
                      onChange={handleInputeChange}
                      placeholder="Search Sponsor ID"
                      isInvalid={!!errors.sponserBy}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.sponserBy}
                    </Form.Control.Feedback>
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
                </Col>
                <Col md={6}>
                  <Form.Group
                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                  >
                    <Form.Label>
                      Enter Upline Sponsor ID{" "}
                      <span style={{ color: "var(--primary-color)" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="underChild"
                      value={formData.underChild}
                      onChange={handleInputeChange}
                      placeholder="Enter Upline Sponsor ID"
                      isInvalid={!!errors.underChild}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.underChild}
                    </Form.Control.Feedback>
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
                </Col>
              </Row>

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
                  isInvalid={!!errors.position}
                >
                  <option value="" disabled>
                    Choose your Lag
                  </option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.position}
                </Form.Control.Feedback>
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
                      isInvalid={!!errors.title}
                    >
                      <option value="" disabled>
                        Select Title
                      </option>
                      <option value="Mr">Mr.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="Ms">Ms.</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group
                    style={{ marginRight: isMobile ? "0px" : "0px", marginLeft: isMobile ? "0px" : "10px" }}
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
                      isInvalid={!!errors.fullName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fullName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col md={6}>
                  <Form.Group
                    style={{ marginRight: isMobile ? "0px" : "15px" }}
                    className="mb-2"
                    id="email"
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
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
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
                    <InputGroup>
                      <Form.Control
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputeChange}
                        placeholder="Your Password"
                        style={{ position: "relative" }}
                        isInvalid={!!errors.password}
                      />
                      <FontAwesomeIcon
                        style={{ cursor: "pointer", position: "absolute", color: "black", right: "17px", top: "15px", zIndex: "11" }}
                        onClick={togglePasswordVisibility}
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
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
                    <InputGroup>
                      <Form.Control
                        required
                        type={showPassword ? "text" : "password"}
                        name="confirmpassword"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (errors.confirmPassword) {
                            setErrors({ ...errors, confirmPassword: null });
                          }
                        }}
                        placeholder="Your Password"
                        style={{ position: "relative" }}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <FontAwesomeIcon
                        style={{ cursor: "pointer", position: "absolute", color: "black", right: "17px", top: "15px", zIndex: "11" }}
                        onClick={togglePasswordVisibility}
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.country}
                    >
                      <option value="" disabled>
                        Country
                      </option>
                      <option value="Indian">Indian</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.country}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.dob}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dob}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <hr style={{ marginTop: "40px" }} />
              <h4 className="form-title">Welcome to the Sumaya World Marketing!</h4>
              <hr />

              <p className="rej-test-color">
                Thank you for Joining. As a Preferred Customer, To continue
                using our services, you must accept the Sumaya World Marketing Agreement
                & Annexure below.
              </p>

              <Form.Group controlId="agreementCheckbox" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label="I agree to FBO Agreement & Annexure"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  style={{ color: "black" }}
                  isInvalid={!!errors.agreement}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.agreement}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                type="submit"
                className="login-btn"
                onClick={handleSubmit}
                disabled={loader}
              >
                {loader ? "Processing..." : "Sign Up"}
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
          style={{ paddingTop: "10px", backgroundColor: "white" }}
          className="copy-right"
        >
          ®Copyright @ {currentYear} Sumaya Word Marketing, All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Register;