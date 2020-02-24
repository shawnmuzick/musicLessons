import React from 'react';
import Dashboard from "./dashboard/Dashboard";
import Calendar from "./calendar/Calendar";

export const menuItems = [
    { name: "Calendar", component: <Calendar /> },
    { name: "Dashboard", component: <Dashboard /> }
  ];
