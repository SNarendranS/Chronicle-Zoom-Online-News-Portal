import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/logout.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Logout({ setUsername, setRole }) {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userDetails");
    sessionStorage.removeItem("token");
    setUsername("");
    setRole("");

    const message = () => {
      toast.info("You have successfully logged out!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    };

    // Call the message function here
    message();
  }, [navigate, setUsername, setRole]);

  return (
    <div className="logout-message">
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Logout;
