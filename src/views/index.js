import React from "react";
import Calendar from "./calendar/";
import Dashboard from "./dashboard/";
import Login from "./Login";
const menuItems = [
  { name: "Calendar", component: <Calendar /> },
  { name: "Dashboard", component: <Dashboard /> },
];

export { Calendar, Dashboard, Login, menuItems };
