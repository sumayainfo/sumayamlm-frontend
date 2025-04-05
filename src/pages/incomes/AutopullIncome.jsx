import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import LoadingProgress from "../../components/LoadingProgress";
import { toast } from "react-toastify"; // Import toast
import { getUserById } from "../../api/auth"; // Import getUserById

const AutoPullIncomeReport = () => {
  // Static data for auto-pull income levels
  const autoPullData = [
    { people: 3, income: 2, achieved: true, status: "Paid" },
    { people: 6, income: 4, achieved: true, status: "Unpaid" },
    { people: 12, income: 8, achieved: true, status: "Unpaid" },
    { people: 24, income: 16, achieved: false, status: "" },
    { people: 48, income: 32, achieved: false, status: "" },
    { people: 96, income: 64, achieved: false, status: "" },
    { people: 192, income: 128, achieved: false, status: "" },
    { people: 384, income: 256, achieved: false, status: "" },
    { people: 768, income: 512, achieved: false, status: "" },
  ];

  const [userDetails, setUserDetails] = useState(null);

  const user = useSelector((state) => state?.user?.user); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserById(user._id);
        setUserDetails(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, [user._id]);


  // Calculate total people joined and total amount paid
  const totalPeopleJoined = autoPullData
    .filter((item) => item.achieved)
    .reduce((sum, item) => sum + item.people, 0);

  const totalAmountPaid = autoPullData
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.income, 0);

  return (
    <div
      className="main-content-box"
      style={{ display: "flex", flexDirection: "column", minHeight: "88vh" }}
    >
      <h2 className="page-title">Auto-Pull Income Report</h2>
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
          /<p style={{ color: "white" }}>Auto-Pull Income Report</p>
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
          <h2 className="table-title">Auto-Pull Income Details</h2>
        </Box>

        <TableContainer className="table-container">
          <Table>
            {/* Conditional Rendering for Loading State */}
            {!userDetails ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <LoadingProgress />
                </TableCell>
              </TableRow>
            ) : userDetails.user_type === "User" ? (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center", color: "white" }}>
                  <div>
                   <p>Your ID Not Active Yet Please Buy Package to Active Your ID</p> 
                  </div>
                  <Link style={{
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "bold",
                    margin: "5px 10px",
                    background: "#afe837",
                    padding: "5px 10px",
                    borderRadius: "5px"
                  }} to="/buy-membership"> Buy Membership</Link>
                </TableCell>
              </TableRow>
            ) : (
              <>
                <TableHead className="table-head">
                  <TableRow>
                    <TableCell className="table-head-cell" style={{ textAlign: "center" }}>People</TableCell>
                    <TableCell className="table-head-cell" style={{ textAlign: "center" }}>Income</TableCell>
                    <TableCell className="table-head-cell" style={{ textAlign: "center" }}>Achieved</TableCell>
                    <TableCell className="table-head-cell" style={{ textAlign: "center" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {autoPullData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="table-body-cell" style={{ textAlign: "center" }}>
                        {item.people}
                      </TableCell>
                      <TableCell className="table-body-cell" style={{ textAlign: "center" }}>
                        ${item.income}
                      </TableCell>
                      <TableCell className="table-body-cell" style={{ textAlign: "center" }}>
                        {item.achieved ? "Yes" : "Not Achieved"}
                      </TableCell>
                      <TableCell className="table-body-cell" style={{ textAlign: "center" }}>
                        <Typography
                          style={{
                            color:
                              item.status === "Paid"
                                ? "green"
                                : item.status === "Unpaid"
                                  ? "red"
                                  : "inherit",
                            fontWeight: item.status ? "bold" : "normal",
                          }}
                        >
                          {item.achieved ? item.status : "Not Achieved"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            )}
          </Table>
        </TableContainer>

        {/* Summary Section */}
        {userDetails && userDetails.user_type === "Admin" && (
          <Box
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
              Summary
            </Typography>
            <Typography variant="body1">
              <strong>Total People Joined:</strong> {totalPeopleJoined}
            </Typography>
            <Typography variant="body1">
              <strong>Total Amount Paid:</strong> ${totalAmountPaid}
            </Typography>
          </Box>
        )}

      </Box>
    </div>
  );
};

export default AutoPullIncomeReport;