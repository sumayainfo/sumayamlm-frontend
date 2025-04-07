import React, { useState, useEffect } from "react";
import dashimg from "../assets/images/dash1.png";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { WalletComponent } from "../wallet/WalletComponent";

const SuperAdminDashboard = ({ userData }) => {
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jeevan-income.onrender.com/api/v1/get-all-user")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.data);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const totalUsers = users.length;

  return (
    <>
      {loader ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="main-conent-box mb-5">
          <div className="welcom-box">
            <div className="row">
              <div className="col col-lg-6 col-md-12 col-sm-12">
                <div className="welcm-msg">
                  <div className="row">
                    <div className="col-12 col-lg-6 col-md-12 col-sm-12">
                      <div className="welcm-left-box">
                        <h3 className="mb-3" style={{ color: "var(--primary-color)" }}>
                          Welcome back Super Admin👋
                        </h3>
                        <p style={{ color: "var(--text-color-white)", fontSize: "14px" }}>
                          REGISTERED USER Number : {totalUsers}
                        </p>
                        <p style={{ color: "var(--text-color-white)", fontSize: "14px" }}>
                          ACTIVATION DATE : {new Date(userData?.updatedAt).toLocaleDateString('en-GB')}
                        </p>
                        <p style={{ color: "var(--text-color-white)", fontSize: "14px" }}>
                          MY PACKAGE : No Active Package
                        </p>
                        {/* <button className="custom-btn-green">Go Now</button> */}
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-md-12 col-sm-12">
                      <div className="d-flex justify-content-center h-100 align-items-center">
                        <img width={"75%"} src={dashimg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 col-md-12 col-sm-12">
                <div className="welcm-msg-right">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <WalletComponent></WalletComponent>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                <div className="theme-card">
                  <div>
                    <h2 style={{ color: "black" }}>₹ {totalData?.parents?.parents?.length}</h2>
                    <p style={{ color: "black" }}>Total Business</p>
                  </div>
                  <div className="dash-img-back-mini d-flex justify-content-center mb-3 mt-2">
                    <Icon
                      icon="flowbite:chart-mixed-dollar-solid"
                      width="50"
                      height="50"
                      style={{ color: "var(--text-color)" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                <div className="theme-card">
                  <div>
                    <h2 style={{ color: "black" }}>₹ {applicationData?.length}</h2>
                    <p style={{ color: "black" }}>Total Income </p>
                  </div>
                  <div className="dash-img-back-mini d-flex justify-content-center mb-3 mt-2">
                    <Icon
                      icon="fa6-solid:sack-dollar"
                      width="40"
                      height="40"
                      style={{ color: "var(--text-color)" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                <div className="theme-card">
                  <div>
                    <h2 style={{ color: "black" }}>₹ {totalData?.testimonial?.testimonials?.length}</h2>
                    <p style={{ color: "black" }}>Direct Income </p>
                  </div>
                  <div className="dash-img-back-mini d-flex justify-content-center mb-3 mt-2">
                    <Icon
                      icon="fa6-solid:hand-holding-dollar"
                      width="40"
                      height="40"
                      style={{ color: "var(--text-color)" }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                <div className="theme-card">
                  <div>
                    <h2 style={{ color: "black" }}>₹ {totalData?.testimonial?.testimonials?.length}</h2>
                    <p style={{ color: "black" }}>Level Income </p>
                  </div>
                  <div className="dash-img-back-mini d-flex justify-content-center mb-3 mt-2">
                    <Icon
                      icon="bi:chat-left-quote-fill"
                      width="40"
                      height="40"
                      style={{ color: "var(--text-color)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperAdminDashboard;