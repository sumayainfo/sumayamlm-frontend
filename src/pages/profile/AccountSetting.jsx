import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import { uploadImage } from "../../api/upload";
import { updateUserById, getUserById } from "../../api/auth"; // Import getUserById
import { toast } from "react-toastify";

const AccountSetting = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [imageUrl, setImageUrl] = useState("");
  const [walletId, setWalletId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const user = useSelector((state) => state?.user?.user); // Get user from Redux store

  // Fetch user details on component mount
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await getUserById(user._id);
        setUserDetails(response?.data);
        setWalletId(response?.data?.walletId || ""); // Set default walletId
        setImageUrl(response?.data?.walletQrCode || ""); // Set default imageUrl
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        toast.error("Failed to fetch user details");
      }
    };

    getUserDetails();
  }, [user._id]);

  // Handle window resize for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle file upload for QR code
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const uploadedImage = await uploadImage(file);
      setImageUrl(uploadedImage.Location);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload QR code");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!walletId || !imageUrl) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const data = {
        walletId: walletId,
        walletQrCode: imageUrl,
      };
      await updateUserById(user._id, data); // Update user details
      toast.success("USDT Wallet Address Updated Successfully");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update USDT Wallet Address");
    }
  };

  return (
    <>
      <div className="main-content-box">
        <h2 className="page-title">Account Setting</h2>
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
            /<p style={{ color: "white" }}>Account Setting</p>
          </Breadcrumbs>
        </div>

        <Row>
          <Col md={6}>
            <div className="main-content-card">
              <Form onSubmit={handleSubmit}>
                <h4 className="form-title">
                  Only Accept USDT BEP20 Wallet Address
                </h4>
                <hr />
                <Form.Group
                  style={{ marginRight: isMobile ? "0px" : "15px", marginBottom: "20px" }}
                >
                  <Form.Label>
                    USDT BEP20 Wallet Address{" "}
                    <span style={{ color: "var(--primary-color)" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Please Enter Wallet Address"
                    value={walletId}
                    onChange={(e) => setWalletId(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  style={{ marginRight: isMobile ? "0px" : "15px" }}
                  className="mb-2"
                >
                  <Form.Label>
                    USDT BEP20 QR Code{" "}
                    <span style={{ color: "var(--primary-color)" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="file"
                    onChange={handleFileUpload}
                  />
                </Form.Group>

                <Button type="submit" className="system-btn-1">
                  Update USDT Wallet Address
                </Button>
              </Form>
            </div>
          </Col>

          <Col md={6}>
            <div className="main-content-card" style={{ marginLeft: isMobile ? "0px" : "15px", }}>
              <p style={{ color: "white", textAlign: "center" }}>
                Current Wallet Address: {" "}
                <br />
                <span style={{
                  color: "var(--primary-color)",
                  wordBreak: "break-all",
                  whiteSpace: "pre-wrap",
                  maxWidth: "250px",
                }}>
                  {userDetails?.walletId || "N/A"}
                </span>
              </p>

              <div style={{ display: "flex", justifyContent: "center", height: "250px" }}>
                <Image
                  src={imageUrl || "https://via.placeholder.com/150"} // Fallback to placeholder if no image
                  alt="QR Code"
                  style={{ width: isMobile ? "70%" : "50%", height: "auto" }}
                />
              </div>


            </div>
          </Col>
        </Row>

      </div>
    </>
  );
};

export default AccountSetting;