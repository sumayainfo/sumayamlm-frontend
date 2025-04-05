import { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import profileImages from "../../assets/images/avatar_9.jpg";
import Tree from "react-d3-tree";
import { getUserTree, getUserById } from "../../api/auth";
import { useSelector } from "react-redux";
import LoadingProgress from "../../components/LoadingProgress";

const TreeView = () => {
  const userInfo = useSelector((state) => state.user.user);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mlmData, setMlmData] = useState(null); // State to store the tree data
  const [loading, setLoading] = useState(true);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Fetch additional data for each node using getUserById
  const fetchAdditionalData = async (user) => {
    try {
      // Ensure the user object has an _id field
      if (!user.id) {
        throw new Error("User ID is undefined");
      }
      // Fetch additional data for the user using their _id
      const userDetails = await getUserById(user.id);
      // Return the user object with additional attributes
      return {
        ...user, // Spread the existing user data
        attributes: {
          sponser_code: userDetails.data.sponser_code || "N/A",
          sponserBy: userDetails.data.sponserBy || "N/A",
        },
      };
    } catch (error) {
      console.error("Error fetching additional data:", error);
      // Return the user object with default values if there's an error
      return {
        ...user,
        attributes: {
          sponser_code: "N/A",
          sponserBy: "N/A",
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
      setMlmData(transformedData);
    } catch (error) {
      console.error("Error fetching tree data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData(userInfo?.sponser_code);
  }, [userInfo?.sponser_code]);

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

  // Custom Node Design
  const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
    const { name, attributes } = nodeDatum;
    const { sponser_code, sponserBy } = attributes || {};

    return (
      <g>
        {/* Profile Image */}
        <image
          href={profileImages} 
          x={-20} 
          y={-20}
          height="40"
          width="40"
          onClick={toggleNode} 
          onMouseEnter={() => setHoveredNode(nodeDatum)}
          onMouseLeave={() => setHoveredNode(null)} 
          style={{ cursor: "pointer" }}
        />

        {/* Node text content (Username) */}
        <foreignObject x={-50} y={17} width="100" height="50" style={{ pointerEvents: "auto", padding: "5px 5px" }}>
          <div
            style={{
              backgroundColor: "#eeeded",
              color: "black",
              fontSize: "12px",
              textAlign: "center",
              padding: "2px 4px",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0px 0px 3px 0px rgba(163,157,163,1)",
            }}
            onClick={toggleNode}
            onMouseEnter={() => setHoveredNode(nodeDatum)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {name}
          </div>
        </foreignObject>

        {/* Hover Card */}
        {hoveredNode === nodeDatum && (
          <foreignObject x={-90} y={45} width={180} height={150} style={{ pointerEvents: "auto", padding: "5px 5px" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0px 0px 3px 0px rgba(163,157,163,1)",
                zIndex: "999999",
                position: "relative",
              }}
            >
              <div style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <strong>Sponser Code:</strong> {sponser_code}
              </div>
              <div style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <strong>Sponser By:</strong> {sponserBy}
              </div>
            </div>
          </foreignObject>
        )}
      </g>
    );
  };

  // Render loading state while data is being fetched
  if (loading) {
    return <LoadingProgress loading={loading} />;
  }

  // Render error state if no data is available
  if (!mlmData) {
    return <div>No data available.</div>;
  }

  return (
    <>
      <div className="main-content-box">
        <h2 className="page-title">Tree View</h2>
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
            /<p style={{ color: "white" }}>Tree View</p>
          </Breadcrumbs>
        </div>

        <div className="main-content-card" style={{ backgroundColor: "white" }}>
          <div id="treeWrapper" style={{ width: "100%", height: "100vh" }}>
            <Tree
              data={mlmData} // Pass the transformed tree data
              orientation="vertical"
              pathFunc="step"
              collapsible={true}
              zoomable={true}
              translate={{ x: isMobile ? 170 : 600, y: 50 }}
              renderCustomNodeElement={renderCustomNodeElement}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TreeView;