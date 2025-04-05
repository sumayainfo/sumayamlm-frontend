import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routess } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/DashboardNavbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LandingHomePage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Application";
import Profile from "./pages/profile/Profile.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import AccountSetting from "./pages/profile/AccountSetting.jsx";
import ChangePassword from "./pages/profile/ChangePassword.jsx";
import BuyMembership from "./pages/buy membership/BuyMembership.jsx";
import MembershipHistory from "./pages/buy membership/MembershipHistory.jsx";
import WithdrawalRequestList from "./pages/withdrawal/WithdrawalRequestList.jsx";
import ActiveMembershipList from "./pages/buy membership/ActiveMembershipList.jsx";
import AutoPullIncomeReport from "./pages/incomes/AutopullIncome.jsx";
import SingleIncomeReport from "./pages/incomes/SingleLegIncome.jsx";
import TreeView from "./pages/team/TreeView.jsx";
import ListView from "./pages/team/ListView.jsx";
import MyDirectView from "./pages/team/MyDirectView.jsx";
import { useEffect, useState } from "react";
import { setUser } from "./features/user/userSlice";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
const [useType] = useState("Super_Admin");
  // Create a QueryClient instance
const queryClient = new QueryClient();

  useEffect(() => {
    const doremone = JSON.parse(localStorage.getItem("userData"));
    if (doremone) {
      setUserData(doremone);
      dispatch(setUser(doremone));
    }
  }, [isAuthenticated, dispatch]);

  console.log(isAuthenticated)
  const renderRoutes = () => {
    if (isAuthenticated && useType=="Admin") {
      return (
        <>
          <Navbar />
          <div className="dashboard-content">
            <div className="main-content">
              <Routes>
                <Route
                  path={Routess.Dashboard.path}
                  element={<Dashboard userData={userData} />}
                />
                <Route path={Routess.Home.path} element={<Home />} />
                <Route path={Routess.Profile.path} element={<Profile />} />
                <Route path={Routess.AccountSetting.path} element={<AccountSetting />} />
                <Route path={Routess.ChangePassword.path} element={<ChangePassword />} />
                <Route path={Routess.BuyMembership.path} element={<BuyMembership />} />
                <Route path={Routess.MembershipHistory.path} element={<MembershipHistory />} />
                <Route path={Routess.TreeView.path} element={<TreeView />} />
                <Route path={Routess.MyDirectView.path} element={<MyDirectView />} />
                
              </Routes>
            </div>
          </div>
        </>
      );
    }
    else if(isAuthenticated && useType=="Super_Admin"){
      return (
        <>
          <Navbar />
          <div className="dashboard-content">
            <div className="main-content">
              <Routes>
                <Route
                  path={Routess.Dashboard.path}
                  element={<Dashboard userData={userData} />}
                />
                <Route path={Routess.Home.path} element={<Home />} />
                <Route path={Routess.Profile.path} element={<Profile />} />
                <Route path={Routess.AccountSetting.path} element={<AccountSetting />} />
                <Route path={Routess.ChangePassword.path} element={<ChangePassword />} />
                <Route path={Routess.BuyMembership.path} element={<BuyMembership />} />
                <Route path={Routess.MembershipHistory.path} element={<MembershipHistory />} />
                <Route path={Routess.TreeView.path} element={<TreeView />} />
                <Route path={Routess.ListView.path} element={<ListView />} />
                <Route path={Routess.WithdrawalRequestList.path} element={<WithdrawalRequestList />} />
                <Route path={Routess.ActiveMembershipList.path} element={<ActiveMembershipList />} />
                <Route path={Routess.MyDirectView.path} element={<MyDirectView />} />
                <Route path={Routess.AutoPullIncomeReport.path} element={<AutoPullIncomeReport />} />
                <Route path={Routess.SingleIncomeReport.path} element={<SingleIncomeReport />} />
              </Routes>
            </div>
          </div>
        </>
      );    
    } else {
      return (
        <Routes>
          <Route
            path={Routess.LandingHomePage.path}
            element={<LandingHomePage />}
          />
          <Route path={Routess.Login.path} element={<Login />} />
          <Route path={Routess.Register.path} element={<Register />} />
          <Route path={Routess.ForgotPassword.path} element={<ForgotPassword />} />
        </Routes>
      );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      {renderRoutes()}
    </Router>
    </QueryClientProvider>
  );
};


export default App;
