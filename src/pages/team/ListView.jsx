import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Icon } from "@iconify/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Pagination,
  Grid,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { getUserTree, getUserById, deleteUser } from "../../api/auth";
import { useSelector } from "react-redux";
import LoadingProgress from "../../components/LoadingProgress";
import ConfirmationModal from "../../components/ConfirmationModal";

const ListView = () => {
  const userInfo = useSelector((state) => state.user.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({}); // State to store additional user details
  const [transactionId, setTransactionId] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  // Fetch additional data for each user using getUserById
  const fetchAdditionalData = async (user) => {
    try {
      if (!user.id) {
        throw new Error("User ID is undefined");
      }
      const userDetails = await getUserById(user.id);
      return {
        ...user,
        attributes: {
          sponser_code: userDetails.data.sponser_code || "N/A",
          sponserBy: userDetails.data.sponserBy || "N/A",
          createdAt: userDetails.data.createdAt || "N/A",
          points: userDetails.data.points || "N/A",
        },
      };
    } catch (error) {
      console.error("Error fetching additional data:", error);
      return {
        ...user,
        attributes: {
          sponser_code: "N/A",
          sponserBy: "N/A",
          createdAt: "N/A",
          points: "N/A",
        },
      };
    }
  };

  // Transform the tree data to include additional details
  const transformTreeData = async (data) => {
    const transformedNode = await fetchAdditionalData(data);
    if (data.children && data.children.length > 0) {
      transformedNode.children = await Promise.all(
        data.children.map(transformTreeData)
      );
    }
    return transformedNode;
  };

  // Fetch data from the API
  const fetchData = async (sponserCode) => {
    setLoading(true);
    try {
      const response = await getUserTree(sponserCode);
      const transformedData = await transformTreeData(response);
      const listData = transformTreeToList(transformedData);
      setCategoryData(listData);
    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Transform tree data to a flat list
  const transformTreeToList = (treeData) => {
    const list = [];
    const traverse = (node, position = null) => {
      list.push({ ...node, position });
      if (node.children) {
        node.children.forEach((child, index) => {
          const childPosition = index === 0 ? 'left' : 'right';
          traverse(child, childPosition);
        });
      }
    };
    traverse(treeData);
    return list;
  };

  // Fetch data on component mount
  useEffect(() => {
    if (userInfo?.sponser_code) {
      fetchData(userInfo.sponser_code);
    }
  }, [userInfo?.sponser_code]);

  // Handle pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = categoryData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle delete confirmation
  const handleDeleteConfirmation = (id) => {
    setConfirmModal(true);
    setTransactionId(id);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response.statusCode === 200) {
        toast.success(response.message);
        fetchData(userInfo.sponser_code);
      }
    } catch (error) {
      if (error.statusCode === 400) {
        toast.error(error.message);
      }
    } finally {
      setConfirmModal(false);
    }
  };

  // Format date for better readability
  const formatDate = (dateString) => {
    if (dateString === "N/A") return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as per your requirement
  };

  return (
    <>
      <div className="main-content-box">
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
            /<p style={{ color: "black" }}>Active Membership List</p>
          </Breadcrumbs>
        </div>

        {loading ? (
          <LoadingProgress loading={loading} />
        ) : (
          <>
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
                      <TableCell className="table-head-cell">S.No</TableCell>
                      <TableCell className="table-head-cell">Sponser Code</TableCell>
                      <TableCell className="table-head-cell">Full Name</TableCell>
                      <TableCell className="table-head-cell">Date of Join</TableCell>
                      <TableCell className="table-head-cell">Level</TableCell>
                      <TableCell className="table-head-cell" align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentData.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell className="table-body-cell">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </TableCell>
                        <TableCell className="table-body-cell">{item.attributes?.sponser_code}</TableCell>
                        <TableCell className="table-body-cell">{item.name}</TableCell>
                        <TableCell className="table-body-cell">
                          {formatDate(item.attributes?.createdAt)}
                        </TableCell>
                        <TableCell className="table-body-cell">{item.attributes?.points}</TableCell>
                        <TableCell className="table-body-cell" align="center">
                          <Button>View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Grid container justifyContent="center" style={{ marginTop: "auto", paddingTop: "20px" }}>
              <Pagination
                count={Math.ceil(categoryData.length / itemsPerPage)}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                color="primary"
              />
            </Grid>
          </>
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={confirmModal}
          onClose={() => setConfirmModal(false)}
          onConfirm={() => handleDelete(transactionId)}
          title="Confirm Delete"
          message="Are you sure you want to delete this user?"
        />
      </div>
    </>
  );
};

export default ListView;