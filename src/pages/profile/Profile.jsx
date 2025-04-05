import { useState, useEffect, useRef } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Logo from "../../assets/images/logo.png";
import ProfileImg from "../../assets/images/avatar_12.jpg";
import BackgroundImageUrl from "../../assets/images/IDCard.png";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import ReferralShare from "../../components/ReferralShare";
import { useSelector } from "react-redux";
import { getUserById, updateUserById } from "../../api/auth";
import { uploadImage } from "../../api/upload";
import { toast } from "react-toastify";

const Profile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [reffralModal, setReffralModal] = useState(false);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const user = useSelector((state) => state?.user?.user);
  const [userDetails, setUserDetails] = useState(null);
  const [title, setTitle] = useState(userDetails?.title);
  const [fullName, setFullName] = useState(userDetails?.fullName);
  const [email, setEmail] = useState(userDetails?.email);
  const [phone, setPhone] = useState(userDetails?.phone);
  const [country, setNationality] = useState(userDetails?.national);
  const [dob, setDob] = useState(userDetails?.dob);
  const [imageUrl, setImageUrl] = useState(null);
  const [show, setShow] = useState(false);
  const getUserDetails = async () => {
    try {
      const response = await getUserById(user._id);
      setUserDetails(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("userDetails", userDetails);

  useEffect(() => {
    getUserDetails();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClose = () => {
    setReffralModal(false);
  };

  const handleUpadate = async () => {
    const data = {
      title: title,
      fullName: fullName,
      email: email,
      phone: phone,
      country: country,
      dob: dob,
      profileImage: imageUrl?imageUrl:userDetails?.profileImage,
    };
    try {
      await updateUserById(userDetails?._id, data);
      toast.success("Profile Updated Successfully");
      getUserDetails();
    } catch (error) {
      toast.error("Failed to update Profile");
    }
  };


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const uploadedImage = await uploadImage(file);
      setImageUrl(uploadedImage.Location);

      setShow(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setShow(false);
    }
  };
  return (
    <>
      <div className="main-content-box">
        <h2 className="page-title">My Profile</h2>
        <div className="main-serch-box">
          <Breadcrumbs className="link-breadcrumb" title="Basic">
            <p>
              <Icon
                className="icon-green"
                style={{ fontSize: "20px", marginBottom: "7px" }}
                icon="tabler:home-filled"
              />
              <Link to="/"> Dashboard</Link>
            </p>
            /<p style={{ color: "black" }}>My Profile</p>
          </Breadcrumbs>
        </div>

        <div className="row">
          <div className="col-12 col-lg-4 col-md-12">
            <div
              ref={contentRef}
              style={{
                marginTop: isMobile ? "20px" : "0px",
                marginBottom: isMobile ? "20px" : "0px",
              }}
            >
              <div
                className="profile-i-card"
                style={{
                  backgroundImage: `url(${BackgroundImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="logo-img-card">
                  <img src={Logo} alt="profile-img" />
                </div>
                <div className="profile-img">
                  <img src={userDetails?.profileImage?userDetails?.profileImage:ProfileImg} alt="profile-img" />
                </div>
                <div className="card-profile-details">
                  <h3 className="profile-name">
                    {userDetails?.title + " " + userDetails?.fullName}{" "}
                  </h3>
                  <div className="profile-role">Diamond</div>
                  <div className="cr-pro-details">
                    <p style={{ fontSize: "15px", fontWeight: "600" }}>
                      ID No : <span>{userDetails?.sponser_code}</span>
                    </p>
                    <p>
                      Phone : <span>{userDetails?.phone}</span>
                    </p>
                    <p>
                      Email : <span>{userDetails?.email}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="cr-btn-auto"
              style={{ marginBottom: isMobile ? "20px" : "0px" }}
            >
              <button
                style={{ width: "341px" }}
                onClick={reactToPrintFn}
                className="login-btn"
              >
                Print ID Card
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-8 col-md-12">
            <div className="profile-form">
              <div className="card-profile-details2">
                <div className="profile-img-2">
                  <img src={userDetails?.profileImage?userDetails?.profileImage:ProfileImg} alt="profile-img" />
                  <Icon
                    className="profile-edit-icon"
                    style={{
                      fontSize: "35px",
                      color: "#00b74a",
                      cursor: "pointer",
                    }}
                    icon="flowbite:edit-solid"
                    onClick={() => setShow(true)}
                  />
                </div>

                <div
                  style={{
                    marginLeft: isMobile ? "0px" : "30px",
                    marginTop: isMobile ? "20px" : "0px",
                  }}
                >
                  <h3 className="profile-name" style={{ color: "var(--text-color)" }}>
                    {userDetails?.title + " " + userDetails?.fullName}{" "}
                  </h3>
                  <div className="cr-pro-details">
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        marginBottom: isMobile ? "10px" : "0px",
                        color: "var(--text-color)"
                      }}
                    >
                      ID No : <span>{userDetails?.sponser_code}</span>
                      <span
                        style={{
                          marginLeft: isMobile ? "10px" : "10px",
                          marginBottom: isMobile ? "10px" : "0px",
                          color: "var(--text-color)"
                        }}
                      >
                        <button
                          className="share-ref-btn"
                          onClick={() => setReffralModal(true)}
                        >
                          <Icon
                            style={{
                              fontSize: "16px",
                              color: "black",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                            icon="material-symbols:share"
                          />{" "}
                          Share Referral ID
                        </button>
                      </span>
                    </p>
                    <p style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-color)" }}>
                      Phone : <span>{userDetails?.phone}</span>
                    </p>
                    <p style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-color)" }}>
                      Email : <span>{userDetails?.email}</span>
                    </p>
                  </div>
                </div>
              </div>

              <Form onSubmit={(e) => e.preventDefault()}>
                <h4 className="form-title mt-3">Personal Information </h4>
                <hr />
                <Row>
                  <Col md={6}>
                    <Form.Group
                      style={{ marginRight: isMobile ? "0px" : "15px" }}
                      className="mb-2"
                    >
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        as="select"
                        name="title"
                        value={title ? title : userDetails?.title || ""}
                        onChange={(e) => setTitle(e.target.value)}
                      >
                        <option value="">Select Title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Sir">Ms.</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group
                      style={{ marginRight: isMobile ? "0px" : "15px" }}
                      className="mb-2"
                    >
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="fullName"
                        placeholder="Enter Name"
                        omChange={(e) => setFullName(e.target.value)}
                        defaultValue={userDetails?.fullName}
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
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        defaultValue={userDetails?.email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group
                      style={{ marginRight: isMobile ? "0px" : "15px" }}
                      className="mb-2"
                    >
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        className="form-control"
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[0-9]*"
                        placeholder="Mobile Number"
                        defaultValue={userDetails?.phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        as="select"
                        name="nationality"
                        defaultValue={userDetails?.national}
                        onChange={(e) => setNationality(e.target.value)}
                      >
                        <option value="">select Country </option>
                        <option value="Indian">Indian</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group
                      style={{ marginRight: isMobile ? "0px" : "15px" }}
                      className="mb-2"
                    >
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
              
                        type="date"
                        name="dob"
                        placeholder="Your Password"
                        defaultValue={userDetails?.dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  className="login-btn"
                  onClick={handleUpadate}
                >
                  Update Profile
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Referral ID */}
      <Modal show={reffralModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ borderBottom: "none" }}>
          <Modal.Title
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "var(--text-color)",
            }}
          >
            Share Referral ID
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "16px",
                color: "var(--text-color)",
                marginBottom: "20px",
              }}
            >
              Your Referral ID is:{" "}
              <span style={{ fontWeight: "bold", color: "#00b74a" }}>
                {userDetails?.sponser_code}
              </span>
            </p>
            <div>
              <span style={{ fontSize: "14px", color: "#333" }}>
                <ReferralShare userId={userDetails?.sponser_code} />
              </span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none", justifyContent: "center" }}>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: "#f5f5f5",
              color: "#333",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Update Profile Picture */}
      <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton style={{ borderBottom: "none" }}>
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "var(--text-color)",
          }}
        >
          Update Profile Picture
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: "20px" }}>
        <Form >
          <Form.Group>
            <Form.Label style={{ color: "var(--text-color) !important" }}>
              Choose a new profile picture
            </Form.Label>
            <Form.Control type="file" onChange={(e) => handleFileUpload(e)} required />
          </Form.Group>
          <Button type="submit" className="login-btn mt-3">
            Upload
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};


export default Profile;
