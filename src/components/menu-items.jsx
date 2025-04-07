import { Icon } from "@iconify/react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: <Icon icon="ri:dashboard-3-line" width="24" height="24" />,
    showTo: ["Admin", "Super_Admin", "User"],
  },

  {
    title: "My Profile",
    icon: (<Icon icon="lets-icons:user-circle" width="25"  height="25" />),
    showTo: ["Admin", "User"],
    subMenu: [
      { title: "Profile", url: "/profile", icon: <Icon icon="lets-icons:user-circle" width="25"  height="25" /> },
      { title: "Account Setting", url: "/account-setting", icon: <Icon icon="lets-icons:lock" width="25"  height="25" /> },
      { title: "Change Password", url: "/change-password", icon: <Icon icon="lets-icons:lock" width="25"  height="25" /> },
    ],
  },

  // {
  //   title: "Buy Membership",
  //   icon: <Icon icon="material-symbols:logout-rounded" width="25" height="25" />,
  //   showTo: ["Admin", "User"],
  //   subMenu: [
  //     { title: "New Membership", url: "/buy-membership", icon: <Icon icon="lets-icons:user-circle" width="25"  height="25" /> },
  //     { title: "Membership History", url: "/membership-history", icon: <Icon icon="lets-icons:lock" width="25"  height="25" /> },
  //   ],
  // },

  {
    title: "Active Membership",
    icon: <Icon icon="material-symbols:logout-rounded" width="25" height="25" />,
    url: "/active-membership-list",
    showTo: ["Super_Admin"],
  },

  {
    title: "Payout List",
    icon: <Icon icon="material-symbols:logout-rounded" width="25" height="25" />,
    url: "/active-membership-listss",
    showTo: ["Super_Admin"],
  },
  // {
  //   title: "User Wallet Details",
  //   icon: <Icon icon="material-symbols:logout-rounded" width="25" height="25" />,
  //   url: "/active-membership-listss",
  //   showTo: ["Super_Admin"],
  // },

  // {
  //   title: "Withdrawal",
  //   icon: <Icon icon="material-symbols:logout-rounded" width="25" height="25" />,
  //   showTo: ["admin", "center"],
  //   subMenu: [
  //     { title: "Withdrawal", url: "/settings/profile", icon: <Icon icon="lets-icons:user-circle" width="25"  height="25" /> },
  //     { title: "Withdrawal History", url: "/settings/security", icon: <Icon icon="lets-icons:lock" width="25"  height="25" /> },
  //   ],
  // },

  // {
  //   title: "Withdrawal Request",
  //   icon: <Icon icon="material-symbols:logout-rounded" width="25" height="25" />,
  //   url: "/withdrawal-request-list",
  //   showTo: ["Super_Admin"],
  // },

  // {
  //   title: "All User List",
  //   icon: <Icon icon="material-symbols:logout-rounded" width="25" height="25" />,
  //   url: "/all-user-list",
  //   showTo: ["Super_Admin"],
  // },

  // {
  //   title: "Transaction Report",
  //   url: "/parents-list",
  //   icon: <Icon icon="material-symbols:logout-rounded" width="25" height="25" />,
  //   showTo: ["Admin", "Super_Admin", "center"],
  // },

  // {
  //   title: "Income Report",
  //   icon: <Icon icon="material-symbols:logout-rounded" width="25" height="25" />,
  //   showTo: ["Admin", "Super_Admin", "User"],
  //   subMenu: [
  //     { title: "AutoPull Income", url: "/auto-pull-income-report", icon: <Icon icon="lets-icons:lock" width="25"  height="25" /> },
  //     // { title: "Single Leg Income", url: "/single-leg-income-report", icon: <Icon icon="lets-icons:user-circle" width="25"  height="25" /> },
  //     { title: "Matching Income", url: "/settings/security", icon: <Icon icon="lets-icons:lock" width="25"  height="25" /> },
  //     { title: "Salary Income", url: "/settings/security", icon: <Icon icon="lets-icons:lock" width="25"  height="25" /> },
  //     { title: "Level & Reward Income", url: "/settings/security", icon: <Icon icon="lets-icons:lock" width="25"  height="25" /> },
  //     { title: "Insurance Income", url: "/settings/security", icon: <Icon icon="lets-icons:lock" width="25"  height="25" /> },
  //   ],
  // },


  
  {
    title: "My Team",
    icon: (
      <Icon
        icon="lets-icons:user-box-duotone"
        width="29"
        height="29"
        style={{ marginLeft: "-5px" }}
      />
    ),
    subMenu: [
      { title: "My Direct", url: "/my-direct", icon: <Icon icon="lets-icons:lock" width="25"  height="25" /> },
      { title: "Tree View", url: "/tree-view", icon: <Icon icon="lets-icons:user-circle" width="25"  height="25" /> },
      { title: "List View", url: "/list-view", icon: <Icon icon="lets-icons:user-circle" width="25"  height="25" /> },
      // { title: "Lavel Wise Report", url: "/settings/profile", icon: <Icon icon="lets-icons:user-circle" width="25"  height="25" /> },
    ],
    showTo: ["Admin","User","Super_Admin"],
  },

];

export default menuItems;