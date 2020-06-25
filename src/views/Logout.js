import { useEffect } from "react";
import axios from "axios";
export default function Logout({ setView, setUser }) {
  useEffect(() => {
    axios.get("/logout").catch((err) => console.log(err));
    setView("Login");
    setUser({});
  });
  return null;
}
