import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Box,
  Switch,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { getTrasactions, updateTrasaction, deleteTransaction } from "../../api/transaction";
import ConfirmationModal from "../../components/ConfirmationModal";
import moment from 'moment';
import { Modal } from "react-bootstrap"; // Import Modal from react-bootstrap

const ActiveMembershipList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [categoryData, setCategoryData] = useState([]);
  const [transactionId, setTransactionId] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [userDetailModal, setUserDetailModal] = useState(false); // State for user detail modal
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user details

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = categoryData.slice(indexOfFirstItem, indexOfLastItem);

  const fetchData = async () => {
    try {
      const response = await getTrasactions();
      if (response.statusCode === 200) {
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setCategoryData(sortedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (id) => {
    setConfirmModal(true);
    setTransactionId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const packageData = {
      transactionId: transactionId,
      status: "Approve",
    };
    try {
      const response = await updateTrasaction(packageData);
      if (response.statusCode === 200) {
        setConfirmModal(false);
        toast.success(response.message);
        setTransactionId(null);
        fetchData();
      }
    } catch (error) {
      if (error.statusCode === 400) {
        toast.error(error.message);
      }
    }
  };

  const handalDelete = async (id) => {
    try {
      const response = await deleteTransaction(id);
      if (response.statusCode === 200) {
        toast.success(response.message);
        fetchData();
      }
    } catch (error) {
      if (error.statusCode === 400) {
        toast.error(error.message);
      }
    }
  };

  // Function to handle icon click and show user details
  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setUserDetailModal(true);
  };

  // Function to close the user detail modal
  const handleCloseUserDetailModal = () => {
    setUserDetailModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div
        className="main-content-box"
        style={{ display: "flex", flexDirection: "column", minHeight: "88vh" }}
      >
        <h2 className="page-title">Active Membership List</h2>
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
            /<p style={{ color: "white" }}>Active Membership List</p>
          </Breadcrumbs>
        </div>

        <Box className="main-table-card">
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 className="table-title">Active Membership List</h2>
          </Box>

          <TableContainer className="table-container">
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="table-head-cell" style={{ width: "250px" }}>
                    Transaction ID
                  </TableCell>
                  <TableCell className="table-head-cell">
                    Package
                  </TableCell>
                  <TableCell className="table-head-cell">
                    User Name
                  </TableCell>
                  <TableCell className="table-head-cell">
                    Mobile
                  </TableCell>
                  <TableCell className="table-head-cell">Buy Date</TableCell>
                  <TableCell className="table-head-cell">Status</TableCell>
                  <TableCell className="table-head-cell" align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData &&
                  currentData.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell
                        className="table-body-cell"
                        style={{ whiteSpace: "pre-wrap", maxWidth: "250px", wordWrap: "break-word" }}
                      >
                        {item?.transactionId}
                      </TableCell>
                      <TableCell className="table-body-cell" style={{ textAlign: "center" }}>
                        ${item?.price}
                      </TableCell>
                      <TableCell className="table-body-cell">
                        {item?.userId?.fullName}
                      </TableCell>
                      <TableCell className="table-body-cell">
                        {item?.userId?.phone}
                      </TableCell>
                      <TableCell className="table-body-cell">
                        {moment(item?.createdAt).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell className="table-body-cell">
                        {item?.status}
                      </TableCell>
                      <TableCell className="table-body-cell" align="center">
                        <Switch
                          checked={item?.status === "Approve" ? true : false}
                          onClick={() => handleChange(item?.transactionId)}
                          inputProps={{ "aria-label": "controlled" }}
                        />

                        <Icon
                          color="error"
                          size="small"
                          icon="carbon:view-filled"
                          fontSize={25}
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                          onClick={() => handleViewUserDetails(item?.userId)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Grid
          container
          justifyContent="center"
          style={{ marginTop: "auto", paddingTop: "20px" }}
        >
          <Pagination
            count={Math.ceil(categoryData.length / itemsPerPage)}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
          />
        </Grid>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        handleOpen={confirmModal}
        handleClose={() => setConfirmModal(false)}
        message="Approve"
        handleAccept={handleSubmit}
      />

      {/* User Detail Modal */}
      <Modal show={userDetailModal} onHide={handleCloseUserDetailModal} centered style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              {/* User Profile Image */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <img
                  src={selectedUser.profileImage || "https://via.placeholder.com/150"} // Fallback to a placeholder if no image is available
                  alt="Profile"
                  style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
                />
              </div>

              {/* User Details */}
              <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>User Type:</strong> {selectedUser.user_type}</p>
              <p><strong>Registration Date:</strong> {moment(selectedUser.createdAt).format('DD-MM-YYYY')}</p>

              {/* Wallet Details */}
              <p><strong>Wallet ID:</strong> {selectedUser.walletId || "N/A"}</p>
              <p><strong>Wallet Status:</strong> {selectedUser.walletStatus ? "Active" : "Inactive"}</p>

              {/* Wallet QR Code Image */}
              {selectedUser.walletQrCode && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <p><strong>Wallet QR Code:</strong></p>
                  <img
                    src={selectedUser.walletQrCode}
                    alt="Wallet QR Code"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserDetailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ActiveMembershipList;