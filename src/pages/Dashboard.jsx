import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";
import SuperAdminDashboard from "../components/SuperAdminDashboard";
import { getUserById } from "../api/auth";
import LoadingProgress from "../components/LoadingProgress"; // Import a loading spinner
import { toast } from "react-toastify"; // Import toast for error handling

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const user = useSelector((state) => state?.user?.user); // Get user from Redux store

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (user?._id) {
          const response = await getUserById(user._id); // Fetch user details
          if (response?.data) {
            setUserDetails(response.data); // Set user details
          }
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        toast.error("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserDetails();
  }, [user?._id]); // Dependency array ensures this runs when user._id changes

  // Show loading spinner while fetching user details
  if (loading) {
    return <LoadingProgress />;
  }

  // Show an error message if user details are not available
  if (!userDetails) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Failed to load user details. Please try again later.</p>
      </div>
    );
  }

  // Conditional rendering based on user type
  return (
    <>
      {userDetails.user_type === "Super_Admin" ? (
        <SuperAdminDashboard userData={userDetails} />
      ) : userDetails.user_type === "Admin" ? (
        <AdminDashboard userData={userDetails} />
      ) : (
        <UserDashboard userData={userDetails} />
      )}
    </>
  );
};

export default Dashboard;