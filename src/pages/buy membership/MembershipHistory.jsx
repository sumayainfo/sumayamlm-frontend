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
} from "@mui/material";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getTrasactionByUser } from "../../api/transaction";
const MembershipHistory = () => {
  const userInfo = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [categoryData, setCategoryData] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = categoryData.slice(indexOfFirstItem, indexOfLastItem);

  const fetchData = async () => {
    try {
      const response = await getTrasactionByUser(userInfo._id);
      if (response.statusCode === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userInfo._id]);

  return (
    <>
      <div
        className="main-content-box"
        style={{ display: "flex", flexDirection: "column", minHeight: "88vh" }}
      >
        <h2 className="page-title">Membership History</h2>
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
            /<p style={{ color: "white" }}>Membership History</p>
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
            <h2 className="table-title">All Membership History</h2>
          </Box>

          <TableContainer className="table-container">
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell className="table-head-cell">
                    Transaction ID
                  </TableCell>
                  <TableCell className="table-head-cell">
                    Package Name
                  </TableCell>
                  <TableCell className="table-head-cell">Buy Date</TableCell>
                  <TableCell className="table-head-cell">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData &&
                  currentData.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="table-body-cell">
                        {item?.transactionId}
                      </TableCell>
                      <TableCell className="table-body-cell">
                        Package ${item?.price}
                      </TableCell>
                      <TableCell className="table-body-cell">
                        {item?.createdAt}
                      </TableCell>
                      <TableCell className="table-body-cell">
                        {item?.status}
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
            count={Math.ceil(length / itemsPerPage)}
            // page={currentPage}
            // onChange={handlePageChange}
            color="primary"
          />
        </Grid>
      </div>
    </>
  );
};

export default MembershipHistory;
