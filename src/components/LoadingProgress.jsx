import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const LoadingProgress = ({ loading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) return prev; // Stop at 98% until loading completes

          const speed = prev < 60 ? 3 : prev < 85 ? 2 : 1; // Fast at start, slows down gradually
          return Math.min(prev + speed, 98); // Smooth progression
        });
      }, 300); // Small interval for smooth effect
    }

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => setProgress(100), 500); // Smooth transition to 100%
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <Box
      style={{
        textAlign: "center",
        height: "30vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontSize: "18px",
        color: "white",
      }}
    >
      {/* Rotating Circle */}
      <Box
        style={{
          position: "relative",
          width: "90px",
          height: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer Circle */}
        <Box
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            border: "4px solid var(--primary-color)",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "rotate 1s linear infinite",
          }}
        />

        {/* Inner Content */}
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography  variant="h5" style={{ color: "var(--primary-color)" }}>
            {progress}%
          </Typography>
          <Typography style={{ color: "var(--primary-color)", fontSize: "12px", fontWeight: "bold" }}>
            Loading...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingProgress;