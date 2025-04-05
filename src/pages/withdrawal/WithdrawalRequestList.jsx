import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Box } from "@mui/material";
import { Button } from 'react-bootstrap';
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";



const WithdrawalRequestList = () => {

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [categoryData, setCategoryData] = useState([]);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = categoryData.slice(indexOfFirstItem, indexOfLastItem);

    return (

        <>
            <div className="main-content-box" style={{ display: "flex", flexDirection: "column", minHeight: "88vh" }}>
                <h2 className="page-title">Withdrawal Request List</h2>
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
                        <p style={{ color: "white" }}>Withdrawal Request List</p>
                    </Breadcrumbs>
                </div>

                <Box className="main-table-card">

                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <h2 className="table-title">All Withdrawal Request List</h2>
                    </Box>

                    <TableContainer className="table-container">
                        <Table>
                            <TableHead className="table-head">
                                <TableRow>
                                    <TableCell className="table-head-cell">Transaction ID</TableCell>
                                    <TableCell className="table-head-cell" >Package Name</TableCell>
                                    <TableCell className="table-head-cell">Buy Date</TableCell>
                                    <TableCell className="table-head-cell">Status</TableCell>
                                    <TableCell className="table-head-cell" align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow>
                                    <TableCell className="table-body-cell">
                                        ADJS3434343dsdkdj
                                    </TableCell>
                                    <TableCell className="table-body-cell">Package 1 $50</TableCell>
                                    <TableCell className="table-body-cell">20/02/2025</TableCell>
                                    <TableCell className="table-body-cell">
                                        Active
                                    </TableCell>

                                    <TableCell className="table-body-cell" align="center">
                                        <Icon
                                            icon="lets-icons:view-fill"
                                            width="26"
                                            height="26"
                                            style={{
                                                marginRight: "5px",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <Icon
                                            icon="fluent:edit-16-filled"
                                            width="20"
                                            height="20"
                                            style={{
                                                marginRight: "5px",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <Icon
                                            icon="material-symbols:delete-rounded"
                                            width="20"
                                            height="20"
                                            style={{
                                                color: "red",
                                                marginRight: "5px",
                                                cursor: "pointer",
                                            }}

                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="table-body-cell">
                                        ADJS3434343dsdkdj
                                    </TableCell>
                                    <TableCell className="table-body-cell">Package 1 $50</TableCell>
                                    <TableCell className="table-body-cell">20/02/2025</TableCell>
                                    <TableCell className="table-body-cell">
                                        Active
                                    </TableCell>

                                    <TableCell className="table-body-cell" align="center">
                                        <Icon
                                            icon="lets-icons:view-fill"
                                            width="26"
                                            height="26"
                                            style={{
                                                marginRight: "5px",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <Icon
                                            icon="fluent:edit-16-filled"
                                            width="20"
                                            height="20"
                                            style={{
                                                marginRight: "5px",
                                                cursor: "pointer",
                                            }}
                                        />
                                        <Icon
                                            icon="material-symbols:delete-rounded"
                                            width="20"
                                            height="20"
                                            style={{
                                                color: "red",
                                                marginRight: "5px",
                                                cursor: "pointer",
                                            }}

                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>


                <Grid container justifyContent="center" style={{ marginTop: "auto", paddingTop: "20px" }}>
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

export default WithdrawalRequestList;
