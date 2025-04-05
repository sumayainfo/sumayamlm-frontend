import { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap"; // Import Modal
import PayQRCode from "../../assets/images/payqrcode.jpeg";
import { useSelector } from "react-redux";
import { addTrasaction, getTrasactionByUser } from "../../api/transaction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BuyMembership = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [transactionId, setTransactionId] = useState(null);
  const userInfo = useSelector((state) => state.user.user);
  const [transactionData, setTransactionData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal

  const fetchData = async () => {
    try {
      const response = await getTrasactionByUser(userInfo._id);
      if (response.statusCode === 200) {
        setTransactionData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userInfo._id]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const walletAddress = "TWfr26E2rGEWjgyZCR415ULrD1GAmi13er";

  const handleSubmit = async () => {
    const packageData = {
      userId: userInfo._id,
      price: 50,
      transactionId: transactionId,
    };
    try {
      const response = await addTrasaction(packageData);
      if (response.statusCode === 201) {
        setTransactionId(null);
        toast.success(response.message);
        fetchData(); // Refresh transaction data after submission
        navigate("/membership-history");
      }
    } catch (error) {
      if (error.statusCode === 400) {
        toast.error(error.message);
      }
    } finally {
      setShowConfirmation(false); // Close the confirmation modal
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      toast.success("Wallet address copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy wallet address.");
    }
  };

  return (
    <>
      <div className="main-content-box">
        <h2 className="page-title">Buy Membership</h2>
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
            /<p style={{ color: "white" }}>Buy Membership</p>
          </Breadcrumbs>
        </div>

        <div className="main-content-card">
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col md={6}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                    height: "400px",
                  }}
                >
                  <h4
                    style={{
                      textAlign: "center",
                      color: "var(--primary-color)",
                      marginTop: "20px",
                    }}
                  >
                    Scan QR Code to Pay
                  </h4>
                  <div
                    style={{ margin: "0 auto", width: "250px", height: "100%" }}
                  >
                    <img
                      width={"100%"}
                      height={"100%"}
                      src={PayQRCode}
                      alt=""
                    />
                  </div>
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <p
                      style={{
                        color: "var(--primary-color)",
                        textAlign: "center",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word"
                      }}
                    >
                      Trust wallet: {walletAddress}
                    </p>
                    <p
                      style={{
                        cursor: "pointer",
                        color: "white",
                        marginLeft: "10px",
                      }}
                      onClick={copyToClipboard}
                    >
                      Copy{" "}
                      <Icon icon="solar:copy-bold" width="24" height="24" />
                    </p>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div style={{ marginTop: "20px" }}>
                  {transactionData.length > 0 ? (
                    transactionData[0].status === "pending" ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <h4
                          style={{
                            textAlign: "center",
                            color: "var(--primary-color)",
                            marginTop: "20px",
                          }}
                        >
                          Payment Received but Pending. Please wait for Approval...
                        </h4>
                      </div>
                    ) : transactionData[0].status === "Approve" ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <h4
                          style={{
                            textAlign: "center",
                            color: "var(--primary-color)",
                            marginTop: "20px",
                          }}
                        >
                          Payment Successful and Approved!
                        </h4>
                        <p
                          style={{
                            textAlign: "center",
                            color: "var(--primary-color)",
                          }}
                        >
                          Current Package is : Package AutoPull One - $50
                        </p>

                        <p
                          style={{
                            textAlign: "center",
                            color: "var(--primary-color)",
                          }}
                        >
                          Now You can upgrade this Package to AutoPull Two - $150
                        </p>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <p
                          style={{
                            textAlign: "center",
                            color: "var(--primary-color)",
                          }}
                        >
                          Please fill out the form below to complete your payment. The
                          Transaction ID is the unique ID you receive after making the
                          payment, and it is required for verifying your payment.
                        </p>
                      </div>
                    )
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <p
                        style={{
                          textAlign: "center",
                          color: "var(--primary-color)",
                        }}
                      >
                        Please fill out the form below to complete your payment. The
                        Transaction ID is the unique ID you receive after making the
                        payment, and it is required for verifying your payment.
                      </p>
                    </div>
                  )}
                </div>

                <Form.Group
                  style={{ marginRight: isMobile ? "0px" : "15px" }}
                  className="mb-2"
                >
                  <Form.Label>
                    Package{" "}
                    <span style={{ color: "var(--primary-color)" }}>*</span>
                  </Form.Label>
                  <Form.Control as="select" name="title" required>
                    <option value="">Select Package </option>
                    {transactionData.length > 0 ? (
                      transactionData[0].status === "pending" ? (
                        <option value="Package $50">Package $50 (Pending Approval)</option>
                      ) : transactionData[0].status === "Approve" ? (
                        <option value="Package $150">Package $150</option>
                      ) : (
                        <option value="Package $50">Package $50</option>
                      )
                    ) : (
                      <option value="Package $50">Package $50</option>
                    )}
                  </Form.Control>
                </Form.Group>

                <Form.Group
                  style={{ marginRight: isMobile ? "0px" : "15px" }}
                  className="mb-2"
                >
                  <Form.Label>
                    Transaction ID{" "}
                    <span style={{ color: "var(--primary-color)" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="fullName"
                    placeholder="Please Enter Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                type="submit"
                className="system-btn-1"
                onClick={() => setShowConfirmation(true)} // Open confirmation modal
              >
                Buy Membership Package
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        centered
      >
        <Modal.Header closeButton style={{ color: "black" }}>
          <Modal.Title>Confirm Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          Are you sure you want to buy this package?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit} // Handle the purchase
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BuyMembership;