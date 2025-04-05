import { useState, useEffect } from "react";

const ReferralShare = ({ userId = "62dsh" }) => {
  const referralLink = `${window.location.origin}/register?ref=${userId}`;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=Join%20this%20app%20using%20my%20referral%20link:%20${encodeURIComponent(referralLink)}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareViaEmail = () => {
    const mailtoUrl = `mailto:?subject=Join%20Our%20App&body=Sign%20up%20using%20my%20referral%20link:%20${encodeURIComponent(referralLink)}`;
    window.open(mailtoUrl, "_blank");
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Referral Link Input */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: "10px 5px",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        <span style={{ fontSize: "14px", color: "#333", padding: "8px" }}>
          {referralLink}
        </span>
        <button
          style={{
            backgroundColor: copied ? "#00b74a" : "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px",
            minWidth: "80px",
          }}
          onClick={copyToClipboard}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Share Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          style={{
            backgroundColor: "#25D366",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={shareViaWhatsApp}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            style={{ width: "20px", height: "20px" }}
          />
          WhatsApp
        </button>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onClick={shareViaEmail}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
            alt="Email"
            style={{ width: "20px", height: "20px" }}
          />
          Email
        </button>
      </div>
    </div>
  );
};

export default ReferralShare;