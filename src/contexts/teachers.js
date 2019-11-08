import React from "react";
export const teachers = [
  {
    name: "Brian",
    id: "001",
    phone: "555-555-5555"
  },
  {
    name: "Chrystal",
    id: "002",
    phone: "555-555-5555"
  },
  {
    name: "Shawn",
    id: "003",
    phone: "555-555-5555"
  },
  {
    name: "Jeff",
    id: "004",
    phone: "555-555-5555"
  }
];
export const TeacherContext = React.createContext(teachers);
