import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Icon } from "@iconify/react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import LoadingProgress from "../../components/LoadingProgress";
import { getUserTree, getUserById } from "../../api/auth";
import { Margin } from "@mui/icons-material";

const MyDirectView = () => {
    const userInfo = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(true);
    const [leftCount, setLeftCount] = useState(0);
    const [rightCount, setRightCount] = useState(0);
    const [directUsers, setDirectUsers] = useState([]);
    const [totalLeftCount, setTotalLeftCount] = useState(0);
    const [totalRightCount, setTotalRightCount] = useState(0);
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
        if (userInfo?.sponser_code) {
            fetchData(userInfo.sponser_code);
        }
    }, [userInfo?.sponser_code]);

    const fetchData = async (sponsorCode) => {
        setLoading(true);
        try {
            const response = await getUserTree(sponsorCode);

            console.log("response", response)
            if (response?.children) {
                const left = response.children[0] ? 1 : 0;
                const right = response.children[1] ? 1 : 0;
                setLeftCount(left);
                setRightCount(right);

                const users = [];

                if (response.children[0]) {
                    const leftUser = await getUserById(response.children[0].id);
                    console.log("Left User Response:", leftUser); // Debugging: Log the API response
                    users.push({ 
                        fullName: leftUser.data?.fullName || "N/A", 
                        sponser_code: leftUser.data?.sponser_code || "N/A",
                        sponserBy: leftUser.data?.sponserBy || "N/A",
                        createdAt: leftUser.data?.createdAt || "N/A",
                        position: "Left" 
                    });
                }

                if (response.children[1]) {
                    const rightUser = await getUserById(response.children[1].id);
                    console.log("Right User Response:", rightUser); // Debugging: Log the API response
                    users.push({ 
                        fullName: rightUser.data?.fullName || "N/A", 
                        sponser_code: rightUser.data?.sponser_code || "N/A",
                        sponserBy: rightUser.data?.sponserBy || "N/A",
                        createdAt: rightUser.data?.createdAt || "N/A",
                        position: "Right" 
                    });
                }

                setDirectUsers(users);

                const { totalLeft, totalRight } = countLegMembers(response);
                setTotalLeftCount(totalLeft);
                setTotalRightCount(totalRight);
            }
        } catch (error) {
            console.error("Error fetching tree data:", error);
        } finally {
            setLoading(false);
        }
    };

    const countLegMembers = (treeData) => {
        let totalLeft = treeData.children[0] ? countAllDescendants(treeData.children[0]) : 0;
        let totalRight = treeData.children[1] ? countAllDescendants(treeData.children[1]) : 0;
        return { totalLeft, totalRight };
    };

    const countAllDescendants = (node) => {
        if (!node.children) return 1;
        return 1 + node.children.reduce((sum, child) => sum + countAllDescendants(child), 0);
    };

    const formatDate = (dateString) => {
        if (!dateString || dateString === "N/A") return "N/A";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="main-content-box">
            <h2 className="page-title">My Direct Sponsored</h2>
            <div className="main-serch-box">
                <Breadcrumbs className="link-breadcrumb">
                    <p>
                        <Icon className="icon-green" icon="tabler:home-filled" style={{ fontSize: "20px", marginBottom: "7px" }} />
                        <Link to="/"> Dashboard</Link>
                    </p>
                    /<p style={{ color: "white" }}>My Direct Sponsored</p>
                </Breadcrumbs>
            </div>

            <Box style={{ width: "100%", display: "flex", justifyContent: "flex-start", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
                <Box className="main-table-card-mini" style={{ width: isMobile ? "100%" : "30%", color: "white", padding: "20px", Margin: isMobile ? "10px 0" : "10px 0" }}>
                    <Typography variant="h5">Your Direct Sponsored</Typography>
                    <Typography variant="body1"><strong>Left Side:</strong> {leftCount}</Typography>
                    <Typography variant="body1"><strong>Right Side:</strong> {rightCount}</Typography>
                </Box>

                <Box className="main-table-card-mini" style={{ width: isMobile ? "100%" : "30%", color: "white", padding: "20px", }}>
                    <Typography variant="h5">Total Members in Each Leg</Typography>
                    <Typography variant="body1"><strong>Total Left Leg:</strong> {totalLeftCount}</Typography>
                    <Typography variant="body1"><strong>Total Right Leg:</strong> {totalRightCount}</Typography>
                </Box>
            </Box>

            {loading ? <LoadingProgress loading={loading} /> : (
                <Box className="main-table-card">
                    <h2 className="table-title">Direct Sponsored List</h2>
                    {directUsers.length === 0 ? (
                        <h2 className="table-title">No direct Sponsored found.</h2>
                    ) : (
                        <TableContainer className="table-container">
                            <Table>
                                <TableHead className="table-head">
                                    <TableRow>
                                        <TableCell className="table-head-cell">S.No</TableCell>
                                        <TableCell className="table-head-cell">Name</TableCell>
                                        <TableCell className="table-head-cell">Sponsor ID</TableCell>
                                        <TableCell className="table-head-cell">Sponsored By</TableCell>
                                        <TableCell className="table-head-cell">Date of Joining</TableCell>
                                        <TableCell className="table-head-cell">Position</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {directUsers.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="table-body-cell">{index + 1}</TableCell>
                                            <TableCell className="table-body-cell">{user.fullName || "N/A"}</TableCell>
                                            <TableCell className="table-body-cell">{user.sponser_code || "N/A"}</TableCell>
                                            <TableCell className="table-body-cell">{user.sponserBy || "N/A"}</TableCell>
                                            <TableCell className="table-body-cell">{formatDate(user.createdAt)}</TableCell>
                                            <TableCell className="table-body-cell">{user.position || "N/A"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            )}
        </div>
    );
};

export default MyDirectView;