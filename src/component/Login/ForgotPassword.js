import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Divider, Form, Input } from "antd";
import { TbMailFilled } from "react-icons/tb";
import "./ForgotPassword.css";

import { auth } from "../../FirebaseConfig";

import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    message: "",
  });

  const getUserData = (event) => {
    let name, value;
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        // Password reset email sent!
        toast.success("Password reset email sent successfully.");
      })
      .catch((error) => {
        toast.error(error.message);
        // ..
      });
  };

  return (
    <>
      <div className="forget_body">
        <div className="container forget_form_card">
          <h3 className="forget_label mt-2">Forget Password</h3>

          <Form>
            <img
              className="forget_img mt-1"
              src="../Images/3275434.jpg"
              alt="Forget password"
            />
            <label className="mt-2">Enter Your Email-Address</label>
            <Input
              className="container mt-2 form_input_style"
              placeholder="Enter Email"
              suffix={<TbMailFilled style={{ color: "#7D7979" }} />}
              name="email"
              value={user.email}
              onChange={getUserData}
            />
            <Button
              block
              className="container signin_btn mt-4"
              onClick={handleForgotPassword}
            >
              Send Link
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
